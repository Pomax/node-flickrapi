module.exports = (function() {
  var fs = require("fs"),
      utils = require("../utils");

  var directories = [
    ".",
    "images",
    "images/original",
    "images/thumbnail",
    "images/small",
    "images/medium",
    "images/medium800",
    "images/large",
    "images/square",
    "images/square/small",
    "images/square/medium",
    "ia",
    "ia/photos",
    "ia/photos/comments",
    "ia/photos/contexts",
    "ia/photosets",
    "ia/collections"
  ];

  /**
   * Ensure that all directories that are necessary, exist
   */
  function ensureDirectories(location) {
    utils.mkdir(location);

    var dirs = directories.map(function(dir) {
      dir = location + "/" + dir;
      utils.mkdir(dir);
      return dir;
    });

    // structured directories object
    return {
      root: dirs[0],
      images: {
        root: dirs[1],
        original: dirs[2],
        thumbnail: dirs[3],
        small: dirs[4],
        medium: dirs[5],
        medium800: dirs[6],
        large: dirs[7],
        square: {
          root: dirs[8],
          small: dirs[9],
          medium: dirs[10]
        }
      },
      ia: {
        root: dirs[11],
        photos: {
          root: dirs[12],
          comments: dirs[13],
          contexts: dirs[14]
        },
        photosets: dirs[15],
        collections: dirs[16]
      },
      flickr: {
        root: utils.mkdir("data/flickr"),
        methods: utils.mkdir("data/flickr/methods")
      }
    };
  }

  /**
   * Read all content from a directory
   */
  function readAll(dir, comparator) {
    var files = fs.readdirSync(dir),
        items = {},
        stats;
    files.forEach(function(file) {
      stats = fs.statSync(dir + "/" + file);
      if(stats.isFile()) {
        item = JSON.parse(fs.readFileSync(dir + "/" + file));
        items[item.id] = item;
      }
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
    var photos = readAll(dirstructure.ia.photos.root, function(a,b,items) {
      return items[b].dates.posted - items[a].dates.posted;
    });

    // sets are ranked by creation date
    var photosets = readAll(dirstructure.ia.photosets, function(a,b,items) {
      return items[b].date_create - items[a].date_create;
    });

    // crosslink photos and sets
    if(photosets.keys) {
      photosets.keys.forEach(function(key) {
        var set = photosets.data[key];
        if(set.photos) {
          set.photos.forEach(function(id) {
            if(!photos.data[id].sets) {
              photos.data[id].sets = [];
            }
            var idx = set.photos.indexOf(id);
            photos.data[id].sets.push({
              id: set.id,
              prev: (idx > 0 ? photos.data[set.photos[idx-1]] : false),
              next: (idx < set.photos.length-1 ? photos.data[set.photos[idx+1]] : false)
            });
          });
        }
      });
    }

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
