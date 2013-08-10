var fs = require("fs"),
    getCollectionMetadata = require("./collections"),
    JSON = require("./PJSON"),
    sets = [];

/**
 * Sets
 */
function processPhotosets(flickr, set_idx, total) {
  if(set_idx >= total) {
    console.log("done fetching set metadata.");
    return setTimeout(function() {
      getCollectionMetadata(flickr);
    }, 1);
  }

  var set = sets[set_idx],
      id = set.id,
      filename = "data/ia/photosets/"+id+".json",
      next = (function(flickr, set_idx, total) {
        var next_id = set_idx +1;
        return function() {
          setTimeout(function() {
            processPhotosets(flickr, next_id, total);
          }, 1);
        };
      }(flickr, set_idx, total));

  console.log("set " + set_idx + ": " + id);

  if(fs.existsSync(filename)) {
    next();
  } else {
    flickr.photosets.getPhotos({
      photoset_id: set.id,
      page: 1,
      per_page: 500
    }, function(error, result) {
      if (error) {
        return console.log(error);
      }
      set.photos = result.photoset.photo.map(function(photo) {
        if(photo.isprimary === "1") {
          set.primary = photo.id;
        }
        return photo.id;
      });

      fs.writeFile(filename, JSON.prettyprint(set), next);
    });
  }
}

function getSetMetadata(flickr) {
  flickr.photosets.getList({
    user_id: flickr.options.user_id,
    page: 1,
    per_page: 500
  }, function(error, result) {
    if (error) {
      return console.log(error);
    }
    sets = result.photosets.photoset;
    processPhotosets(flickr, 0, sets.length);
  });
}

module.exports = getSetMetadata;
