/**
 * FlickrAPI - generated from https://github.com/pomax/node-flickrapi
 * use: var flickr = Flickr({ api_key: "......" })
 * then just call flickr.method.name(options, callback). The options
 * object should contain the property/values that the flickr API
 * explains, the callback is assumed to have a function(error, result)
 * signature. Result will be a JSON object.
 */
(function() {
 var Flickr = function(flickrOptions) {
Utils = {};
Utils.formQueryString = function (queryArguments) {
    var args = [],
        append = function(key) {
          args.push(key + "=" + queryArguments[key]);
        };
    Object.keys(queryArguments).sort().forEach(append);
    return args.join("&");
  };
Utils.checkRequirements = function (method_name, required, callOptions, callback) {
    for(var r=0, last=required.length, arg; r<last; r++) {
      arg = required[r];
      if(arg.name === "api_key") continue;
      if(!callOptions.hasOwnProperty(arg.name)) {
        return callback(new Error("missing required argument '"+arg.name+"' in call to "+method_name));
      }
    }
  };
Utils.generateQueryArguments = function (method_name, flickrOptions, callOptions) {
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
  };
Utils.generateAPIFunction = function (method_name, flickrOptions, required, optional, errors) {
    var Utils = this;
    var fn = function(callOptions, callback) {
      // no options -> rebind callback
      if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
      Utils.checkRequirements(method_name, required, callOptions, callback);
      var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
      Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
    };
    fn.data = {
      required: required,
      optional: optional,
      errors: errors
    };
    return fn;
  };
Utils.queryFlickr = function (queryArguments, flickrOptions, processResult, errors) {
    var protocol = (window.location.protocol.indexOf("http") === -1 ? "http:" : ""),
        url = "//api.flickr.com/services/rest/",
        queryString = this.formQueryString(queryArguments),
        flickrURL = protocol + url + "?" + queryString;

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

          // we can transform the error into something more
          // indicative if "errors" is an array of known errors
          // for this specific method call.
          if(!error) {
            try {
              body = body.replace(/^jsonFlickrApi\(/,'').replace(/\}\)$/,'}');
              body = JSON.parse(body);
              if(body.stat !== "ok") {
                return processResult(new Error(body.message));
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
  };
flickr = {};
flickr.activity = {};
flickr.activity.userComments = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.activity.userComments";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.activity.userPhotos = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.activity.userPhotos";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.auth = {};
flickr.auth.checkToken = (function(Utils) {
  var required = [
  {
    "name": "auth_token",
    "optional": "0",
    "_content": "The authentication token to check."
  }
];
  var errors = [
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.auth.checkToken";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.auth.getFrob = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.auth.getFrob";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.auth.getFullToken = (function(Utils) {
  var required = [
  {
    "name": "mini_token",
    "optional": "0",
    "_content": "The mini-token typed in by a user. It should be 9 digits long. It may optionally contain dashes."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Mini-token not found",
    "_content": "The passed mini-token was not valid."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.auth.getFullToken";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.auth.getToken = (function(Utils) {
  var required = [
  {
    "name": "frob",
    "optional": "0",
    "_content": "The frob to check."
  }
];
  var errors = [
  {
    "code": "108",
    "message": "Invalid frob",
    "_content": "The specified frob does not exist or has already been used."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.auth.getToken";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.auth.oauth = {};
flickr.auth.oauth.checkToken = (function(Utils) {
  var required = [
  {
    "name": "oauth_token",
    "optional": "0",
    "_content": "The OAuth authentication token to check."
  }
];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.auth.oauth.checkToken";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.auth.oauth.getAccessToken = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.auth.oauth.getAccessToken";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.blogs = {};
flickr.blogs.getList = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.blogs.getList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.blogs.getServices = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.blogs.getServices";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.blogs.postPhoto = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to blog"
  },
  {
    "name": "title",
    "optional": "0",
    "_content": "The blog post title"
  },
  {
    "name": "description",
    "optional": "0",
    "_content": "The blog post body"
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Blog not found",
    "_content": "The blog id was not the id of a blog belonging to the calling user"
  },
  {
    "code": "2",
    "message": "Photo not found",
    "_content": "The photo id was not the id of a public photo"
  },
  {
    "code": "3",
    "message": "Password needed",
    "_content": "A password is not stored for the blog and one was not passed with the request"
  },
  {
    "code": "4",
    "message": "Blog post failed",
    "_content": "The blog posting failed (a blogging API failure of some sort)"
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.blogs.postPhoto";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.cameras = {};
flickr.cameras.getBrandModels = (function(Utils) {
  var required = [
  {
    "name": "brand",
    "optional": "0",
    "_content": "The ID of the requested brand (as returned from flickr.cameras.getBrands)."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Brand not found",
    "_content": "Unable to find the given brand ID."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.cameras.getBrandModels";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.cameras.getBrands = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.cameras.getBrands";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.collections = {};
flickr.collections.getInfo = (function(Utils) {
  var required = [
  {
    "name": "collection_id",
    "optional": "0",
    "_content": "The ID of the collection to fetch information for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Collection not found",
    "_content": "The requested collection could not be found or is not visible to the calling user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.collections.getInfo";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.collections.getTree = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "The specified user could not be found."
  },
  {
    "code": "2",
    "message": "Collection not found",
    "_content": "The specified collection does not exist."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.collections.getTree";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.commons = {};
flickr.commons.getInstitutions = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.commons.getInstitutions";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.contacts = {};
flickr.contacts.getList = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "Invalid sort parameter.",
    "_content": "The possible values are: name and time."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.contacts.getList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.contacts.getListRecentlyUploaded = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.contacts.getListRecentlyUploaded";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.contacts.getPublicList = (function(Utils) {
  var required = [
  {
    "name": "user_id",
    "optional": "0",
    "_content": "The NSID of the user to fetch the contact list for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "The specified user NSID was not a valid user."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.contacts.getPublicList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.contacts.getTaggingSuggestions = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.contacts.getTaggingSuggestions";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.favorites = {};
flickr.favorites.add = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to add to the user's favorites."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id."
  },
  {
    "code": "2",
    "message": "Photo is owned by you",
    "_content": "The photo belongs to the user and so cannot be added to their favorites."
  },
  {
    "code": "3",
    "message": "Photo is already in favorites",
    "_content": "The photo is already in the user's list of favorites."
  },
  {
    "code": "4",
    "message": "User cannot see photo",
    "_content": "The user does not have permission to add the photo to their favorites."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.favorites.add";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.favorites.getContext = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to fetch the context for."
  },
  {
    "name": "user_id",
    "optional": "0",
    "_content": "The user who counts the photo as a favorite."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id, or was the id of a photo that the calling user does not have permission to view."
  },
  {
    "code": "2",
    "message": "User not found",
    "_content": "The specified user was not found."
  },
  {
    "code": "3",
    "message": "Photo not a favorite",
    "_content": "The specified photo is not a favorite of the specified user."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.favorites.getContext";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.favorites.getList = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "The specified user NSID was not a valid flickr user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.favorites.getList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.favorites.getPublicList = (function(Utils) {
  var required = [
  {
    "name": "user_id",
    "optional": "0",
    "_content": "The user to fetch the favorites list for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "The specified user NSID was not a valid flickr user."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.favorites.getPublicList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.favorites.remove = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to remove from the user's favorites."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not in favorites",
    "_content": "The photo id passed was not in the user's favorites."
  },
  {
    "code": "2",
    "message": "Cannot remove photo from that user's favorites",
    "_content": "user_id was passed as an argument, but photo_id is not owned by the authenticated user."
  },
  {
    "code": "3",
    "message": "User not found",
    "_content": "Invalid user_id argument."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.favorites.remove";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.galleries = {};
flickr.galleries.addPhoto = (function(Utils) {
  var required = [
  {
    "name": "gallery_id",
    "optional": "0",
    "_content": "The ID of the gallery to add a photo to.  Note: this is the compound ID returned in methods like <a href=\"/services/api/flickr.galleries.getList.html\">flickr.galleries.getList</a>, and <a href=\"/services/api/flickr.galleries.getListForPhoto.html\">flickr.galleries.getListForPhoto</a>."
  },
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The photo ID to add to the gallery"
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required parameter missing",
    "_content": "One or more required parameters was not included with your API call."
  },
  {
    "code": "2",
    "message": "Invalid gallery ID",
    "_content": "That gallery could not be found."
  },
  {
    "code": "3",
    "message": "Invalid photo ID",
    "_content": "The requested photo could not be found."
  },
  {
    "code": "4",
    "message": "Invalid comment",
    "_content": "The comment body could not be validated."
  },
  {
    "code": "5",
    "message": "Failed to add photo",
    "_content": "Unable to add the photo to the gallery."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.galleries.addPhoto";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.galleries.create = (function(Utils) {
  var required = [
  {
    "name": "title",
    "optional": "0",
    "_content": "The name of the gallery"
  },
  {
    "name": "description",
    "optional": "0",
    "_content": "A short description for the gallery"
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required parameter missing",
    "_content": "One or more of the required parameters was missing from your API call."
  },
  {
    "code": "2",
    "message": "Invalid title or description",
    "_content": "The title or the description could not be validated."
  },
  {
    "code": "3",
    "message": "Failed to add gallery",
    "_content": "There was a problem creating the gallery."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.galleries.create";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.galleries.editMeta = (function(Utils) {
  var required = [
  {
    "name": "gallery_id",
    "optional": "0",
    "_content": "The gallery ID to update."
  },
  {
    "name": "title",
    "optional": "0",
    "_content": "The new title for the gallery."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required parameter missing",
    "_content": "One or more required parameters was missing from your request."
  },
  {
    "code": "2",
    "message": "Invalid title or description",
    "_content": "The title or description arguments could not be validated."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.galleries.editMeta";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.galleries.editPhoto = (function(Utils) {
  var required = [
  {
    "name": "gallery_id",
    "optional": "0",
    "_content": "The ID of the gallery to add a photo to. Note: this is the compound ID returned in methods like flickr.galleries.getList, and flickr.galleries.getListForPhoto."
  },
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The photo ID to add to the gallery."
  },
  {
    "name": "comment",
    "optional": "0",
    "_content": "The updated comment the photo."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Invalid gallery ID",
    "_content": "That gallery could not be found."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.galleries.editPhoto";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.galleries.editPhotos = (function(Utils) {
  var required = [
  {
    "name": "gallery_id",
    "optional": "0",
    "_content": "The id of the gallery to modify. The gallery must belong to the calling user."
  },
  {
    "name": "primary_photo_id",
    "optional": "0",
    "_content": "The id of the photo to use as the 'primary' photo for the gallery. This id must also be passed along in photo_ids list argument."
  },
  {
    "name": "photo_ids",
    "optional": "0",
    "_content": "A comma-delimited list of photo ids to include in the gallery. They will appear in the set in the order sent. This list must contain the primary photo id. This list of photos replaces the existing list."
  }
];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.galleries.editPhotos";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.galleries.getInfo = (function(Utils) {
  var required = [
  {
    "name": "gallery_id",
    "optional": "0",
    "_content": "The gallery ID you are requesting information for."
  }
];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.galleries.getInfo";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.galleries.getList = (function(Utils) {
  var required = [
  {
    "name": "user_id",
    "optional": "0",
    "_content": "The NSID of the user to get a galleries list for. If none is specified, the calling user is assumed."
  }
];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.galleries.getList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.galleries.getListForPhoto = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The ID of the photo to fetch a list of galleries for."
  }
];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.galleries.getListForPhoto";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.galleries.getPhotos = (function(Utils) {
  var required = [
  {
    "name": "gallery_id",
    "optional": "0",
    "_content": "The ID of the gallery of photos to return"
  }
];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.galleries.getPhotos";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups = {};
flickr.groups.browse = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "Category not found",
    "_content": "The value passed for cat_id was not a valid category id."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.browse";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.discuss = {};
flickr.groups.discuss.replies = {};
flickr.groups.discuss.replies.add = (function(Utils) {
  var required = [
  {
    "name": "topic_id",
    "optional": "0",
    "_content": "The ID of the topic to post a comment to."
  },
  {
    "name": "message",
    "optional": "0",
    "_content": "The message to post to the topic."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Topic not found",
    "_content": "The topic_id is invalid."
  },
  {
    "code": "2",
    "message": "Cannot post to group",
    "_content": "Either this account is not a member of the group, or discussion in this group is disabled.\r\n"
  },
  {
    "code": "3",
    "message": "Missing required arguments",
    "_content": "The topic_id and message are required."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.discuss.replies.add";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.discuss.replies.delete = (function(Utils) {
  var required = [
  {
    "name": "topic_id",
    "optional": "0",
    "_content": "The ID of the topic the post is in."
  },
  {
    "name": "reply_id",
    "optional": "0",
    "_content": "The ID of the reply to delete."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Topic not found",
    "_content": "The topic_id is invalid."
  },
  {
    "code": "2",
    "message": "Reply not found",
    "_content": "The reply_id is invalid."
  },
  {
    "code": "3",
    "message": "Cannot delete reply",
    "_content": "Replies can only be edited by their owner."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.discuss.replies.delete";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.discuss.replies.edit = (function(Utils) {
  var required = [
  {
    "name": "topic_id",
    "optional": "0",
    "_content": "The ID of the topic the post is in."
  },
  {
    "name": "reply_id",
    "optional": "0",
    "_content": "The ID of the reply post to edit."
  },
  {
    "name": "message",
    "optional": "0",
    "_content": "The message to edit the post with."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Topic not found",
    "_content": "The topic_id is invalid"
  },
  {
    "code": "2",
    "message": "Reply not found",
    "_content": "The reply_id is invalid."
  },
  {
    "code": "3",
    "message": "Missing required arguments",
    "_content": "The topic_id and reply_id are required."
  },
  {
    "code": "4",
    "message": "Cannot edit reply",
    "_content": "Replies can only be edited by their owner."
  },
  {
    "code": "5",
    "message": "Cannot post to group",
    "_content": "Either this account is not a member of the group, or discussion in this group is disabled."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.discuss.replies.edit";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.discuss.replies.getInfo = (function(Utils) {
  var required = [
  {
    "name": "topic_id",
    "optional": "0",
    "_content": "The ID of the topic the post is in."
  },
  {
    "name": "reply_id",
    "optional": "0",
    "_content": "The ID of the reply to fetch."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Topic not found",
    "_content": "The topic_id is invalid"
  },
  {
    "code": "2",
    "message": "Reply not found",
    "_content": "The reply_id is invalid"
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.discuss.replies.getInfo";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.discuss.replies.getList = (function(Utils) {
  var required = [
  {
    "name": "topic_id",
    "optional": "0",
    "_content": "The ID of the topic to fetch replies for."
  },
  {
    "name": "per_page",
    "optional": "0",
    "_content": "Number of photos to return per page. If this argument is omitted, it defaults to 100. The maximum allowed value is 500."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Topic not found",
    "_content": "The topic_id is invalid."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.discuss.replies.getList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.discuss.topics = {};
flickr.groups.discuss.topics.add = (function(Utils) {
  var required = [
  {
    "name": "group_id",
    "optional": "0",
    "_content": "The NSID of the group to add a topic to.\r\n"
  },
  {
    "name": "subject",
    "optional": "0",
    "_content": "The topic subject."
  },
  {
    "name": "message",
    "optional": "0",
    "_content": "The topic message."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Group not found",
    "_content": "The group by that ID does not exist\r\n"
  },
  {
    "code": "2",
    "message": "Cannot post to group",
    "_content": "Either this account is not a member of the group, or discussion in this group is disabled."
  },
  {
    "code": "3",
    "message": "Message is too long",
    "_content": "The post message is too long."
  },
  {
    "code": "4",
    "message": "Missing required arguments",
    "_content": "Subject and message are required."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.discuss.topics.add";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.discuss.topics.getInfo = (function(Utils) {
  var required = [
  {
    "name": "topic_id",
    "optional": "0",
    "_content": "The ID for the topic to edit."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Topic not found",
    "_content": "The topic_id is invalid"
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.discuss.topics.getInfo";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.discuss.topics.getList = (function(Utils) {
  var required = [
  {
    "name": "group_id",
    "optional": "0",
    "_content": "The NSID of the group to fetch information for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Group not found",
    "_content": "The group_id is invalid"
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.discuss.topics.getList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.getInfo = (function(Utils) {
  var required = [
  {
    "name": "group_id",
    "optional": "0",
    "_content": "The NSID of the group to fetch information for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Group not found",
    "_content": "The group NSID passed did not refer to a group that the calling user can see - either an invalid group is or a group that can't be seen by the calling user."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.getInfo";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.join = (function(Utils) {
  var required = [
  {
    "name": "group_id",
    "optional": "0",
    "_content": "The NSID of the Group in question"
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required arguments missing",
    "_content": "The group_id doesn't exist"
  },
  {
    "code": "2",
    "message": "Group does not exist",
    "_content": "The Group does not exist"
  },
  {
    "code": "3",
    "message": "Group not availabie to the account",
    "_content": "The authed account does not have permission to view/join the group."
  },
  {
    "code": "4",
    "message": "Account is already in that group",
    "_content": "The authed account has previously joined this group"
  },
  {
    "code": "5",
    "message": "Membership in group is by invitation only.",
    "_content": "Use flickr.groups.joinRequest to contact the administrations for an invitation."
  },
  {
    "code": "6",
    "message": "User must accept the group rules before joining",
    "_content": "The user must read and accept the rules before joining. Please see the accept_rules argument for this method."
  },
  {
    "code": "10",
    "message": "Account in maximum number of groups",
    "_content": "The account is a member of the maximum number of groups."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.join";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.joinRequest = (function(Utils) {
  var required = [
  {
    "name": "group_id",
    "optional": "0",
    "_content": "The NSID of the group to request joining."
  },
  {
    "name": "message",
    "optional": "0",
    "_content": "Message to the administrators."
  },
  {
    "name": "accept_rules",
    "optional": "0",
    "_content": "If the group has rules, they must be displayed to the user prior to joining. Passing a true value for this argument specifies that the application has displayed the group rules to the user, and that the user has agreed to them. (See flickr.groups.getInfo)."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required arguments missing",
    "_content": "The group_id or message argument are missing."
  },
  {
    "code": "2",
    "message": "Group does not exist",
    "_content": "The Group does not exist"
  },
  {
    "code": "3",
    "message": "Group not available to the account",
    "_content": "The authed account does not have permission to view/join the group."
  },
  {
    "code": "4",
    "message": "Account is already in that group",
    "_content": "The authed account has previously joined this group"
  },
  {
    "code": "5",
    "message": "Group is public and open",
    "_content": "The group does not require an invitation to join, please use flickr.groups.join."
  },
  {
    "code": "6",
    "message": "User must accept the group rules before joining",
    "_content": "The user must read and accept the rules before joining. Please see the accept_rules argument for this method."
  },
  {
    "code": "7",
    "message": "User has already requested to join that group",
    "_content": "A request has already been sent and is pending approval."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.joinRequest";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.leave = (function(Utils) {
  var required = [
  {
    "name": "group_id",
    "optional": "0",
    "_content": "The NSID of the Group to leave"
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required arguments missing",
    "_content": "The group_id doesn't exist"
  },
  {
    "code": "2",
    "message": "Group does not exist",
    "_content": "The group by that ID does not exist"
  },
  {
    "code": "3",
    "message": "Account is not in that group",
    "_content": "The user is not a member of the group that was specified"
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.leave";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.members = {};
flickr.groups.members.getList = (function(Utils) {
  var required = [
  {
    "name": "group_id",
    "optional": "0",
    "_content": "Return a list of members for this group.  The group must be viewable by the Flickr member on whose behalf the API call is made."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Group not found",
    "_content": ""
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.members.getList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.pools = {};
flickr.groups.pools.add = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to add to the group pool. The photo must belong to the calling user."
  },
  {
    "name": "group_id",
    "optional": "0",
    "_content": "The NSID of the group who's pool the photo is to be added to."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not the id of a photo owned by the caling user."
  },
  {
    "code": "2",
    "message": "Group not found",
    "_content": "The group id passed was not a valid id for a group the user is a member of."
  },
  {
    "code": "3",
    "message": "Photo already in pool",
    "_content": "The specified photo is already in the pool for the specified group."
  },
  {
    "code": "4",
    "message": "Photo in maximum number of pools",
    "_content": "The photo has already been added to the maximum allowed number of pools."
  },
  {
    "code": "5",
    "message": "Photo limit reached",
    "_content": "The user has already added the maximum amount of allowed photos to the pool."
  },
  {
    "code": "6",
    "message": "Your Photo has been added to the Pending Queue for this Pool",
    "_content": "The pool is moderated, and the photo has been added to the Pending Queue. If it is approved by a group administrator, it will be added to the pool."
  },
  {
    "code": "7",
    "message": "Your Photo has already been added to the Pending Queue for this Pool",
    "_content": "The pool is moderated, and the photo has already been added to the Pending Queue."
  },
  {
    "code": "8",
    "message": "Content not allowed",
    "_content": "The content has been disallowed from the pool by the group admin(s)."
  },
  {
    "code": "10",
    "message": "Maximum number of photos in Group Pool",
    "_content": "A group pool has reached the upper limit for the number of photos allowed."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.pools.add";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.pools.getContext = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to fetch the context for."
  },
  {
    "name": "group_id",
    "optional": "0",
    "_content": "The nsid of the group who's pool to fetch the photo's context for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id, or was the id of a photo that the calling user does not have permission to view."
  },
  {
    "code": "2",
    "message": "Photo not in pool",
    "_content": "The specified photo is not in the specified group's pool."
  },
  {
    "code": "3",
    "message": "Group not found",
    "_content": "The specified group nsid was not a valid group or the caller does not have permission to view the group's pool."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.pools.getContext";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.pools.getGroups = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.pools.getGroups";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.pools.getPhotos = (function(Utils) {
  var required = [
  {
    "name": "group_id",
    "optional": "0",
    "_content": "The id of the group who's pool you which to get the photo list for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Group not found",
    "_content": "The group id passed was not a valid group id."
  },
  {
    "code": "2",
    "message": "You don't have permission to view this pool",
    "_content": "The logged in user (if any) does not have permission to view the pool for this group."
  },
  {
    "code": "3",
    "message": "Unknown user",
    "_content": "The user specified by user_id does not exist."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.pools.getPhotos";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.pools.remove = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to remove from the group pool. The photo must either be owned by the calling user of the calling user must be an administrator of the group."
  },
  {
    "name": "group_id",
    "optional": "0",
    "_content": "The NSID of the group who's pool the photo is to removed from."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Group not found",
    "_content": "The group_id passed did not refer to a valid group."
  },
  {
    "code": "2",
    "message": "Photo not in pool",
    "_content": "The photo_id passed was not a valid id of a photo in the group pool."
  },
  {
    "code": "3",
    "message": "Insufficient permission to remove photo",
    "_content": "The calling user doesn't own the photo and is not an administrator of the group, so may not remove the photo from the pool."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.pools.remove";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.groups.search = (function(Utils) {
  var required = [
  {
    "name": "text",
    "optional": "0",
    "_content": "The text to search for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "No text passed",
    "_content": "The required text argument was ommited."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.groups.search";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.interestingness = {};
flickr.interestingness.getList = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "Not a valid date string.",
    "_content": "The date string passed did not validate. All dates must be formatted : YYYY-MM-DD"
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.interestingness.getList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.machinetags = {};
flickr.machinetags.getNamespaces = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "Not a valid predicate.",
    "_content": "Missing or invalid predicate argument."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.machinetags.getNamespaces";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.machinetags.getPairs = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "Not a valid namespace",
    "_content": "Missing or invalid namespace argument."
  },
  {
    "code": "2",
    "message": "Not a valid predicate",
    "_content": "Missing or invalid predicate argument."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.machinetags.getPairs";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.machinetags.getPredicates = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "Not a valid namespace",
    "_content": "Missing or invalid namespace argument."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.machinetags.getPredicates";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.machinetags.getRecentValues = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.machinetags.getRecentValues";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.machinetags.getValues = (function(Utils) {
  var required = [
  {
    "name": "namespace",
    "optional": "0",
    "_content": "The namespace that all values should be restricted to."
  },
  {
    "name": "predicate",
    "optional": "0",
    "_content": "The predicate that all values should be restricted to."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Not a valid namespace",
    "_content": "Missing or invalid namespace argument."
  },
  {
    "code": "2",
    "message": "Not a valid predicate",
    "_content": "Missing or invalid predicate argument."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.machinetags.getValues";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.panda = {};
flickr.panda.getList = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.panda.getList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.panda.getPhotos = (function(Utils) {
  var required = [
  {
    "name": "panda_name",
    "optional": "0",
    "_content": "The name of the panda to ask for photos from. There are currently three pandas named:<br /><br />\r\n\r\n<ul>\r\n<li><strong><a href=\"http://flickr.com/photos/ucumari/126073203/\">ling ling</a></strong></li>\r\n<li><strong><a href=\"http://flickr.com/photos/lynnehicks/136407353\">hsing hsing</a></strong></li>\r\n<li><strong><a href=\"http://flickr.com/photos/perfectpandas/1597067182/\">wang wang</a></strong></li>\r\n</ul>\r\n\r\n<br />You can fetch a list of all the current pandas using the <a href=\"/services/api/flickr.panda.getList.html\">flickr.panda.getList</a> API method."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required parameter missing.",
    "_content": "One or more required parameters was not included with your request."
  },
  {
    "code": "2",
    "message": "Unknown panda",
    "_content": "You requested a panda we haven't met yet."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.panda.getPhotos";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.people = {};
flickr.people.findByEmail = (function(Utils) {
  var required = [
  {
    "name": "find_email",
    "optional": "0",
    "_content": "The email address of the user to find  (may be primary or secondary)."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "No user with the supplied email address was found."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.people.findByEmail";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.people.findByUsername = (function(Utils) {
  var required = [
  {
    "name": "username",
    "optional": "0",
    "_content": "The username of the user to lookup."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "No user with the supplied username was found."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.people.findByUsername";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.people.getGroups = (function(Utils) {
  var required = [
  {
    "name": "user_id",
    "optional": "0",
    "_content": "The NSID of the user to fetch groups for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "The user id passed did not match a Flickr user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.people.getGroups";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.people.getInfo = (function(Utils) {
  var required = [
  {
    "name": "user_id",
    "optional": "0",
    "_content": "The NSID of the user to fetch information about."
  },
  {
    "name": "url",
    "optional": "0",
    "_content": "As an alternative to user_id, load a member based on URL, either photos or people URL."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "The user id passed did not match a Flickr user."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.people.getInfo";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.people.getLimits = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.people.getLimits";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.people.getPhotos = (function(Utils) {
  var required = [
  {
    "name": "user_id",
    "optional": "0",
    "_content": "The NSID of the user who's photos to return. A value of \"me\" will return the calling user's photos."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required arguments missing",
    "_content": ""
  },
  {
    "code": "2",
    "message": "Unknown user",
    "_content": "A user_id was passed which did not match a valid flickr user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.people.getPhotos";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.people.getPhotosOf = (function(Utils) {
  var required = [
  {
    "name": "user_id",
    "optional": "0",
    "_content": "The NSID of the user you want to find photos of. A value of \"me\" will search against photos of the calling user, for authenticated calls."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User not found.",
    "_content": "A user_id was passed which did not match a valid flickr user."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.people.getPhotosOf";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.people.getPublicGroups = (function(Utils) {
  var required = [
  {
    "name": "user_id",
    "optional": "0",
    "_content": "The NSID of the user to fetch groups for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "The user id passed did not match a Flickr user."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.people.getPublicGroups";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.people.getPublicPhotos = (function(Utils) {
  var required = [
  {
    "name": "user_id",
    "optional": "0",
    "_content": "The NSID of the user who's photos to return."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "The user NSID passed was not a valid user NSID."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.people.getPublicPhotos";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.people.getUploadStatus = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.people.getUploadStatus";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos = {};
flickr.photos.addTags = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to add tags to."
  },
  {
    "name": "tags",
    "optional": "0",
    "_content": "The tags to add to the photo."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not the id of a photo that the calling user can add tags to. It could be an invalid id, or the user may not have permission to add tags to it."
  },
  {
    "code": "2",
    "message": "Maximum number of tags reached",
    "_content": "The maximum number of tags for the photo has been reached - no more tags can be added. If the current count is less than the maximum, but adding all of the tags for this request would go over the limit, the whole request is ignored. I.E. when you get this message, none of the requested tags have been added."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.addTags";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.comments = {};
flickr.photos.comments.addComment = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to add a comment to."
  },
  {
    "name": "comment_text",
    "optional": "0",
    "_content": "Text of the comment"
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found.",
    "_content": "The photo id passed was not a valid photo id"
  },
  {
    "code": "8",
    "message": "Blank comment.",
    "_content": "Comment text can not be blank"
  },
  {
    "code": "9",
    "message": "User is posting comments too fast.",
    "_content": "The user has reached the limit for number of comments posted during a specific time period.  Wait a bit and try again."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.comments.addComment";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.comments.deleteComment = (function(Utils) {
  var required = [
  {
    "name": "comment_id",
    "optional": "0",
    "_content": "The id of the comment to edit."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found.",
    "_content": "The requested comment is against a photo which no longer exists."
  },
  {
    "code": "2",
    "message": "Comment not found.",
    "_content": "The comment id passed was not a valid comment id"
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.comments.deleteComment";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.comments.editComment = (function(Utils) {
  var required = [
  {
    "name": "comment_id",
    "optional": "0",
    "_content": "The id of the comment to edit."
  },
  {
    "name": "comment_text",
    "optional": "0",
    "_content": "Update the comment to this text."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found.",
    "_content": "The requested comment is against a photo which no longer exists."
  },
  {
    "code": "2",
    "message": "Comment not found.",
    "_content": "The comment id passed was not a valid comment id"
  },
  {
    "code": "8",
    "message": "Blank comment.",
    "_content": "Comment text can not be blank"
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.comments.editComment";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.comments.getList = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to fetch comments for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.comments.getList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.comments.getRecentForContacts = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.comments.getRecentForContacts";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.delete = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to delete."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id was not the id of a photo belonging to the calling user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.delete";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.geo = {};
flickr.photos.geo.batchCorrectLocation = (function(Utils) {
  var required = [
  {
    "name": "lat",
    "optional": "0",
    "_content": "The latitude of the photos to be update whose valid range is -90 to 90. Anything more than 6 decimal places will be truncated."
  },
  {
    "name": "lon",
    "optional": "0",
    "_content": "The longitude of the photos to be updated whose valid range is -180 to 180. Anything more than 6 decimal places will be truncated."
  },
  {
    "name": "accuracy",
    "optional": "0",
    "_content": "Recorded accuracy level of the photos to be updated. World level is 1, Country is ~3, Region ~6, City ~11, Street ~16. Current range is 1-16. Defaults to 16 if not specified."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required arguments missing",
    "_content": "Some or all of the required arguments were not supplied."
  },
  {
    "code": "2",
    "message": "Not a valid latitude",
    "_content": "The latitude argument failed validation."
  },
  {
    "code": "3",
    "message": "Not a valid longitude",
    "_content": "The longitude argument failed validation."
  },
  {
    "code": "4",
    "message": "Not a valid accuracy",
    "_content": "The accuracy argument failed validation."
  },
  {
    "code": "5",
    "message": "Not a valid Places ID",
    "_content": "An invalid Places (or WOE) ID was passed with the API call."
  },
  {
    "code": "6",
    "message": "No photos geotagged at that location",
    "_content": "There were no geotagged photos found for the authed user at the supplied latitude, longitude and accuracy."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.geo.batchCorrectLocation";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.geo.correctLocation = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The ID of the photo whose WOE location is being corrected."
  },
  {
    "name": "foursquare_id",
    "optional": "0",
    "_content": "The venue ID for a Foursquare location. (If not passed in with correction, any existing foursquare venue will be removed)."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User has not configured default viewing settings for location data.",
    "_content": "Before users may assign location data to a photo they must define who, by default, may view that information. Users can edit this preference at <a href=\"http://www.flickr.com/account/geo/privacy/\">http://www.flickr.com/account/geo/privacy/</a>"
  },
  {
    "code": "2",
    "message": "Missing place ID",
    "_content": "No place ID was passed to the method"
  },
  {
    "code": "3",
    "message": "Not a valid place ID",
    "_content": "The place ID passed to the method could not be identified"
  },
  {
    "code": "4",
    "message": "Server error correcting location.",
    "_content": "There was an error trying to correct the location."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.geo.correctLocation";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.geo.getLocation = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo you want to retrieve location data for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found.",
    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
  },
  {
    "code": "2",
    "message": "Photo has no location information.",
    "_content": "The photo requested has no location data or is not viewable by the calling user."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.geo.getLocation";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.geo.getPerms = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to get permissions for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
  },
  {
    "code": "2",
    "message": "Photo has no location information",
    "_content": "The photo requested has no location data or is not viewable by the calling user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.geo.getPerms";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.geo.photosForLocation = (function(Utils) {
  var required = [
  {
    "name": "lat",
    "optional": "0",
    "_content": "The latitude whose valid range is -90 to 90. Anything more than 6 decimal places will be truncated."
  },
  {
    "name": "lon",
    "optional": "0",
    "_content": "The longitude whose valid range is -180 to 180. Anything more than 6 decimal places will be truncated."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required arguments missing",
    "_content": "One or more required arguments was missing from the method call."
  },
  {
    "code": "2",
    "message": "Not a valid latitude",
    "_content": "The latitude argument failed validation."
  },
  {
    "code": "3",
    "message": "Not a valid longitude",
    "_content": "The longitude argument failed validation."
  },
  {
    "code": "4",
    "message": "Not a valid accuracy",
    "_content": "The accuracy argument failed validation."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.geo.photosForLocation";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.geo.removeLocation = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo you want to remove location data from."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
  },
  {
    "code": "2",
    "message": "Photo has no location information",
    "_content": "The specified photo has not been geotagged - there is nothing to remove."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.geo.removeLocation";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.geo.setContext = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to set context data for."
  },
  {
    "name": "context",
    "optional": "0",
    "_content": "Context is a numeric value representing the photo's geotagginess beyond latitude and longitude. For example, you may wish to indicate that a photo was taken \"indoors\" or \"outdoors\". <br /><br />\r\nThe current list of context IDs is :<br /><br/>\r\n<ul>\r\n<li><strong>0</strong>, not defined.</li>\r\n<li><strong>1</strong>, indoors.</li>\r\n<li><strong>2</strong>, outdoors.</li>\r\n</ul>"
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
  },
  {
    "code": "2",
    "message": "Not a valid context",
    "_content": "The context ID passed to the method is invalid."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.geo.setContext";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.geo.setLocation = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to set location data for."
  },
  {
    "name": "lat",
    "optional": "0",
    "_content": "The latitude whose valid range is -90 to 90. Anything more than 6 decimal places will be truncated."
  },
  {
    "name": "lon",
    "optional": "0",
    "_content": "The longitude whose valid range is -180 to 180. Anything more than 6 decimal places will be truncated."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
  },
  {
    "code": "2",
    "message": "Required arguments missing.",
    "_content": "Some or all of the required arguments were not supplied."
  },
  {
    "code": "3",
    "message": "Not a valid latitude.",
    "_content": "The latitude argument failed validation."
  },
  {
    "code": "4",
    "message": "Not a valid longitude.",
    "_content": "The longitude argument failed validation."
  },
  {
    "code": "5",
    "message": "Not a valid accuracy.",
    "_content": "The accuracy argument failed validation."
  },
  {
    "code": "6",
    "message": "Server error.",
    "_content": "There was an unexpected problem setting location information to the photo."
  },
  {
    "code": "7",
    "message": "User has not configured default viewing settings for location data.",
    "_content": "Before users may assign location data to a photo they must define who, by default, may view that information. Users can edit this preference at <a href=\"http://www.flickr.com/account/geo/privacy/\">http://www.flickr.com/account/geo/privacy/</a>"
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.geo.setLocation";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.geo.setPerms = (function(Utils) {
  var required = [
  {
    "name": "is_public",
    "optional": "0",
    "_content": "1 to set viewing permissions for the photo's location data to public, 0 to set it to private."
  },
  {
    "name": "is_contact",
    "optional": "0",
    "_content": "1 to set viewing permissions for the photo's location data to contacts, 0 to set it to private."
  },
  {
    "name": "is_friend",
    "optional": "0",
    "_content": "1 to set viewing permissions for the photo's location data to friends, 0 to set it to private."
  },
  {
    "name": "is_family",
    "optional": "0",
    "_content": "1 to set viewing permissions for the photo's location data to family, 0 to set it to private."
  },
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to get permissions for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
  },
  {
    "code": "2",
    "message": "Photo has no location information",
    "_content": "The photo requested has no location data or is not viewable by the calling user."
  },
  {
    "code": "3",
    "message": "Required arguments missing.",
    "_content": "Some or all of the required arguments were not supplied."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.geo.setPerms";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.getAllContexts = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The photo to return information for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not the id of a valid photo."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.getAllContexts";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.getContactsPhotos = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.getContactsPhotos";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.getContactsPublicPhotos = (function(Utils) {
  var required = [
  {
    "name": "user_id",
    "optional": "0",
    "_content": "The NSID of the user to fetch photos for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "The user NSID passed was not a valid user NSID."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.getContactsPublicPhotos";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.getContext = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to fetch the context for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id, or was the id of a photo that the calling user does not have permission to view."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.getContext";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.getCounts = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "No dates specified",
    "_content": "Neither dates nor taken_dates were specified."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.getCounts";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.getExif = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to fetch information for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
  },
  {
    "code": "2",
    "message": "Permission denied",
    "_content": "The owner of the photo does not want to share EXIF data."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.getExif";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.getFavorites = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The ID of the photo to fetch the favoriters list for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The specified photo does not exist, or the calling user does not have permission to view it."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.getFavorites";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.getInfo = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to get information for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found.",
    "_content": "The photo id was either invalid or was for a photo not viewable by the calling user."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.getInfo";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.getNotInSet = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.getNotInSet";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.getPerms = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to get permissions for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id of a photo belonging to the calling user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.getPerms";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.getRecent = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "bad value for jump_to, must be valid photo id.",
    "_content": ""
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.getRecent";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.getSizes = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to fetch size information for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id."
  },
  {
    "code": "2",
    "message": "Permission denied",
    "_content": "The calling user does not have permission to view the photo."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.getSizes";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.getUntagged = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.getUntagged";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.getWithGeoData = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.getWithGeoData";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.getWithoutGeoData = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.getWithoutGeoData";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.licenses = {};
flickr.photos.licenses.getInfo = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.licenses.getInfo";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.licenses.setLicense = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The photo to update the license for."
  },
  {
    "name": "license_id",
    "optional": "0",
    "_content": "The license to apply, or 0 (zero) to remove the current license. Note : as of this writing the \"no known copyright restrictions\" license (7) is not a valid argument."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The specified id was not the id of a valif photo owner by the calling user."
  },
  {
    "code": "2",
    "message": "License not found",
    "_content": "The license id was not valid."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.licenses.setLicense";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.notes = {};
flickr.photos.notes.add = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to add a note to"
  },
  {
    "name": "note_x",
    "optional": "0",
    "_content": "The left coordinate of the note"
  },
  {
    "name": "note_y",
    "optional": "0",
    "_content": "The top coordinate of the note"
  },
  {
    "name": "note_w",
    "optional": "0",
    "_content": "The width of the note"
  },
  {
    "name": "note_h",
    "optional": "0",
    "_content": "The height of the note"
  },
  {
    "name": "note_text",
    "optional": "0",
    "_content": "The description of the note"
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id"
  },
  {
    "code": "2",
    "message": "User cannot add notes",
    "_content": "The calling user does not have permission to add a note to this photo"
  },
  {
    "code": "3",
    "message": "Missing required arguments",
    "_content": "One or more of the required arguments were not supplied."
  },
  {
    "code": "4",
    "message": "Maximum number of notes reached",
    "_content": "The maximum number of notes for the photo has been reached."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.notes.add";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.notes.delete = (function(Utils) {
  var required = [
  {
    "name": "note_id",
    "optional": "0",
    "_content": "The id of the note to delete"
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Note not found",
    "_content": "The note id passed was not a valid note id"
  },
  {
    "code": "2",
    "message": "User cannot delete note",
    "_content": "The calling user does not have permission to delete the specified note"
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.notes.delete";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.notes.edit = (function(Utils) {
  var required = [
  {
    "name": "note_id",
    "optional": "0",
    "_content": "The id of the note to edit"
  },
  {
    "name": "note_x",
    "optional": "0",
    "_content": "The left coordinate of the note"
  },
  {
    "name": "note_y",
    "optional": "0",
    "_content": "The top coordinate of the note"
  },
  {
    "name": "note_w",
    "optional": "0",
    "_content": "The width of the note"
  },
  {
    "name": "note_h",
    "optional": "0",
    "_content": "The height of the note"
  },
  {
    "name": "note_text",
    "optional": "0",
    "_content": "The description of the note"
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Note not found",
    "_content": "The note id passed was not a valid note id"
  },
  {
    "code": "2",
    "message": "User cannot edit note",
    "_content": "The calling user does not have permission to edit the specified note"
  },
  {
    "code": "3",
    "message": "Missing required arguments",
    "_content": "One or more of the required arguments were not supplied."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.notes.edit";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.people = {};
flickr.photos.people.add = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to add a person to."
  },
  {
    "name": "user_id",
    "optional": "0",
    "_content": "The NSID of the user to add to the photo."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Person not found",
    "_content": "The NSID passed was not a valid user id."
  },
  {
    "code": "2",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id."
  },
  {
    "code": "3",
    "message": "User cannot add this person to photos",
    "_content": "The person being added to the photo does not allow the calling user to add them."
  },
  {
    "code": "4",
    "message": "User cannot add people to that photo",
    "_content": "The owner of the photo doesn't allow the calling user to add people to their photos."
  },
  {
    "code": "5",
    "message": "Person can't be tagged in that photo",
    "_content": "The person being added to the photo does not want to be identified in this photo."
  },
  {
    "code": "6",
    "message": "Some co-ordinate paramters were blank",
    "_content": "Not all of the co-ordinate parameters (person_x, person_y, person_w, person_h) were passed with valid values."
  },
  {
    "code": "7",
    "message": "Can't add that person to a non-public photo",
    "_content": "You can only add yourself to another member's non-public photos."
  },
  {
    "code": "8",
    "message": "Too many people in that photo",
    "_content": "The maximum number of people has already been added to the photo."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.people.add";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.people.delete = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to remove a person from."
  },
  {
    "name": "user_id",
    "optional": "0",
    "_content": "The NSID of the person to remove from the photo."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Person not found",
    "_content": "The NSID passed was not a valid user id."
  },
  {
    "code": "2",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id."
  },
  {
    "code": "3",
    "message": "User cannot remove that person",
    "_content": "The calling user did not have permission to remove this person from this photo."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.people.delete";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.people.deleteCoords = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to edit a person in."
  },
  {
    "name": "user_id",
    "optional": "0",
    "_content": "The NSID of the person whose bounding box you want to remove."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Person not found",
    "_content": "The NSID passed was not a valid user id."
  },
  {
    "code": "2",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id."
  },
  {
    "code": "3",
    "message": "User cannot edit that person in that photo",
    "_content": "The calling user is neither the person depicted in the photo nor the person who added the bounding box."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.people.deleteCoords";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.people.editCoords = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to edit a person in."
  },
  {
    "name": "user_id",
    "optional": "0",
    "_content": "The NSID of the person to edit in a photo."
  },
  {
    "name": "person_x",
    "optional": "0",
    "_content": "The left-most pixel co-ordinate of the box around the person."
  },
  {
    "name": "person_y",
    "optional": "0",
    "_content": "The top-most pixel co-ordinate of the box around the person."
  },
  {
    "name": "person_w",
    "optional": "0",
    "_content": "The width (in pixels) of the box around the person."
  },
  {
    "name": "person_h",
    "optional": "0",
    "_content": "The height (in pixels) of the box around the person."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Person not found",
    "_content": "The NSID passed was not a valid user id."
  },
  {
    "code": "2",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id."
  },
  {
    "code": "3",
    "message": "User cannot edit that person in that photo",
    "_content": "The calling user did not originally add this person to the photo, and is not the person in question."
  },
  {
    "code": "4",
    "message": "Some co-ordinate paramters were blank",
    "_content": "Not all of the co-ordinate parameters (person_x, person_y, person_w, person_h) were passed with valid values."
  },
  {
    "code": "5",
    "message": "No co-ordinates given",
    "_content": "None of the co-ordinate parameters were valid."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.people.editCoords";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.people.getList = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to get a list of people for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.people.getList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.recentlyUpdated = (function(Utils) {
  var required = [
  {
    "name": "min_date",
    "optional": "0",
    "_content": "A Unix timestamp or any English textual datetime description indicating the date from which modifications should be compared."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required argument missing.",
    "_content": "Some or all of the required arguments were not supplied."
  },
  {
    "code": "2",
    "message": "Not a valid date",
    "_content": "The date argument did not pass validation."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.recentlyUpdated";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.removeTag = (function(Utils) {
  var required = [
  {
    "name": "tag_id",
    "optional": "0",
    "_content": "The tag to remove from the photo. This parameter should contain a tag id, as returned by <a href=\"/services/api/flickr.photos.getInfo.html\">flickr.photos.getInfo</a>."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Tag not found",
    "_content": "The calling user doesn't have permission to delete the specified tag. This could mean it belongs to someone else, or doesn't exist."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.removeTag";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.search = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "Too many tags in ALL query",
    "_content": "When performing an 'all tags' search, you may not specify more than 20 tags to join together."
  },
  {
    "code": "2",
    "message": "Unknown user",
    "_content": "A user_id was passed which did not match a valid flickr user."
  },
  {
    "code": "3",
    "message": "Parameterless searches have been disabled",
    "_content": "To perform a search with no parameters (to get the latest public photos, please use flickr.photos.getRecent instead)."
  },
  {
    "code": "4",
    "message": "You don't have permission to view this pool",
    "_content": "The logged in user (if any) does not have permission to view the pool for this group."
  },
  {
    "code": "10",
    "message": "Sorry, the Flickr search API is not currently available.",
    "_content": "The Flickr API search databases are temporarily unavailable."
  },
  {
    "code": "11",
    "message": "No valid machine tags",
    "_content": "The query styntax for the machine_tags argument did not validate."
  },
  {
    "code": "12",
    "message": "Exceeded maximum allowable machine tags",
    "_content": "The maximum number of machine tags in a single query was exceeded."
  },
  {
    "code": "13",
    "message": "jump_to not avaiable for this query",
    "_content": "jump_to only supported for some query types."
  },
  {
    "code": "14",
    "message": "Bad value for jump_to",
    "_content": "jump_to must be valid photo ID."
  },
  {
    "code": "15",
    "message": "Photo not found",
    "_content": ""
  },
  {
    "code": "16",
    "message": "You can only search within your own favorites",
    "_content": ""
  },
  {
    "code": "17",
    "message": "You can only search within your own contacts",
    "_content": "The call tried to use the contacts parameter with no user ID or a user ID other than that of the authenticated user."
  },
  {
    "code": "18",
    "message": "Illogical arguments",
    "_content": "The request contained contradictory arguments."
  },
  {
    "code": "20",
    "message": "Excessive photo offset in search",
    "_content": "The search requested photos beyond an allowable offset. Reduce the page number or number of results per page for this search."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.search";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.setContentType = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to set the adultness of."
  },
  {
    "name": "content_type",
    "optional": "0",
    "_content": "The content type of the photo. Must be one of: 1 for Photo, 2 for Screenshot, and 3 for Other."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id of a photo belonging to the calling user."
  },
  {
    "code": "2",
    "message": "Required arguments missing",
    "_content": "Some or all of the required arguments were not supplied."
  },
  {
    "code": "3",
    "message": "Change not allowed",
    "_content": "Changing the content type of this photo is not allowed."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.setContentType";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.setDates = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to edit dates for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id was not the id of a valid photo belonging to the calling user."
  },
  {
    "code": "2",
    "message": "Not enough arguments",
    "_content": "No dates were specified to be changed."
  },
  {
    "code": "3",
    "message": "Invalid granularity",
    "_content": "The value passed for 'granularity' was not a valid flickr date granularity."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.setDates";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.setMeta = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to set information for."
  },
  {
    "name": "title",
    "optional": "0",
    "_content": "The title for the photo."
  },
  {
    "name": "description",
    "optional": "0",
    "_content": "The description for the photo."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not the id of a photo belonging to the calling user. It might be an invalid id, or the photo might be owned by another user. "
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.setMeta";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.setPerms = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to set permissions for."
  },
  {
    "name": "is_public",
    "optional": "0",
    "_content": "1 to set the photo to public, 0 to set it to private."
  },
  {
    "name": "is_friend",
    "optional": "0",
    "_content": "1 to make the photo visible to friends when private, 0 to not."
  },
  {
    "name": "is_family",
    "optional": "0",
    "_content": "1 to make the photo visible to family when private, 0 to not."
  },
  {
    "name": "perm_comment",
    "optional": "0",
    "_content": "who can add comments to the photo and it's notes. one of:<br />\r\n<code>0</code>: nobody<br />\r\n<code>1</code>: friends &amp; family<br />\r\n<code>2</code>: contacts<br />\r\n<code>3</code>: everybody"
  },
  {
    "name": "perm_addmeta",
    "optional": "0",
    "_content": "who can add notes and tags to the photo. one of:<br />\r\n<code>0</code>: nobody / just the owner<br />\r\n<code>1</code>: friends &amp; family<br />\r\n<code>2</code>: contacts<br />\r\n<code>3</code>: everybody\r\n"
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id of a photo belonging to the calling user."
  },
  {
    "code": "2",
    "message": "Required arguments missing",
    "_content": "Some or all of the required arguments were not supplied."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.setPerms";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.setSafetyLevel = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to set the adultness of."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id of a photo belonging to the calling user."
  },
  {
    "code": "2",
    "message": "Invalid or missing arguments",
    "_content": "Neither a valid safety level nor a hidden value were passed."
  },
  {
    "code": "3",
    "message": "Change not allowed",
    "_content": "Changing the safety level of this photo is not allowed."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.setSafetyLevel";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.setTags = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to set tags for.\r\n"
  },
  {
    "name": "tags",
    "optional": "0",
    "_content": "All tags for the photo (as a single space-delimited string)."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not the id of a photo belonging to the calling user. It might be an invalid id, or the photo might be owned by another user. "
  },
  {
    "code": "2",
    "message": "Maximum number of tags reached",
    "_content": "The number of tags specified exceeds the limit for the photo. No tags were modified."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.setTags";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.suggestions = {};
flickr.photos.suggestions.approveSuggestion = (function(Utils) {
  var required = [
  {
    "name": "suggestion_id",
    "optional": "0",
    "_content": "The unique ID for the location suggestion to approve."
  }
];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.suggestions.approveSuggestion";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.suggestions.getList = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.suggestions.getList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.suggestions.rejectSuggestion = (function(Utils) {
  var required = [
  {
    "name": "suggestion_id",
    "optional": "0",
    "_content": "The unique ID of the suggestion to reject."
  }
];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.suggestions.rejectSuggestion";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.suggestions.removeSuggestion = (function(Utils) {
  var required = [
  {
    "name": "suggestion_id",
    "optional": "0",
    "_content": "The unique ID for the location suggestion to approve."
  }
];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.suggestions.removeSuggestion";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.suggestions.suggestLocation = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The photo whose location you are suggesting."
  },
  {
    "name": "lat",
    "optional": "0",
    "_content": "The latitude whose valid range is -90 to 90. Anything more than 6 decimal places will be truncated."
  },
  {
    "name": "lon",
    "optional": "0",
    "_content": "The longitude whose valid range is -180 to 180. Anything more than 6 decimal places will be truncated."
  }
];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.suggestions.suggestLocation";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.transform = {};
flickr.photos.transform.rotate = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to rotate."
  },
  {
    "name": "degrees",
    "optional": "0",
    "_content": "The amount of degrees by which to rotate the photo (clockwise) from it's current orientation. Valid values are 90, 180 and 270."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id was invalid or did not belong to the calling user."
  },
  {
    "code": "2",
    "message": "Invalid rotation",
    "_content": "The rotation degrees were an invalid value."
  },
  {
    "code": "3",
    "message": "Temporary failure",
    "_content": "There was a problem either rotating the image or storing the rotated versions."
  },
  {
    "code": "4",
    "message": "Rotation disabled",
    "_content": "The rotation service is currently disabled."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.transform.rotate";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photos.upload = {};
flickr.photos.upload.checkTickets = (function(Utils) {
  var required = [
  {
    "name": "tickets",
    "optional": "0",
    "_content": "A comma-delimited list of ticket ids"
  }
];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photos.upload.checkTickets";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets = {};
flickr.photosets.addPhoto = (function(Utils) {
  var required = [
  {
    "name": "photoset_id",
    "optional": "0",
    "_content": "The id of the photoset to add a photo to."
  },
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to add to the set."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photoset not found",
    "_content": "The photoset id passed was not the id of avalid photoset owned by the calling user."
  },
  {
    "code": "2",
    "message": "Photo not found",
    "_content": "The photo id passed was not the id of a valid photo owned by the calling user."
  },
  {
    "code": "3",
    "message": "Photo already in set",
    "_content": "The photo is already a member of the photoset."
  },
  {
    "code": "10",
    "message": "Maximum number of photos in set",
    "_content": "A set has reached the upper limit for the number of photos allowed."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.addPhoto";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.comments = {};
flickr.photosets.comments.addComment = (function(Utils) {
  var required = [
  {
    "name": "photoset_id",
    "optional": "0",
    "_content": "The id of the photoset to add a comment to."
  },
  {
    "name": "comment_text",
    "optional": "0",
    "_content": "Text of the comment"
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photoset not found",
    "_content": ""
  },
  {
    "code": "8",
    "message": "Blank comment",
    "_content": ""
  },
  {
    "code": "9",
    "message": "User is posting comments too fast.",
    "_content": "The user has reached the limit for number of comments posted during a specific time period. Wait a bit and try again."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.comments.addComment";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.comments.deleteComment = (function(Utils) {
  var required = [
  {
    "name": "comment_id",
    "optional": "0",
    "_content": "The id of the comment to delete from a photoset."
  }
];
  var errors = [
  {
    "code": "2",
    "message": "Comment not found.",
    "_content": "The comment id passed was not a valid comment id"
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.comments.deleteComment";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.comments.editComment = (function(Utils) {
  var required = [
  {
    "name": "comment_id",
    "optional": "0",
    "_content": "The id of the comment to edit."
  },
  {
    "name": "comment_text",
    "optional": "0",
    "_content": "Update the comment to this text."
  }
];
  var errors = [
  {
    "code": "2",
    "message": "Comment not found.",
    "_content": "The comment id passed was not a valid comment id."
  },
  {
    "code": "8",
    "message": "Blank comment.",
    "_content": "Comment text can't be blank."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.comments.editComment";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.comments.getList = (function(Utils) {
  var required = [
  {
    "name": "photoset_id",
    "optional": "0",
    "_content": "The id of the photoset to fetch comments for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photoset not found.",
    "_content": "The photoset id was invalid."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.comments.getList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.create = (function(Utils) {
  var required = [
  {
    "name": "title",
    "optional": "0",
    "_content": "A title for the photoset."
  },
  {
    "name": "primary_photo_id",
    "optional": "0",
    "_content": "The id of the photo to represent this set. The photo must belong to the calling user."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "No title specified",
    "_content": "No title parameter was passed in the request."
  },
  {
    "code": "2",
    "message": "Photo not found",
    "_content": "The primary photo id passed was not a valid photo id or does not belong to the calling user."
  },
  {
    "code": "3",
    "message": "Can't create any more sets",
    "_content": "The user has reached their maximum number of photosets limit."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.create";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.delete = (function(Utils) {
  var required = [
  {
    "name": "photoset_id",
    "optional": "0",
    "_content": "The id of the photoset to delete. It must be owned by the calling user."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photoset not found",
    "_content": "The photoset id passed was not a valid photoset id or did not belong to the calling user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.delete";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.editMeta = (function(Utils) {
  var required = [
  {
    "name": "photoset_id",
    "optional": "0",
    "_content": "The id of the photoset to modify."
  },
  {
    "name": "title",
    "optional": "0",
    "_content": "The new title for the photoset."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photoset not found",
    "_content": "The photoset id passed was not a valid photoset id or did not belong to the calling user."
  },
  {
    "code": "2",
    "message": "No title specified",
    "_content": "No title parameter was passed in the request. "
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.editMeta";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.editPhotos = (function(Utils) {
  var required = [
  {
    "name": "photoset_id",
    "optional": "0",
    "_content": "The id of the photoset to modify. The photoset must belong to the calling user."
  },
  {
    "name": "primary_photo_id",
    "optional": "0",
    "_content": "The id of the photo to use as the 'primary' photo for the set. This id must also be passed along in photo_ids list argument."
  },
  {
    "name": "photo_ids",
    "optional": "0",
    "_content": "A comma-delimited list of photo ids to include in the set. They will appear in the set in the order sent. This list <b>must</b> contain the primary photo id. All photos must belong to the owner of the set. This list of photos replaces the existing list. Call flickr.photosets.addPhoto to append a photo to a set."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photoset not found",
    "_content": "The photoset id passed was not a valid photoset id or did not belong to the calling user."
  },
  {
    "code": "2",
    "message": "Photo not found",
    "_content": "One or more of the photo ids passed was not a valid photo id or does not belong to the calling user."
  },
  {
    "code": "3",
    "message": "Primary photo not found",
    "_content": "The primary photo id passed was not a valid photo id or does not belong to the calling user."
  },
  {
    "code": "4",
    "message": "Primary photo not in list",
    "_content": "The primary photo id passed did not appear in the photo id list."
  },
  {
    "code": "5",
    "message": "Empty photos list",
    "_content": "No photo ids were passed."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.editPhotos";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.getContext = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to fetch the context for."
  },
  {
    "name": "photoset_id",
    "optional": "0",
    "_content": "The id of the photoset for which to fetch the photo's context."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id, or was the id of a photo that the calling user does not have permission to view."
  },
  {
    "code": "2",
    "message": "Photo not in set",
    "_content": "The specified photo is not in the specified set."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.getContext";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.getInfo = (function(Utils) {
  var required = [
  {
    "name": "photoset_id",
    "optional": "0",
    "_content": "The ID of the photoset to fetch information for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photoset not found",
    "_content": "The photoset id was not valid."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.getInfo";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.getList = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "The user NSID passed was not a valid user NSID and the calling user was not logged in.\r\n"
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.getList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.getPhotos = (function(Utils) {
  var required = [
  {
    "name": "photoset_id",
    "optional": "0",
    "_content": "The id of the photoset to return the photos for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photoset not found",
    "_content": "The photoset id passed was not a valid photoset id."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.getPhotos";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.orderSets = (function(Utils) {
  var required = [
  {
    "name": "photoset_ids",
    "optional": "0",
    "_content": "A comma delimited list of photoset IDs, ordered with the set to show first, first in the list. Any set IDs not given in the list will be set to appear at the end of the list, ordered by their IDs."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Set not found",
    "_content": "One of the photoset ids passed was not the id of a valid photoset belonging to the calling user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.orderSets";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.removePhoto = (function(Utils) {
  var required = [
  {
    "name": "photoset_id",
    "optional": "0",
    "_content": "The id of the photoset to remove a photo from."
  },
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to remove from the set."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photoset not found",
    "_content": "The photoset id passed was not the id of avalid photoset owned by the calling user."
  },
  {
    "code": "2",
    "message": "Photo not found",
    "_content": "The photo id passed was not the id of a valid photo belonging to the calling user."
  },
  {
    "code": "3",
    "message": "Photo not in set",
    "_content": "The photo is not a member of the photoset."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.removePhoto";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.removePhotos = (function(Utils) {
  var required = [
  {
    "name": "photoset_id",
    "optional": "0",
    "_content": "The id of the photoset to remove photos from."
  },
  {
    "name": "photo_ids",
    "optional": "0",
    "_content": "Comma-delimited list of photo ids to remove from the photoset."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photoset not found",
    "_content": "The photoset id passed was not the id of available photosets owned by the calling user."
  },
  {
    "code": "2",
    "message": "Photo not found",
    "_content": "The photo id passed was not the id of a valid photo belonging to the calling user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.removePhotos";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.reorderPhotos = (function(Utils) {
  var required = [
  {
    "name": "photoset_id",
    "optional": "0",
    "_content": "The id of the photoset to reorder. The photoset must belong to the calling user."
  },
  {
    "name": "photo_ids",
    "optional": "0",
    "_content": "Ordered, comma-delimited list of photo ids. Photos that are not in the list will keep their original order"
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photoset not found",
    "_content": "The photoset id passed was not a valid photoset id or did not belong to the calling user."
  },
  {
    "code": "2",
    "message": "Photo not found",
    "_content": "One or more of the photo ids passed was not a valid photo id or does not belong to the calling user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.reorderPhotos";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.photosets.setPrimaryPhoto = (function(Utils) {
  var required = [
  {
    "name": "photoset_id",
    "optional": "0",
    "_content": "The id of the photoset to set primary photo to."
  },
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to set as primary."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photoset not found",
    "_content": "The photoset id passed was not the id of avalid photoset owned by the calling user."
  },
  {
    "code": "2",
    "message": "Photo not found",
    "_content": "The photo id passed was not the id of a valid photo owned by the calling user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.photosets.setPrimaryPhoto";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.places = {};
flickr.places.find = (function(Utils) {
  var required = [
  {
    "name": "query",
    "optional": "0",
    "_content": "The query string to use for place ID lookups"
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required parameter missing",
    "_content": "One or more required parameters was not included with the API call."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.places.find";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.places.findByLatLon = (function(Utils) {
  var required = [
  {
    "name": "lat",
    "optional": "0",
    "_content": "The latitude whose valid range is -90 to 90. Anything more than 4 decimal places will be truncated."
  },
  {
    "name": "lon",
    "optional": "0",
    "_content": "The longitude whose valid range is -180 to 180. Anything more than 4 decimal places will be truncated."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required arguments missing",
    "_content": "One or more required parameters was not included with the API request."
  },
  {
    "code": "2",
    "message": "Not a valid latitude",
    "_content": "The latitude argument failed validation."
  },
  {
    "code": "3",
    "message": "Not a valid longitude",
    "_content": "The longitude argument failed validation."
  },
  {
    "code": "4",
    "message": "Not a valid accuracy",
    "_content": "The accuracy argument failed validation."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.places.findByLatLon";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.places.getChildrenWithPhotosPublic = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "Required parameter missing",
    "_content": "One or more required parameter is missing from the API call."
  },
  {
    "code": "2",
    "message": "Not a valid Places ID",
    "_content": "An invalid Places (or WOE) ID was passed with the API call."
  },
  {
    "code": "3",
    "message": "Place not found",
    "_content": "No place could be found for the Places (or WOE) ID passed to the API call."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.places.getChildrenWithPhotosPublic";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.places.getInfo = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "Required parameter missing",
    "_content": "One or more required parameter is missing from the API call."
  },
  {
    "code": "2",
    "message": "Not a valid Places ID",
    "_content": "An invalid Places (or WOE) ID was passed with the API call."
  },
  {
    "code": "3",
    "message": "Place not found",
    "_content": "No place could be found for the Places (or WOE) ID passed to the API call."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.places.getInfo";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.places.getInfoByUrl = (function(Utils) {
  var required = [
  {
    "name": "url",
    "optional": "0",
    "_content": "A flickr.com/places URL in the form of /country/region/city. For example: /Canada/Quebec/Montreal"
  }
];
  var errors = [
  {
    "code": "2",
    "message": "Place URL required.",
    "_content": "The flickr.com/places URL was not passed with the API method."
  },
  {
    "code": "3",
    "message": "Place not found.",
    "_content": "Unable to find a valid place for the places URL."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.places.getInfoByUrl";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.places.getPlaceTypes = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.places.getPlaceTypes";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.places.getShapeHistory = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "Required parameter missing",
    "_content": "One or more required parameter is missing from the API call."
  },
  {
    "code": "2",
    "message": "Not a valid Places ID",
    "_content": "An invalid Places (or WOE) ID was passed with the API call."
  },
  {
    "code": "3",
    "message": "Place not found",
    "_content": "No place could be found for the Places (or WOE) ID passed to the API call."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.places.getShapeHistory";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.places.getTopPlacesList = (function(Utils) {
  var required = [
  {
    "name": "place_type_id",
    "optional": "0",
    "_content": "The numeric ID for a specific place type to cluster photos by. <br /><br />\r\n\r\nValid place type IDs are :\r\n\r\n<ul>\r\n<li><strong>22</strong>: neighbourhood</li>\r\n<li><strong>7</strong>: locality</li>\r\n<li><strong>8</strong>: region</li>\r\n<li><strong>12</strong>: country</li>\r\n<li><strong>29</strong>: continent</li>\r\n</ul>"
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required parameter missing",
    "_content": "One or more required parameters with missing from your request."
  },
  {
    "code": "2",
    "message": "Not a valid place type.",
    "_content": "An unknown or unsupported place type ID was passed with your request."
  },
  {
    "code": "3",
    "message": "Not a valid date.",
    "_content": "The date argument passed with your request is invalid."
  },
  {
    "code": "4",
    "message": "Not a valid Place ID",
    "_content": "An invalid Places (or WOE) identifier was included with your request."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.places.getTopPlacesList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.places.placesForBoundingBox = (function(Utils) {
  var required = [
  {
    "name": "bbox",
    "optional": "0",
    "_content": "A comma-delimited list of 4 values defining the Bounding Box of the area that will be searched. The 4 values represent the bottom-left corner of the box and the top-right corner, minimum_longitude, minimum_latitude, maximum_longitude, maximum_latitude."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required parameters missing",
    "_content": "One or more required parameter is missing from the API call."
  },
  {
    "code": "2",
    "message": "Not a valid bbox",
    "_content": "The bbox argument was incomplete or incorrectly formatted"
  },
  {
    "code": "3",
    "message": "Not a valid place type",
    "_content": "An invalid place type was included with your request."
  },
  {
    "code": "4",
    "message": "Bounding box exceeds maximum allowable size for place type",
    "_content": "The bounding box passed along with your request was too large for the request place type."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.places.placesForBoundingBox";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.places.placesForContacts = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "Places for contacts are not available at this time",
    "_content": "Places for contacts have been disabled or are otherwise not available."
  },
  {
    "code": "2",
    "message": "Required parameter missing",
    "_content": "One or more of the required parameters was not included with your request."
  },
  {
    "code": "3",
    "message": "Not a valid place type.",
    "_content": "An invalid place type was included with your request."
  },
  {
    "code": "4",
    "message": "Not a valid Place ID",
    "_content": "An invalid Places (or WOE) identifier was included with your request."
  },
  {
    "code": "5",
    "message": "Not a valid threshold",
    "_content": "The threshold passed was invalid. "
  },
  {
    "code": "6",
    "message": "Not a valid contacts type",
    "_content": "Contacts must be either \"all\" or \"ff\" (friends and family)."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.places.placesForContacts";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.places.placesForTags = (function(Utils) {
  var required = [
  {
    "name": "place_type_id",
    "optional": "0",
    "_content": "The numeric ID for a specific place type to cluster photos by. <br /><br />\r\n\r\nValid place type IDs are :\r\n\r\n<ul>\r\n<li><strong>22</strong>: neighbourhood</li>\r\n<li><strong>7</strong>: locality</li>\r\n<li><strong>8</strong>: region</li>\r\n<li><strong>12</strong>: country</li>\r\n<li><strong>29</strong>: continent</li>\r\n</ul>"
  }
];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.places.placesForTags";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.places.placesForUser = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "Places for user are not available at this time",
    "_content": "Places for user have been disabled or are otherwise not available."
  },
  {
    "code": "2",
    "message": "Required parameter missing",
    "_content": "One or more of the required parameters was not included with your request."
  },
  {
    "code": "3",
    "message": "Not a valid place type",
    "_content": "An invalid place type was included with your request."
  },
  {
    "code": "4",
    "message": "Not a valid Place ID",
    "_content": "An invalid Places (or WOE) identifier was included with your request."
  },
  {
    "code": "5",
    "message": "Not a valid threshold",
    "_content": "The threshold passed was invalid. "
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.places.placesForUser";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.places.resolvePlaceId = (function(Utils) {
  var required = [
  {
    "name": "place_id",
    "optional": "0",
    "_content": "A Flickr Places ID"
  }
];
  var errors = [
  {
    "code": "2",
    "message": "Place ID required.",
    "_content": ""
  },
  {
    "code": "3",
    "message": "Place not found.",
    "_content": ""
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.places.resolvePlaceId";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.places.resolvePlaceURL = (function(Utils) {
  var required = [
  {
    "name": "url",
    "optional": "0",
    "_content": "A Flickr Places URL.  \r\n<br /><br />\r\nFlickr Place URLs are of the form /country/region/city"
  }
];
  var errors = [
  {
    "code": "2",
    "message": "Place URL required.",
    "_content": ""
  },
  {
    "code": "3",
    "message": "Place not found.",
    "_content": ""
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.places.resolvePlaceURL";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.places.tagsForPlace = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "Required parameter missing",
    "_content": "One or more parameters was not included with the API request"
  },
  {
    "code": "2",
    "message": "Not a valid Places ID",
    "_content": "An invalid Places (or WOE) identifier was included with your request."
  },
  {
    "code": "3",
    "message": "Place not found",
    "_content": "An invalid Places (or WOE) identifier was included with your request."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.places.tagsForPlace";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.prefs = {};
flickr.prefs.getContentType = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.prefs.getContentType";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.prefs.getGeoPerms = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.prefs.getGeoPerms";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.prefs.getHidden = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.prefs.getHidden";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.prefs.getPrivacy = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.prefs.getPrivacy";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.prefs.getSafetyLevel = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.prefs.getSafetyLevel";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.push = {};
flickr.push.getSubscriptions = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "5",
    "message": "Service currently available only to pro accounts",
    "_content": "PuSH subscriptions are currently restricted to Pro account holders."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.push.getSubscriptions";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.push.getTopics = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.push.getTopics";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.push.subscribe = (function(Utils) {
  var required = [
  {
    "name": "topic",
    "optional": "0",
    "_content": "The type of subscription. See <a href=\"http://www.flickr.com/services/api/flickr.push.getTopics.htm\">flickr.push.getTopics</a>."
  },
  {
    "name": "callback",
    "optional": "0",
    "_content": "The url for the subscription endpoint. Limited to 255 bytes, and must be unique for this user, i.e. no two subscriptions for a given user may use the same callback url."
  },
  {
    "name": "verify",
    "optional": "0",
    "_content": "The verification mode, either <code>sync</code> or <code>async</code>. See the <a href=\"http://pubsubhubbub.googlecode.com/svn/trunk/pubsubhubbub-core-0.3.html#subscribingl\">Google PubSubHubbub spec</a> for details."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required parameter missing",
    "_content": "One of the required arguments for the method was not provided."
  },
  {
    "code": "2",
    "message": "Invalid parameter value",
    "_content": "One of the arguments was specified with an illegal value."
  },
  {
    "code": "3",
    "message": "Callback URL already in use for a different subscription",
    "_content": "A different subscription already exists that uses the same callback URL."
  },
  {
    "code": "4",
    "message": "Callback failed or invalid response",
    "_content": "The verification callback failed, or failed to return the expected response to confirm the subscription."
  },
  {
    "code": "5",
    "message": "Service currently available only to pro accounts",
    "_content": "PuSH subscriptions are currently restricted to Pro account holders."
  },
  {
    "code": "6",
    "message": "Subscription awaiting verification callback response - try again later",
    "_content": "A subscription with those details exists already, but it is in a pending (non-verified) state. Please wait a bit for the verification callback to complete before attempting to update the subscription."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.push.subscribe";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.push.unsubscribe = (function(Utils) {
  var required = [
  {
    "name": "topic",
    "optional": "0",
    "_content": "The type of subscription. See <a href=\"http://www.flickr.com/services/api/flickr.push.getTopics.htm\">flickr.push.getTopics</a>."
  },
  {
    "name": "callback",
    "optional": "0",
    "_content": "The url for the subscription endpoint (must be the same url as was used when creating the subscription)."
  },
  {
    "name": "verify",
    "optional": "0",
    "_content": "The verification mode, either 'sync' or 'async'. See the <a href=\"http://pubsubhubbub.googlecode.com/svn/trunk/pubsubhubbub-core-0.3.html#subscribingl\">Google PubSubHubbub spec</a> for details."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Required parameter missing",
    "_content": "One of the required arguments for the method was not provided."
  },
  {
    "code": "2",
    "message": "Invalid parameter value",
    "_content": "One of the arguments was specified with an illegal value."
  },
  {
    "code": "4",
    "message": "Callback failed or invalid response",
    "_content": "The verification callback failed, or failed to return the expected response to confirm the un-subscription."
  },
  {
    "code": "6",
    "message": "Subscription awaiting verification callback response - try again later",
    "_content": "A subscription with those details exists already, but it is in a pending (non-verified) state. Please wait a bit for the verification callback to complete before attempting to update the subscription."
  },
  {
    "code": "7",
    "message": "Subscription not found",
    "_content": "No subscription matching the provided details for this user could be found."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.push.unsubscribe";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.reflection = {};
flickr.reflection.getMethodInfo = (function(Utils) {
  var required = [
  {
    "name": "method_name",
    "optional": "0",
    "_content": "The name of the method to fetch information for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Method not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.reflection.getMethodInfo";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.reflection.getMethods = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.reflection.getMethods";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.stats = {};
flickr.stats.getCollectionDomains = (function(Utils) {
  var required = [
  {
    "name": "date",
    "optional": "0",
    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User does not have stats",
    "_content": "The user you have requested stats has not enabled stats on their account."
  },
  {
    "code": "2",
    "message": "No stats for that date",
    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
  },
  {
    "code": "3",
    "message": "Invalid date",
    "_content": "The date provided could not be parsed"
  },
  {
    "code": "4",
    "message": "Collection not found",
    "_content": "The collection id was either invalid or was for a collection not owned by the calling user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.stats.getCollectionDomains";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.stats.getCollectionReferrers = (function(Utils) {
  var required = [
  {
    "name": "date",
    "optional": "0",
    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format. \r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
  },
  {
    "name": "domain",
    "optional": "0",
    "_content": "The domain to return referrers for. This should be a hostname (eg: \"flickr.com\") with no protocol or pathname."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User does not have stats",
    "_content": "The user you have requested stats has not enabled stats on their account."
  },
  {
    "code": "2",
    "message": "No stats for that date",
    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
  },
  {
    "code": "3",
    "message": "Invalid date",
    "_content": "The date provided could not be parsed"
  },
  {
    "code": "4",
    "message": "Collection not found",
    "_content": "The collection id was either invalid or was for a collection not owned by the calling user."
  },
  {
    "code": "5",
    "message": "Invalid domain",
    "_content": "The domain provided is not in the expected format."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.stats.getCollectionReferrers";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.stats.getCollectionStats = (function(Utils) {
  var required = [
  {
    "name": "date",
    "optional": "0",
    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
  },
  {
    "name": "collection_id",
    "optional": "0",
    "_content": "The id of the collection to get stats for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User does not have stats",
    "_content": "The user you have requested stats has not enabled stats on their account."
  },
  {
    "code": "2",
    "message": "No stats for that date",
    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
  },
  {
    "code": "3",
    "message": "Invalid date",
    "_content": "The date provided could not be parsed"
  },
  {
    "code": "4",
    "message": "Collection not found",
    "_content": "The collection id was either invalid or was for a collection not owned by the calling user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.stats.getCollectionStats";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.stats.getCSVFiles = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.stats.getCSVFiles";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.stats.getPhotoDomains = (function(Utils) {
  var required = [
  {
    "name": "date",
    "optional": "0",
    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User does not have stats",
    "_content": "The user you have requested stats has not enabled stats on their account."
  },
  {
    "code": "2",
    "message": "No stats for that date",
    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
  },
  {
    "code": "3",
    "message": "Invalid date",
    "_content": "The date provided could not be parsed"
  },
  {
    "code": "4",
    "message": "Photo not found",
    "_content": "The photo id was either invalid or was for a photo not owned by the calling user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.stats.getPhotoDomains";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.stats.getPhotoReferrers = (function(Utils) {
  var required = [
  {
    "name": "date",
    "optional": "0",
    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
  },
  {
    "name": "domain",
    "optional": "0",
    "_content": "The domain to return referrers for. This should be a hostname (eg: \"flickr.com\") with no protocol or pathname."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User does not have stats",
    "_content": "The user you have requested stats has not enabled stats on their account."
  },
  {
    "code": "2",
    "message": "No stats for that date",
    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
  },
  {
    "code": "3",
    "message": "Invalid date",
    "_content": "The date provided could not be parsed"
  },
  {
    "code": "4",
    "message": "Photo not found",
    "_content": "The photo id was either invalid or was for a photo not owned by the calling user."
  },
  {
    "code": "5",
    "message": "Invalid domain",
    "_content": "The domain provided is not in the expected format."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.stats.getPhotoReferrers";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.stats.getPhotosetDomains = (function(Utils) {
  var required = [
  {
    "name": "date",
    "optional": "0",
    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User does not have stats",
    "_content": "The user you have requested stats has not enabled stats on their account."
  },
  {
    "code": "2",
    "message": "No stats for that date",
    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
  },
  {
    "code": "3",
    "message": "Invalid date",
    "_content": "The date provided could not be parsed"
  },
  {
    "code": "4",
    "message": "Photoset not found",
    "_content": "The photoset id was either invalid or was for a set not owned by the calling user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.stats.getPhotosetDomains";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.stats.getPhotosetReferrers = (function(Utils) {
  var required = [
  {
    "name": "date",
    "optional": "0",
    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format. \r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
  },
  {
    "name": "domain",
    "optional": "0",
    "_content": "The domain to return referrers for. This should be a hostname (eg: \"flickr.com\") with no protocol or pathname."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User does not have stats",
    "_content": "The user you have requested stats has not enabled stats on their account."
  },
  {
    "code": "2",
    "message": "No stats for that date",
    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
  },
  {
    "code": "3",
    "message": "Invalid date",
    "_content": "The date provided could not be parsed"
  },
  {
    "code": "4",
    "message": "Photoset not found",
    "_content": "The photoset id was either invalid or was for a set not owned by the calling user."
  },
  {
    "code": "5",
    "message": "Invalid domain",
    "_content": "The domain provided is not in the expected format."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.stats.getPhotosetReferrers";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.stats.getPhotosetStats = (function(Utils) {
  var required = [
  {
    "name": "date",
    "optional": "0",
    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
  },
  {
    "name": "photoset_id",
    "optional": "0",
    "_content": "The id of the photoset to get stats for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User does not have stats",
    "_content": "The user you have requested stats has not enabled stats on their account."
  },
  {
    "code": "2",
    "message": "No stats for that date",
    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
  },
  {
    "code": "3",
    "message": "Invalid date",
    "_content": "The date provided could not be parsed"
  },
  {
    "code": "4",
    "message": "Photoset not found",
    "_content": "The photoset id was either invalid or was for a set not owned by the calling user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.stats.getPhotosetStats";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.stats.getPhotoStats = (function(Utils) {
  var required = [
  {
    "name": "date",
    "optional": "0",
    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
  },
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to get stats for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User does not have stats",
    "_content": "The user you have requested stats has not enabled stats on their account."
  },
  {
    "code": "2",
    "message": "No stats for that date",
    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
  },
  {
    "code": "3",
    "message": "Invalid date",
    "_content": "The date provided could not be parsed"
  },
  {
    "code": "4",
    "message": "Photo not found",
    "_content": "The photo id was either invalid or was for a photo not owned by the calling user."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.stats.getPhotoStats";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.stats.getPhotostreamDomains = (function(Utils) {
  var required = [
  {
    "name": "date",
    "optional": "0",
    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User does not have stats",
    "_content": "The user you have requested stats has not enabled stats on their account."
  },
  {
    "code": "2",
    "message": "No stats for that date",
    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
  },
  {
    "code": "3",
    "message": "Invalid date",
    "_content": "The date provided could not be parsed"
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.stats.getPhotostreamDomains";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.stats.getPhotostreamReferrers = (function(Utils) {
  var required = [
  {
    "name": "date",
    "optional": "0",
    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format. \r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
  },
  {
    "name": "domain",
    "optional": "0",
    "_content": "The domain to return referrers for. This should be a hostname (eg: \"flickr.com\") with no protocol or pathname."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User does not have stats",
    "_content": "The user you have requested stats has not enabled stats on their account."
  },
  {
    "code": "2",
    "message": "No stats for that date",
    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
  },
  {
    "code": "3",
    "message": "Invalid date",
    "_content": "The date provided could not be parsed"
  },
  {
    "code": "5",
    "message": "Invalid domain",
    "_content": "The domain provided is not in the expected format."
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.stats.getPhotostreamReferrers";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.stats.getPhotostreamStats = (function(Utils) {
  var required = [
  {
    "name": "date",
    "optional": "0",
    "_content": "Stats will be returned for this date. This should be in either be in YYYY-MM-DD or unix timestamp format.\r\n\r\nA day according to Flickr Stats starts at midnight GMT for all users, and timestamps will automatically be rounded down to the start of the day."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User does not have stats",
    "_content": "The user you have requested stats has not enabled stats on their account."
  },
  {
    "code": "2",
    "message": "No stats for that date",
    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
  },
  {
    "code": "3",
    "message": "Invalid date",
    "_content": "The date provided could not be parsed"
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.stats.getPhotostreamStats";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.stats.getPopularPhotos = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "User does not have stats",
    "_content": "The user you have requested stats has not enabled stats on their account."
  },
  {
    "code": "2",
    "message": "No stats for that date",
    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
  },
  {
    "code": "3",
    "message": "Invalid date",
    "_content": "The date provided could not be parsed"
  },
  {
    "code": "5",
    "message": "Invalid sort",
    "_content": "The sort provided is not valid"
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.stats.getPopularPhotos";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.stats.getTotalViews = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "User does not have stats",
    "_content": "The user you have requested stats has not enabled stats on their account."
  },
  {
    "code": "2",
    "message": "No stats for that date",
    "_content": "No stats are available for the date requested. Flickr only keeps stats data for the last 28 days."
  },
  {
    "code": "3",
    "message": "Invalid date",
    "_content": "The date provided could not be parsed"
  },
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.stats.getTotalViews";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.tags = {};
flickr.tags.getClusterPhotos = (function(Utils) {
  var required = [
  {
    "name": "tag",
    "optional": "0",
    "_content": "The tag that this cluster belongs to."
  },
  {
    "name": "cluster_id",
    "optional": "0",
    "_content": "The top three tags for the cluster, separated by dashes (just like the url)."
  }
];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.tags.getClusterPhotos";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.tags.getClusters = (function(Utils) {
  var required = [
  {
    "name": "tag",
    "optional": "0",
    "_content": "The tag to fetch clusters for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Tag cluster not found",
    "_content": "The tag was invalid or no cluster exists for that tag."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.tags.getClusters";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.tags.getHotList = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "Invalid period",
    "_content": "The specified period was not understood."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.tags.getHotList";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.tags.getListPhoto = (function(Utils) {
  var required = [
  {
    "name": "photo_id",
    "optional": "0",
    "_content": "The id of the photo to return tags for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Photo not found",
    "_content": "The photo id passed was not a valid photo id."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.tags.getListPhoto";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.tags.getListUser = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "The user NSID passed was not a valid user NSID and the calling user was not logged in.\r\n"
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.tags.getListUser";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.tags.getListUserPopular = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "The user NSID passed was not a valid user NSID and the calling user was not logged in.\r\n"
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.tags.getListUserPopular";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.tags.getListUserRaw = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "The calling user was not logged in."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.tags.getListUserRaw";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.tags.getMostFrequentlyUsed = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.tags.getMostFrequentlyUsed";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.tags.getRelated = (function(Utils) {
  var required = [
  {
    "name": "tag",
    "optional": "0",
    "_content": "The tag to fetch related tags for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Tag not found",
    "_content": "The tag argument was missing."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.tags.getRelated";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.test = {};
flickr.test.echo = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.test.echo";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.test.login = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.test.login";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.test.null = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": 96,
    "message": "Invalid signature",
    "_content": "The passed signature was invalid."
  },
  {
    "code": 97,
    "message": "Missing signature",
    "_content": "The call required signing but no signature was sent."
  },
  {
    "code": 98,
    "message": "Login failed / Invalid auth token",
    "_content": "The login details or auth token passed were invalid."
  },
  {
    "code": 99,
    "message": "User not logged in / Insufficient permissions",
    "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.test.null";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.urls = {};
flickr.urls.getGroup = (function(Utils) {
  var required = [
  {
    "name": "group_id",
    "optional": "0",
    "_content": "The NSID of the group to fetch the url for."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Group not found",
    "_content": "The NSID specified was not a valid group."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.urls.getGroup";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.urls.getUserPhotos = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "The NSID specified was not a valid user."
  },
  {
    "code": "2",
    "message": "No user specified",
    "_content": "No user_id was passed and the calling user was not logged in."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.urls.getUserPhotos";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.urls.getUserProfile = (function(Utils) {
  var required = [];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "The NSID specified was not a valid user."
  },
  {
    "code": "2",
    "message": "No user specified",
    "_content": "No user_id was passed and the calling user was not logged in."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.urls.getUserProfile";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.urls.lookupGallery = (function(Utils) {
  var required = [
  {
    "name": "url",
    "optional": "0",
    "_content": "The gallery's URL."
  }
];
  var errors = [
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.urls.lookupGallery";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.urls.lookupGroup = (function(Utils) {
  var required = [
  {
    "name": "url",
    "optional": "0",
    "_content": "The url to the group's page or photo pool."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "Group not found",
    "_content": "The passed URL was not a valid group page or photo pool url."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.urls.lookupGroup";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

flickr.urls.lookupUser = (function(Utils) {
  var required = [
  {
    "name": "url",
    "optional": "0",
    "_content": "The url to the user's profile or photos page."
  }
];
  var errors = [
  {
    "code": "1",
    "message": "User not found",
    "_content": "The passed URL was not a valid user profile or photos url."
  },
  {
    "code": 100,
    "message": "Invalid API Key",
    "_content": "The API key passed was not valid or has expired."
  },
  {
    "code": 105,
    "message": "Service currently unavailable",
    "_content": "The requested service is temporarily unavailable."
  },
  {
    "code": 111,
    "message": "Format \"xxx\" not found",
    "_content": "The requested response format was not found."
  },
  {
    "code": 112,
    "message": "Method \"xxx\" not found",
    "_content": "The requested method was not found."
  },
  {
    "code": 114,
    "message": "Invalid SOAP envelope",
    "_content": "The SOAP envelope send in the request could not be parsed."
  },
  {
    "code": 115,
    "message": "Invalid XML-RPC Method Call",
    "_content": "The XML-RPC request document could not be parsed."
  },
  {
    "code": 116,
    "message": "Bad URL found",
    "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
  }
];
  var method_name = "flickr.urls.lookupUser";
  return function (callOptions, callback) {
        // no options -> rebind callback
        if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
        Utils.checkRequirements(method_name, required, callOptions, callback);
        var queryArguments = Utils.generateQueryArguments(method_name, flickrOptions, callOptions);
        Utils.queryFlickr(queryArguments, flickrOptions, callback, errors);
      }
}(Utils));

  return flickr;
};
window.Flickr = Flickr;
}());
