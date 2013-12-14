/**
 * Synchronise your Flickr photo collection, with metadata,
 * to your harddisk. This handler covers:
 *
 *   - photos
 *     - tags
 *     - comments
 *     - notes
 *   - sets
 *   - collections
 *
 * Data is stored as image files on disk, with the metadata
 * stored as .json files on disk.
 *
 * TODO: comments and notes
 */
module.exports = function(location, removeDeleted) {
  "use strict";

  location = location || "./data";
  removeDeleted = removeDeleted || false;

  var fs = require("fs"),
      aggregatePhotos = require("./photos");

  // directory structure
  var data = require("../ia")(location);

  /**
   * Kick off the down-syncing process
   */
  return function(err, flickr) {
    if(err) { return console.log(err); }
    flickr.options.locals = data;

    // grab all photo data.
    console.log("downloading photo records from Flickr...");
    flickr.photos.search({
      user_id: flickr.options.user_id,
    }, function(error, result) {
      if(error) {
        return console.log(error);
      }
      console.log("Found " + result.photos.total + " photos to downsync.");
      aggregatePhotos(flickr, flickr.options.user_id, 100, 1, 0, parseInt(result.photos.total, 10), removeDeleted);
    });
  };
};
