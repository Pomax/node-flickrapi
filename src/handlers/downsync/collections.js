var fs = require("fs"),
    JSON = require("./PJSON"),
    collections = [];

/**
 * Collections
 */
function processCollections(flickr, collection_idx, total) {
  if(collection_idx >= total) {
    console.log("done fetching collection metadata.");
    return;
  }

  var collection = collections[collection_idx],
      id = collection.id,
      filename = "data/ia/collections/"+id+".json",
      next = function() {
        setTimeout(function() {
          processCollections(flickr, collection_idx+1, total);
        }, 1);
      };

  console.log("collection " + collection_idx + ": " + id);

  if(fs.existsSync(filename)) {
    return next();
  } else {
    fs.writeFile(filename, JSON.prettyprint(collection), next);
  }
}

function getCollectionMetadata(flickr) {
  flickr.collections.getTree({
    user_id: flickr.options.user_id,
    page: 1,
    per_page: 500
  }, function(error, result) {
    collections = result.collections.collection;
    processCollections(flickr, 0, collections.length);
  });
}

module.exports = getCollectionMetadata;
