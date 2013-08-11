var http = require('http'),
    fs = require('fs');
    locations = {
      "o" : "original",
      "t" : "thumbnail",
      "m" : "small",
      "z" : "medium",
      "s" : "square/small",
      "q" : "square/medium"
    },
    get = function(url, dest, cb) {
      var file = fs.createWriteStream(dest);
      var request = http.get(url, function(response) {
        /*
        if (response.statusCode === 302 && url.indexOf("staticflickr")>-1) {
          get(url.replace("staticflickr","static.flickr"), dest, cb);
          return;
        }
        */
        response.pipe(file);
        file.on('finish', function() {
          file.close();
          if (cb) cb();
        });
      });
    },
    dir = process.cwd();

/**
 * Download all the interesting formats for this photo
 */
module.exports = function download(photo, completed) {
  var id = photo.id,
      farm = photo.farm,
      server = photo.server,
      secret = photo.secret,
      osecret = photo.originalsecret,
      format = photo.originalformat,
      photoURL = "http://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + "_",
      url,
      dest,
      keys = Object.keys(locations),
      // track how many images are left to download
      trackRecord = keys.length,
      track = function() {
        trackRecord--;
        // if there are no images left to download, we can hand control back.
        if(trackRecord === 0) {
          completed();
        }
      };

  keys.forEach(function(key) {
    url = photoURL + key + "." + (key==="o"? format: "jpg");
    if(key==="o") {
      url = url.replace("_"+secret+"_", "_"+osecret+"_");
    }
    dest = dir + "/data/images/" + locations[key] + "/" + id + "." + (key==="o"? format: "jpg");
  	if(!fs.existsSync(dest)) {
//      console.log("downloading "+url+" to " + dest)
  	  get(url, dest, function() {
//        console.log("finished downloading " + id + "_" + key);
        track()
      });
  	} else { track(); }
  });
}
