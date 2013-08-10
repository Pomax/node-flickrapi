/**
 * Construct an API object based on the Flickr API
 * function/parameter pairs in flickr-function-list.js
 */
module.exports = (function() {
  "use strict";

  var template = require("./flickr-function-list"),
      Utils = require("./utils");

  /**
   * Build the Flickr API object based on the above template
   */
  return function(options) {

    var API = {
      options: options
    };

    Object.keys(template).forEach(function(method) {

      // find the place in the hierarchy to bind this function
      var parent = API,
          hierarchy = method.split(".").slice(1),
          fname;
      while(hierarchy.length>1) {
        fname = hierarchy.splice(0,1)[0];
        if(!parent[fname]) {
          parent[fname] = {};
        }
        parent = parent[fname];
      }
      fname = hierarchy[0];

      // build the actual function
      parent[fname] = function(callOptions, callback) {
        if(callOptions && !callback) {
          callback = callOptions;
          callOptions = {};
        }
        // effect a new timestampe and nonce
        options = Utils.setAuthVals(options);
        // set up authorized method access
        var queryArguments = {
          method: method,
          oauth_consumer_key: options.key,
          oauth_token: options.access_token
        };
        // set up bindings for method-specific args
        template[method].forEach(function(arg) {
          if(callOptions[arg]) {
            queryArguments[arg] = callOptions[arg];
          }
        });
        // and ultimately, everything calls queryFlickr
        Utils.queryFlickr(queryArguments, options, callback);
      }

    });

  	return API;
  };
}());
