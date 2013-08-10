module.exports = (function() {
  var fs = require("fs");
  var directories = [
    "data",
    "data/images",
    "data/images/original",
    "data/images/thumbnail",
    "data/images/medium",
    "data/images/small",
    "data/images/square",
    "data/images/square/small",
    "data/images/square/medium",
    "data/ia",
    "data/ia/photos",
    "data/ia/photosets",
    "data/ia/collections",
    "data/ia/comments",
  ];

  function ensureDirectories() {
    directories.forEach(function(dir) {
      try {
        fs.mkdirSync(dir);
        console.log("creating ./" + dir);
      }
      catch (e) { /* we really don't care if it already exists */ }
    });
  }

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

  return function(dataDir) {
    dataDir = dataDir || "./";
    directories = directories.map(function(dir) {
      return dataDir + dir;
    });
    ensureDirectories();

    var photos = readAll(directories[10], function(a,b,items) {
      return items[b].dates.posted - items[a].dates.posted;
    });

    var photosets = readAll(directories[11], function(a,b,items) {
      return items[b].date_create - items[a].date_create;
    });

    var collections = readAll(directories[12], function(a,b,items) {
      a = items[a].title;
      b = items[b].title;
      return a === b ? 0 : b < a ? -1 : -1;
    });

    return {
      photos: photos.data,
      photo_keys: photos.keys,
      photosets: photosets.data,
      photoset_keys: photosets.keys,
      collections: collections.data,
      collection_keys: collections.keys,
    }
  }
}());
