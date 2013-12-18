/**
 * Browser-specific Utils object, used for compiling the Flickr API
 * client-side library. This acts as replacement for the regular
 * src/utils.js, which heavily relies on being run in Node.js context.
 */
module.exports = {
  formQueryString: function(queryArguments) {
    var args = [],
        append = function(key) {
          args.push(key + "=" + queryArguments[key]);
        };
    Object.keys(queryArguments).sort().forEach(append);
    return args.join("&");
  },
  checkRequirements: function(method_name, required, callOptions, callback) {
    required = required || [];
    for(var r=0, last=required.length, arg; r<last; r++) {
      arg = required[r];
      if(arg.name === "api_key") continue;
      if(!callOptions.hasOwnProperty(arg.name)) {
        return callback(new Error("missing required argument '"+arg.name+"' in call to "+method_name));
      }
    }
  },
  generateAPIFunction: function(method) {
    return function(callOptions, callback) {
      if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
      var queryArguments = Utils.generateQueryArguments(method.name, this.flickrOptions, callOptions);
      Utils.queryFlickr(queryArguments, this.flickrOptions, method.security, callback);
    };
  },
  generateAPIDevFunction: function(method) {
    return function(callOptions, callback) {
      if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
      Utils.checkRequirements(method.name, method.required, callOptions, callback);
      var queryArguments = Utils.generateQueryArguments(method.name, this.flickrOptions, callOptions);
      Utils.queryFlickr(queryArguments, this.flickrOptions, method.security, callback, method.errors);
    };
  },
  generateQueryArguments: function(method_name, flickrOptions, callOptions) {
    // set up authorized method access
    var queryArguments = {
      method: method_name,
      format: "json",
      api_key: flickrOptions.key
    };
    // set up bindings for method-specific args
    Object.keys(callOptions).forEach(function(key) {
      queryArguments[key] = callOptions[key];
    });
    return queryArguments;
  },
  queryFlickr: function(queryArguments, flickrOptions, security, processResult) {
    var protocol = (window.location.protocol.indexOf("http") === -1 ? "http:" : ""),
        url = "//api.flickr.com/services/rest/",
        queryString = this.formQueryString(queryArguments),
        flickrURL = protocol + url + "?" + queryString;

    // Do we need special permissions? (read private, 1, write, 2, or delete, 3)?
    // if so, those are currently not supported. Send an error-notification.
    if(security.requiredperms > 0) {
      return processResult(new Error("signed calls (write/delete) currently not supported"));
    }

    // TODO: add in permission support for perms > 0, using POST calls.

    var xhr = new XMLHttpRequest();
    xhr.open("GET", flickrURL, true);
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status == 200) {
          var error = false,
              body = xhr.responseText;

          if(!body) {
            error = "HTTP Error " + response.statusCode + " (" + statusCodes[response.statusCode] + ")";
            return processResult(error);
          }

          if(!error) {
            try {
              body = body.replace(/^jsonFlickrApi\(/,'').replace(/\}\)$/,'}');
              body = JSON.parse(body);
              if(body.stat !== "ok") {
                return processResult(body.message);
              }
            } catch (e) {
              return processResult("could not parse body as JSON");
            }
          }

          processResult(error, body);
        }
      }
    };
    xhr.send(null);
  }
};
