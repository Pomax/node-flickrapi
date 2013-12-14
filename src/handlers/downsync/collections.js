var fs = require("fs"),
    download = require("./download").downloadIcons,
    progress = require("progress"),
    progressBar,
    collections = [];

/**
 * Collections
 */
function processCollections(flickr, collection_idx, total) {
  "use strict";

  if(collection_idx >= total) {
    console.log("done fetching collection metadata.");
    var handler = flickr.options.afterDownsync;
    if (handler) { handler(); }
    return;
  }

  var collection = collections[collection_idx],
      id = collection.id,
      filename =flickr.options.locals.dirstructure.ia.collections + "/" + id + ".json",
      next = function() {
        setTimeout(function() {
          processCollections(flickr, collection_idx+1, total);
        }, 1);
      };

  progressBar.tick();
  download(flickr, collection, function() {
    fs.writeFile(filename, JSON.prettyprint(collection), next);
  });
}

function getCollectionMetadata(flickr) {
  flickr.collections.getTree({
    user_id: flickr.options.user_id,
    page: 1,
    per_page: 500
  }, function(error, result) {
    collections = result.collections.collection;
    console.log();
    console.log("Downloading collection metadata from Flickr.");
    progressBar = new progress('  [:bar] :current/:total', { total: collections.length });
    processCollections(flickr, 0, collections.length);
  });
}

module.exports = getCollectionMetadata;
