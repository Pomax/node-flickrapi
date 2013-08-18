var async = require("async"),
    fs = require("fs"),
    download = require("./download"),
    getSetMetadata = require("./sets"),
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
function fetchPhotoMetadata(flickr, photo_idx, photo, next) {
  var id = photo.id,
      secret = photo.secret,
      sizes = [],
      filename_cmt = flickr.options.locals.dirstructure.ia.photos.comments + "/" + id + ".json",
      filename_ctx = flickr.options.locals.dirstructure.ia.photos.contexts + "/" + id + ".json",
      filename_md = flickr.options.locals.dirstructure.ia.photos.root + "/" + id + ".json";

  // record progress
  progressBar.tick();

  var getMetaData = function() {
    if(fs.existsSync(filename_md)) {
      photo = JSON.parse(fs.readFileSync(filename_md));
      return download(flickr, photo, next);
    }

    flickr.photos.getInfo({
      photo_id: id,
      secret: secret
    }, function(error, result) {
      if(error) {
        console.log(photo_idx + " returned a query error");
        return console.log(error);
      }
      photo = result.photo;
      if(!photo) {
        console.log(photo_idx + " is somehow not a photo");
        return console.log(result);
      }
      photo.sizes = sizes;
      fs.writeFile(filename_md, JSON.prettyprint(photo), function() {
        return download(flickr, photo, next);
      });
    });
  }

  var getSizes = function() {
    if(fs.existsSync(filename_md)) {
      photo = JSON.parse(fs.readFileSync(filename_md));
      return getMetaData();
    }

    flickr.photos.getSizes({
      photo_id: id
    }, function(error, result) {
      if(error) {
        console.log(photo_idx + " returned a query error");
        return console.log(error);
      }
      sizes = result.sizes.size.filter(function(s) {
        return !!sizeMap[s.label];
      }).map(function(s) {
        return sizeMap[s.label];
      });
      getMetaData();
    });
  }

  var getContexts = function() {
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
          return getSizes();
        });
      });
    }
    else { getSizes(); }
  }

  var getComments = function() {
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
          return getContexts();
        });
      });
    }
    else { getContexts(); }
  }

  // run through our chain
  getComments();
}

/**
 * Photographs
 */
function processPhotos(flickr, photo_idx, total) {
  if(photo_idx >= total) {
    console.log("done downloading photo metadata.");
    return setTimeout(function() {
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

  fetchPhotoMetadata(flickr, photo_idx, photo, next);
}


// this function grabs all photo definitions from Flickr
function aggregatePhotos(flickr, user_id, per_page, page, tally, total) {
  if(tally >= total) {
    console.log("done fetching photo information from Flickr.");
    console.log();
    console.log("Downloading photos and metadata from Flickr.");
    progressBar = new progress('  [:bar] :current/:total', { total: total });
    setTimeout(function() {
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
    aggregatePhotos(flickr, user_id, per_page, page+1, tally, total);
  });
}

/**
 * export just this function
 */
module.exports = function(flickr, user_id, per_page, page, tally, total) {
  progressBarAggregate = new progress('  [:bar] :current/:total', { total: total });
  aggregatePhotos(flickr, user_id, per_page, page, tally, total);
}
