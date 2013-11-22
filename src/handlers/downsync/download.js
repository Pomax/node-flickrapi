var fs = require('fs'),
    http = require('http'),
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
  if(key && !photo && !cb) { cb = key; key = undefined; }
  var file = fs.createWriteStream(dest),
      handleRequest = function(response) {
        response.pipe(file);
        file.on('finish', function() {
          file.close();
          if(key) {
            photo.sizes.push(key);
          }
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
 * Download all the interesting formats for this photo
 */
module.exports = {
  downloadIcons: function(flickr, collection, completed) {
    var root = flickr.options.locals.dirstructure.root.replace("/.",''),
        imdir = flickr.options.locals.dirstructure.images,
        icondir = imdir.icon,
        remotesmall = collection.iconsmall,
        remotelarge = collection.iconlarge,
        small = icondir.small + "/" + remotesmall.substring(remotesmall.lastIndexOf("/") + 1),
        large = icondir.large + "/" + remotelarge.substring(remotelarge.lastIndexOf("/") + 1);

    collection.iconlarge = large.replace(root, '');
    collection.iconsmall = small.replace(root, '');

    var getLarge = function(cb) {
      if(!fs.existsSync(large)) {
        getFromURL(remotelarge, large, cb);
      } else { cb(); }
    }

    var getSmall = function(cb) {
      var gl = function() { getLarge(cb); }
      if(!fs.existsSync(small)) {
        getFromURL(remotesmall, small, gl);
      } else { gl(); }
    }

    getSmall(completed);
  },
  downloadPhoto: function(flickr, photo, completed) {
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
          if(trackRecord === 0) { completed(); }
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
  }
};
