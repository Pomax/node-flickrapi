/**
 *  This is a utility object for universal oauth
 *  signing as well as querying Flickr once a query
 *  object has been constructed to set to the Flickr
 *  API endpoint.
 *
 *  Response are in JSON format.
 */
module.exports = (function() {
  "use strict";
  var crypto = require("crypto"),
      request = require("request");

  /**
   * Pretty-print JSON files, because we will want
   * to inspect them manually, as good humans.
   */
  module.exports = (function() {
    if (!JSON.prettyprint) {
      JSON.prettyprint = function prettyprint(data) {
        return this.stringify(data, undefined, 2);
      };
    }
    return JSON;
  }());

  return {

    /**
     * Update an options object for use with Flickr oauth
     * so that it has a new timestampe and nonce.
     */
    setAuthVals: function(options) {
      var timestamp = "" + Date.now(),
          md5 = crypto.createHash('md5').update(timestamp).digest("hex"),
          nonce = md5.substring(0,32);
      options.oauth_timestamp = timestamp;
      options.oauth_nonce = nonce;
      return options;
    },

    /**
     * Collapse a number of oauth query arguments into an
     * alphabetically sorted, URI-safe concatenated string.
     */
    formQueryString: function(queryArguments) {
      var args = [],
          append = function(key) {
            args.push(key + "=" + queryArguments[key]);
          }
      Object.keys(queryArguments).sort().forEach(append);
      return args.join("&");
    },

    /**
     * Turn a url + query string into a Flickr API "base string".
     */
    formBaseString: function(url, queryString) {
      return ["GET", encodeURIComponent(url), encodeURIComponent(queryString)].join("&");
    },

    /**
     * Parse a Flickr API response.
     */
    parseRestResponse: function(body) {
      var constituents = body.split("&"),
          response = {},
          keyval;
      constituents.forEach(function(pair) {
        keyval = pair.split("=");
        response[keyval[0]] = keyval[1];
      })
      return response;
    },

    /**
     * HMAC-SHA1 data signing
     */
    sign: function(data, key, secret) {
      var hmacKey = key + "&" + (secret ? secret : ''),
          hmac = crypto.createHmac("SHA1", hmacKey);
      hmac.update(data);
      var digest = hmac.digest("base64");
      return encodeURIComponent(digest);
    },

    /**
     * Call the Flickr API
     */
    queryFlickr: function(queryArguments, flickrOptions, processResult, errors) {
      queryArguments.format = "json";
      queryArguments.api_key = flickrOptions.key;
      flickrOptions = this.setAuthVals(flickrOptions);
      var url = "http://ycpi.api.flickr.com/services/rest/",
          queryString = this.formQueryString(queryArguments),
          data = this.formBaseString(url, queryString),
          signature = this.sign(data, flickrOptions.secret, flickrOptions.access_token_secret),
          flickrURL = url + "?" + queryString + "&oauth_signature=" + signature;

      request.get(flickrURL, function(error, response, body) {
        // we can transform the error into something more
        // indicative if "errors" is an array of known errors
        // for this specific method call.
        if(!error) {
          body = JSON.parse(body.replace(/^jsonFlickrApi\(/,'').replace(/\}\)$/,'}'));
          if(body.stat !== "ok") {
            return processResult(new Error(body.message));
          }
        }

        processResult(error, body);
      });
    },
  };
}());
