var fs = require('fs'),
    http = require('http'),
    imagemagick = require('imagemagick'),
    have_imagemagick = true,
    locations = {
      "o" : "original",
      "t" : "thumbnail",
      "m" : "small",
      "z" : "medium",
      "c" : "medium800",
      "b" : "large",
      "s" : "square/small",
      "q" : "square/medium"
    };

/**
 * Retrieve image resources from the web
 */
function getFromURL(url, dest, key, photo, cb) {
  var file = fs.createWriteStream(dest),
      handleRequest = function(response) {
        response.pipe(file);
        file.on('finish', function() {
          file.close();
          photo.sizes.push(key);
        });
        if (cb) {
          cb();
        }
      },
      errorHandler = function(err) {
        console.log(err);
        if (cb) {
          cb(err);
        }
      };
  http.get(url, handleRequest).on('error', errorHandler);
}

/**
 * convert "small" (75x75) images to "tiny" (20x20) pinhead images
 */
function generatePinhead(id, imdir, completed) {
  if(have_imagemagick) {
    imagemagick.resize({
      srcPath: imdir.square.small + "/" + id + ".jpg",
      dstPath: imdir.square.tiny + "/" + id + ".jpg",
      width:   20,
      height:  20
    }, function(err) {
      if(err) {
        have_imagemagick = false;
      }
      completed();
    });
  } else {
    completed();
  }
}

/**
 * Download all the interesting formats for this photo
 */
module.exports = function download(flickr, photo, completed) {
  var id = photo.id,
      farm = photo.farm,
      server = photo.server,
      secret = photo.secret,
      osecret = photo.originalsecret,
      format = photo.originalformat,
      photoURL = "http://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + "_",
      url,
      dest,
      keys = photo.sizes,
      imdir = flickr.options.locals.dirstructure.images,
      imageRoot = imdir.root,
      // track how many images are left to download
      trackRecord = keys.length,
      track = function() {
        trackRecord--;
        // if there are no images left to download, we can hand control back.
        if(trackRecord === 0) {
          generatePinhead(id, imdir, completed);
        }
      };

  keys.forEach(function(key) {
    url = photoURL + key + "." + (key==="o"? format: "jpg");
    if(key==="o") {
      url = url.replace("_"+secret+"_", "_"+osecret+"_");
    }
    dest = imageRoot + "/" + locations[key] + "/" + id + "." + (key==="o"? format: "jpg");
    if(!fs.existsSync(dest)) {
      getFromURL(url, dest, key, photo, track);
    } else { track(); }
  });
};
