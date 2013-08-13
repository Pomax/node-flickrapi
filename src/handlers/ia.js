module.exports = (function() {
  var fs = require("fs");

  var directories = [
    ".",
    "images",
    "images/original",
    "images/thumbnail",
    "images/medium",
    "images/small",
    "images/square",
    "images/square/small",
    "images/square/medium",
    "ia",
    "ia/photos",
    "ia/photosets",
    "ia/collections",
    "ia/comments"
  ];

  // shorthand function
  function mkdir(dir) {
    var trymkdir = function(dir) {
      try {
        fs.mkdirSync(dir);
        console.log("creating " + dir);
      }
      catch (e) { /* we really don't care if it already exists */ }
    };
    var f = "";
    dir.replace("./",'').split("/").forEach(function(d) {
      f += d + "/";
      trymkdir(f);
    });
    return dir;
  }

  /**
   * Ensure that all directories that are necessary, exist
   */
  function ensureDirectories(location) {
    mkdir(location);

    var dirs = directories.map(function(dir) {
      dir = location + "/" + dir;
      mkdir(dir);
      return dir;
    });

    // structured directories object
    return {
      root: dirs[0],
      images: {
        root: dirs[1],
        original: dirs[2],
        thumbnail: dirs[3],
        medium: dirs[4],
        small: dirs[5],
        square: {
          root: dirs[6],
          small: dirs[7],
          medium: dirs[8]
        }
      },
      ia: {
        root: dirs[9],
        photos: dirs[10],
        photosets: dirs[11],
        collections: dirs[12],
        comments: dirs[13]
      },
      flickr: {
        root: mkdir("data/flickr"),
        methods: mkdir("data/flickr/methods")
      }
    };
  }

  /**
   * Read all content from a directory
   */
  function readAll(dir, comparator) {
    var files = fs.readdirSync(dir),
        items = {};
    files.forEach(function(file) {
      item = JSON.parse(fs.readFileSync(dir + "/" + file));
      items[item.id] = item;
    });
    var keys = Object.keys(items);
    keys = keys.sort(function(a,b) {
      return comparator(a,b,items);
    });
    return {
      keys: keys,
      data: items
    }
  }

  /**
   * I.A. builder
   */
  return function(location) {
    var dirstructure = ensureDirectories(location);

    // photos are ranked by publication date
    var photos = readAll(dirstructure.ia.photos, function(a,b,items) {
      return items[b].dates.posted - items[a].dates.posted;
    });
    // sets are ranked by creation date
    var photosets = readAll(dirstructure.ia.photosets, function(a,b,items) {
      return items[b].date_create - items[a].date_create;
    });
    // collections are sorted alphabetically
    var collections = readAll(dirstructure.ia.collections, function(a,b,items) {
      a = items[a].title;
      b = items[b].title;
      return a === b ? 0 : b < a ? -1 : -1;
    });
    // our final IA object
    return {
      photos: photos.data,
      photo_keys: photos.keys,
      photosets: photosets.data,
      photoset_keys: photosets.keys,
      collections: collections.data,
      collection_keys: collections.keys,
      dirstructure: dirstructure
    }
  }
}());
