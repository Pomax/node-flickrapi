/**
 * This list of currently supported functions, and the
 * arguments that can be passed. Some of these are required,
 * some of these are optional, so your best guide is the
 * Flickr API page, which explains each function:
 *
 *    http://www.flickr.com/services/api/
 *
 * An API object is built from these name/parameter pairs
 * in the flickr-api.js file.
 */
module.exports = {

  "flickr.collections.getInfo": [
    "collection_id"
  ],

  "flickr.collections.getTree": [
    // no arguments
  ],

  "flickr.contacts.getList": [
    "filter",
    "page",
    "per_page",
    "sort"
  ],

  "flickr.contacts.getPublicList": [
    "user_id",
    "page",
    "per_page"
  ],


  "flickr.favorites.getContext": [
    "photo_id",
    "user_id"
  ],

  "flickr.favorites.getList": [
    "user_id",
    "min_fav_date",
    "max_fav_date",
    "extras",
    "per_page",
    "page"
  ],

  "flickr.favorites.getPublicList": [
    "user_id",
    "min_fave_date",
    "max_fave_date",
    "extras",
    "per_page",
    "page"
  ],

  "flickr.photos.getAllContexts": [
    "photo_id"
  ],

  "flickr.photos.getContext": [
    "photo_id"
  ],

  "flickr.photos.getCounts": [
    "dates",
    "taken_dates"
  ],

  "flickr.photos.getExif": [
    "photo_id",
    "secret"
  ],

  "flickr.photos.getFavorites": [
    "photo_id",
    "page",
    "per_page"
  ],

  "flickr.photos.getInfo": [
    "photo_id",
    "secret"
  ],

  "flickr.photos.getNotInSet": [
    "max_update_date",
    "min_taken_date",
    "max_taken_date",
    "privacy_filter",
    "media",
    "min_upload_date",
    "extras",
    "page",
    "per_page"
  ],

  "flickr.photos.getSizes": [
    "photo_id"
  ],

  "flickr.photos.search": [
    "user_id",
    "per_page",
    "page"
  ],

  "flickr.photos.comments.getList": [
    "photo_id",
    "min_comment_date",
    "max_comment_date"
  ],

  "flickr.photos.geo.getLocation": [
    "photo_id",
    "extras"
  ],


  "flickr.photosets.getContext": [
    "photo_id",
    "photoset_id"
  ],

  "flickr.photosets.getInfo": [
    "photoset_id"
  ],

  "flickr.photosets.getList": [
    "user_id",
    "page",
    "per_page"
  ],

  "flickr.photosets.getPhotos": [
    "photoset_id",
    "extras",
    "privacy_filter",
    "per_page",
    "page",
    "media"
  ],

  "flickr.photosets.comments.getList": [
    "photoset_id"
  ]
};
