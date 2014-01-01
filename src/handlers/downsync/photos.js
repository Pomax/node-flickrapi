var async = require("async"),
    fs = require("fs"),
    download = require("./download").downloadPhoto,
    getSetMetadata = require("./sets"),
    glob = require("glob"),
    progress = require("progress"),
    progressBarAggregate,
    progressBar,
    photos = [],
    sizeMap = {
      "Square": "s",
      "Large Square": "q",
      "Thumbnail": "t",
      "Small": "m",
      "Medium 640": "z",
      "Medium 800": "c",
      "Large": "b",
      "Original": "o"
    };

/**
 * Given a photo object, get its info (either from
 * flickr, or from .json file if we already have it)
 * and get all the associated photographs.
 */
function processPhoto(flickr, photo_idx, photo, next) {
  "use strict";

  var id = photo.id,
      secret = photo.secret,
      sizes = [],
      filename_cmt = flickr.options.locals.dirstructure.ia.photos.comments + "/" + id + ".json",
      filename_ctx = flickr.options.locals.dirstructure.ia.photos.contexts + "/" + id + ".json",
      filename_md = flickr.options.locals.dirstructure.ia.photos.root + "/" + id + ".json",
      metadata;

  // record progress
  progressBar.tick();

  // kick off single-photo sync
  var photoFunctions = {
    getMetaData: function(nextCall) {
      // console.log("getMetaData");
      flickr.photos.getInfo({
        photo_id: id,
        secret: secret
      }, function(error, result) {
        if(error) {
          console.log(photo_idx + " returned a query error");
          return console.log(error);
        }
        metadata = result.photo;
        if(!metadata) {
          console.log(photo_idx + " is somehow not a photo");
          return console.log(result);
        }
        nextCall(metadata);
      });
    },
    getSizes: function(nextCall) {
      // console.log("getSizes");
      flickr.photos.getSizes({
        photo_id: id
      }, function(error, result) {
        if(error) {
          console.log(photo_idx + " returned a query error");
          return console.log(error);
        }
        metadata.sizes = result.sizes.size.filter(function(s) {
          return !!sizeMap[s.label];
        }).map(function(s) {
          return sizeMap[s.label];
        });
        nextCall();
      });
    },
    getContexts: function(nextCall) {
      // console.log("getContexts");
      if(!fs.existsSync(filename_ctx)) {
        flickr.photos.getAllContexts({
          photo_id: id
        }, function(error, result) {
          if(error) {
            console.log(photo_idx + " returned a query error");
            return console.log(error);
          }
          delete result.stat;
          fs.writeFile(filename_ctx, JSON.prettyprint(result), function() {
            return nextCall();
          });
        });
      }
      else { nextCall(); }
    },
    getComments: function(nextCall) {
      // console.log("getComments");
      if(!fs.existsSync(filename_cmt)) {
        flickr.photos.comments.getList({
          photo_id: id
        }, function(error, result) {
          if(error) {
            console.log(photo_idx + " returned a query error");
            return console.log(error);
          }
          var comments = result.comments;
          if(!comments) {
            console.log(photo_idx + " is somehow not a photo");
            return console.log(result);
          }
          fs.writeFile(filename_cmt, JSON.prettyprint(comments), function() {
            return nextCall();
          });
        });
      }
      else { nextCall(); }
    },
    run: function() {
      // Did we already know this photo? If so, and the data from
      // Flickr is newer, we need to resync this photograph.
      var ondisk = false;
      if(fs.existsSync(filename_md)) {
        ondisk = JSON.parse(fs.readFileSync(filename_md));
      }

      // 1: get the photo metadata from Flickr
      photoFunctions.getMetaData(function(metadata) {

        // 2: check if we need to resync

        // 2a: we do not.
        if(ondisk && ondisk.dates.lastupdate === metadata.dates.lastupdate) {
          // console.log("2a");
          return download(flickr, ondisk, next);
        }

        // 2b: we do.
        else {
          // console.log("2b");
          var getComments = photoFunctions.getComments,
              getContexts = photoFunctions.getContexts,
              getSizes = photoFunctions.getSizes,
              gsFn = function() {
                fs.writeFile(filename_md, JSON.prettyprint(metadata), function() {
                  return download(flickr, metadata, next);
                });
              },
              gcxFn = function() { getSizes(gsFn); },
              gcFn = function() { getContexts(gcxFn); };
          // Run through the function chain, writing the metadata
          // to disk once we have all the updated information.
          getComments(gcFn);
        }
      });
    }
  };

  photoFunctions.run();
}


/**
 * Processing all photographs one by one
 */
function processPhotos(flickr, photo_idx, total) {
  if(photo_idx >= total) {
    console.log("done downloading photo metadata.");
    return setTimeout(function() {
      // move on to syncing sets
      getSetMetadata(flickr);
    }, 1);
  }

  var photo = photos[photo_idx],
      method = "flickr.photos.getInfo",
      next = (function(flickr, photo_idx, total) {
        var next_idx = photo_idx + 1;
        return function() {
          setTimeout(function() {
            processPhotos(flickr, next_idx, total);
          }, 1);
        };
      }(flickr, photo_idx, total));

  if(!photo) {
    console.error("for some reason, photo " + photo_idx + " is undefined...");
    return next();
  }

  processPhoto(flickr, photo_idx, photo, next);
}


/**
 * this function grabs all photo definitions from Flickr
 */
function aggregatePhotos(flickr, user_id, per_page, page, tally, total, removeDeleted) {
  if(tally >= total) {
    console.log("done fetching photo information from Flickr.");
    console.log();
    console.log("Downloading photos and metadata from Flickr.");
    progressBar = new progress('  [:bar] :current/:total', { total: total });
    setTimeout(function() {
      // delete any photos that were deleted from flickr, if specified
      if(removeDeleted) {
        var ia = flickr.options.locals,
            dirs = ia.dirstructure,
            keys = ia.photo_keys.slice(),
            pos;
        photos.forEach(function(photo) {
          pos = keys.indexOf(photo.id);
          if(pos===-1) return;
          keys.splice(pos,1);
        });
        if(keys.length>0) {
          console.log("Pruning files from the local mirror that were deleted on Flickr");
          console.log("(reason: downsync called with --prune or removeDeleted==true)");
        }
        // prune the remaining photos
        keys.forEach(function(key) {
          var match = dirs.root + "/**/" + key + ".*";
          glob(match, function (err, files) {
            if(err) { return console.error(err); }
            files.forEach(function(file) {
              fs.unlink( file, function(err, result){ if(err) { console.error(err); }});
            });
          });
        });
      }
      // Move on to processing our list of photos
      processPhotos(flickr, 0, total);
    }, 1);
    return;
  }

  flickr.photos.search({
    user_id: user_id,
    per_page: per_page,
    page: page
  }, function(error, result) {
    var batch = result.photos.photo;
    tally += batch.length;
    progressBarAggregate.tick(per_page);
    photos = photos.concat(batch);
    aggregatePhotos(flickr, user_id, per_page, page+1, tally, total, removeDeleted);
  });
}

/**
 * export just this function
 */
module.exports = function(flickr, user_id, per_page, page, tally, total, removeDeleted) {
  progressBarAggregate = new progress('  [:bar] :current/:total', { total: total });
  aggregatePhotos(flickr, user_id, per_page, page, tally, total, removeDeleted);
};
