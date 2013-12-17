(function() {
 var methodNames = [];
 var Utils = {};
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
Utils.queryFlickr = function (queryArguments, flickrOptions, processResult) {
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
 Utils.errors = {
    "96": {
        "code": 96,
        "message": "Invalid signature",
        "_content": "The passed signature was invalid."
    },
    "97": {
        "code": 97,
        "message": "Missing signature",
        "_content": "The call required signing but no signature was sent."
    },
    "98": {
        "code": 98,
        "message": "Login failed / Invalid auth token",
        "_content": "The login details or auth token passed were invalid."
    },
    "99": {
        "code": 99,
        "message": "User not logged in / Insufficient permissions",
        "_content": "The method requires user authentication but the user was not logged in, or the authenticated method call did not have the required permissions."
    },
    "100": {
        "code": 100,
        "message": "Invalid API Key",
        "_content": "The API key passed was not valid or has expired."
    },
    "105": {
        "code": 105,
        "message": "Service currently unavailable",
        "_content": "The requested service is temporarily unavailable."
    },
    "108": {
        "code": "108",
        "message": "Invalid frob",
        "_content": "The specified frob does not exist or has already been used."
    },
    "111": {
        "code": 111,
        "message": "Format \"xxx\" not found",
        "_content": "The requested response format was not found."
    },
    "112": {
        "code": 112,
        "message": "Method \"xxx\" not found",
        "_content": "The requested method was not found."
    },
    "114": {
        "code": 114,
        "message": "Invalid SOAP envelope",
        "_content": "The SOAP envelope send in the request could not be parsed."
    },
    "115": {
        "code": 115,
        "message": "Invalid XML-RPC Method Call",
        "_content": "The XML-RPC request document could not be parsed."
    },
    "116": {
        "code": 116,
        "message": "Bad URL found",
        "_content": "One or more arguments contained a URL that has been used for abuse on Flickr."
    }
};
 var Flickr = function (flickrOptions) { this.bindOptions(flickrOptions); };
 Flickr.prototype = {
    "activity": {},
    "auth": {
        "oauth": {}
    },
    "blogs": {},
    "cameras": {},
    "collections": {},
    "commons": {},
    "contacts": {},
    "favorites": {},
    "galleries": {},
    "groups": {
        "discuss": {
            "replies": {},
            "topics": {}
        },
        "members": {},
        "pools": {}
    },
    "interestingness": {},
    "machinetags": {},
    "panda": {},
    "people": {},
    "photos": {
        "comments": {},
        "geo": {},
        "licenses": {},
        "notes": {},
        "people": {},
        "suggestions": {},
        "transform": {},
        "upload": {}
    },
    "photosets": {
        "comments": {}
    },
    "places": {},
    "prefs": {},
    "push": {},
    "reflection": {},
    "stats": {},
    "tags": {},
    "test": {},
    "urls": {}
}
 Flickr.prototype.bindOptions = function (flickrOptions) {
      this.flickrOptions = flickrOptions;
      (function bindOptions(obj, props) {
        Object.keys(props).forEach(function(key) {
          if (typeof obj[key] === "object") {
            bindOptions(obj[key], props[key]);
            obj[key].flickrOptions = flickrOptions;
          }
        });
      }(this, Flickr.prototype));
    };
Flickr.prototype.activity.userComments = (function(Utils) {
  var method_name = "flickr.activity.userComments";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.activity.userPhotos = (function(Utils) {
  var method_name = "flickr.activity.userPhotos";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.auth.checkToken = (function(Utils) {
  var method_name = "flickr.auth.checkToken";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.auth.getFrob = (function(Utils) {
  var method_name = "flickr.auth.getFrob";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.auth.getFullToken = (function(Utils) {
  var method_name = "flickr.auth.getFullToken";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.auth.getToken = (function(Utils) {
  var method_name = "flickr.auth.getToken";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.auth.oauth.checkToken = (function(Utils) {
  var method_name = "flickr.auth.oauth.checkToken";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.auth.oauth.getAccessToken = (function(Utils) {
  var method_name = "flickr.auth.oauth.getAccessToken";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.blogs.getList = (function(Utils) {
  var method_name = "flickr.blogs.getList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.blogs.getServices = (function(Utils) {
  var method_name = "flickr.blogs.getServices";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.blogs.postPhoto = (function(Utils) {
  var method_name = "flickr.blogs.postPhoto";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.cameras.getBrandModels = (function(Utils) {
  var method_name = "flickr.cameras.getBrandModels";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.cameras.getBrands = (function(Utils) {
  var method_name = "flickr.cameras.getBrands";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.collections.getInfo = (function(Utils) {
  var method_name = "flickr.collections.getInfo";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.collections.getTree = (function(Utils) {
  var method_name = "flickr.collections.getTree";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.commons.getInstitutions = (function(Utils) {
  var method_name = "flickr.commons.getInstitutions";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.contacts.getList = (function(Utils) {
  var method_name = "flickr.contacts.getList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.contacts.getListRecentlyUploaded = (function(Utils) {
  var method_name = "flickr.contacts.getListRecentlyUploaded";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.contacts.getPublicList = (function(Utils) {
  var method_name = "flickr.contacts.getPublicList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.contacts.getTaggingSuggestions = (function(Utils) {
  var method_name = "flickr.contacts.getTaggingSuggestions";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.favorites.add = (function(Utils) {
  var method_name = "flickr.favorites.add";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.favorites.getContext = (function(Utils) {
  var method_name = "flickr.favorites.getContext";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.favorites.getList = (function(Utils) {
  var method_name = "flickr.favorites.getList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.favorites.getPublicList = (function(Utils) {
  var method_name = "flickr.favorites.getPublicList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.favorites.remove = (function(Utils) {
  var method_name = "flickr.favorites.remove";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.galleries.addPhoto = (function(Utils) {
  var method_name = "flickr.galleries.addPhoto";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.galleries.create = (function(Utils) {
  var method_name = "flickr.galleries.create";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.galleries.editMeta = (function(Utils) {
  var method_name = "flickr.galleries.editMeta";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.galleries.editPhoto = (function(Utils) {
  var method_name = "flickr.galleries.editPhoto";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.galleries.editPhotos = (function(Utils) {
  var method_name = "flickr.galleries.editPhotos";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.galleries.getInfo = (function(Utils) {
  var method_name = "flickr.galleries.getInfo";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.galleries.getList = (function(Utils) {
  var method_name = "flickr.galleries.getList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.galleries.getListForPhoto = (function(Utils) {
  var method_name = "flickr.galleries.getListForPhoto";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.galleries.getPhotos = (function(Utils) {
  var method_name = "flickr.galleries.getPhotos";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.browse = (function(Utils) {
  var method_name = "flickr.groups.browse";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.discuss.replies.add = (function(Utils) {
  var method_name = "flickr.groups.discuss.replies.add";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.discuss.replies.delete = (function(Utils) {
  var method_name = "flickr.groups.discuss.replies.delete";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.discuss.replies.edit = (function(Utils) {
  var method_name = "flickr.groups.discuss.replies.edit";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.discuss.replies.getInfo = (function(Utils) {
  var method_name = "flickr.groups.discuss.replies.getInfo";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.discuss.replies.getList = (function(Utils) {
  var method_name = "flickr.groups.discuss.replies.getList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.discuss.topics.add = (function(Utils) {
  var method_name = "flickr.groups.discuss.topics.add";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.discuss.topics.getInfo = (function(Utils) {
  var method_name = "flickr.groups.discuss.topics.getInfo";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.discuss.topics.getList = (function(Utils) {
  var method_name = "flickr.groups.discuss.topics.getList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.getInfo = (function(Utils) {
  var method_name = "flickr.groups.getInfo";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.join = (function(Utils) {
  var method_name = "flickr.groups.join";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.joinRequest = (function(Utils) {
  var method_name = "flickr.groups.joinRequest";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.leave = (function(Utils) {
  var method_name = "flickr.groups.leave";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.members.getList = (function(Utils) {
  var method_name = "flickr.groups.members.getList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.pools.add = (function(Utils) {
  var method_name = "flickr.groups.pools.add";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.pools.getContext = (function(Utils) {
  var method_name = "flickr.groups.pools.getContext";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.pools.getGroups = (function(Utils) {
  var method_name = "flickr.groups.pools.getGroups";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.pools.getPhotos = (function(Utils) {
  var method_name = "flickr.groups.pools.getPhotos";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.pools.remove = (function(Utils) {
  var method_name = "flickr.groups.pools.remove";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.groups.search = (function(Utils) {
  var method_name = "flickr.groups.search";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.interestingness.getList = (function(Utils) {
  var method_name = "flickr.interestingness.getList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.machinetags.getNamespaces = (function(Utils) {
  var method_name = "flickr.machinetags.getNamespaces";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.machinetags.getPairs = (function(Utils) {
  var method_name = "flickr.machinetags.getPairs";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.machinetags.getPredicates = (function(Utils) {
  var method_name = "flickr.machinetags.getPredicates";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.machinetags.getRecentValues = (function(Utils) {
  var method_name = "flickr.machinetags.getRecentValues";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.machinetags.getValues = (function(Utils) {
  var method_name = "flickr.machinetags.getValues";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.panda.getList = (function(Utils) {
  var method_name = "flickr.panda.getList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.panda.getPhotos = (function(Utils) {
  var method_name = "flickr.panda.getPhotos";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.people.findByEmail = (function(Utils) {
  var method_name = "flickr.people.findByEmail";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.people.findByUsername = (function(Utils) {
  var method_name = "flickr.people.findByUsername";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.people.getGroups = (function(Utils) {
  var method_name = "flickr.people.getGroups";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.people.getInfo = (function(Utils) {
  var method_name = "flickr.people.getInfo";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.people.getLimits = (function(Utils) {
  var method_name = "flickr.people.getLimits";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.people.getPhotos = (function(Utils) {
  var method_name = "flickr.people.getPhotos";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.people.getPhotosOf = (function(Utils) {
  var method_name = "flickr.people.getPhotosOf";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.people.getPublicGroups = (function(Utils) {
  var method_name = "flickr.people.getPublicGroups";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.people.getPublicPhotos = (function(Utils) {
  var method_name = "flickr.people.getPublicPhotos";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.people.getUploadStatus = (function(Utils) {
  var method_name = "flickr.people.getUploadStatus";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.addTags = (function(Utils) {
  var method_name = "flickr.photos.addTags";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.comments.addComment = (function(Utils) {
  var method_name = "flickr.photos.comments.addComment";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.comments.deleteComment = (function(Utils) {
  var method_name = "flickr.photos.comments.deleteComment";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.comments.editComment = (function(Utils) {
  var method_name = "flickr.photos.comments.editComment";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.comments.getList = (function(Utils) {
  var method_name = "flickr.photos.comments.getList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.comments.getRecentForContacts = (function(Utils) {
  var method_name = "flickr.photos.comments.getRecentForContacts";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.delete = (function(Utils) {
  var method_name = "flickr.photos.delete";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.geo.batchCorrectLocation = (function(Utils) {
  var method_name = "flickr.photos.geo.batchCorrectLocation";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.geo.correctLocation = (function(Utils) {
  var method_name = "flickr.photos.geo.correctLocation";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.geo.getLocation = (function(Utils) {
  var method_name = "flickr.photos.geo.getLocation";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.geo.getPerms = (function(Utils) {
  var method_name = "flickr.photos.geo.getPerms";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.geo.photosForLocation = (function(Utils) {
  var method_name = "flickr.photos.geo.photosForLocation";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.geo.removeLocation = (function(Utils) {
  var method_name = "flickr.photos.geo.removeLocation";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.geo.setContext = (function(Utils) {
  var method_name = "flickr.photos.geo.setContext";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.geo.setLocation = (function(Utils) {
  var method_name = "flickr.photos.geo.setLocation";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.geo.setPerms = (function(Utils) {
  var method_name = "flickr.photos.geo.setPerms";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.getAllContexts = (function(Utils) {
  var method_name = "flickr.photos.getAllContexts";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.getContactsPhotos = (function(Utils) {
  var method_name = "flickr.photos.getContactsPhotos";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.getContactsPublicPhotos = (function(Utils) {
  var method_name = "flickr.photos.getContactsPublicPhotos";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.getContext = (function(Utils) {
  var method_name = "flickr.photos.getContext";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.getCounts = (function(Utils) {
  var method_name = "flickr.photos.getCounts";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.getExif = (function(Utils) {
  var method_name = "flickr.photos.getExif";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.getFavorites = (function(Utils) {
  var method_name = "flickr.photos.getFavorites";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.getInfo = (function(Utils) {
  var method_name = "flickr.photos.getInfo";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.getNotInSet = (function(Utils) {
  var method_name = "flickr.photos.getNotInSet";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.getPerms = (function(Utils) {
  var method_name = "flickr.photos.getPerms";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.getRecent = (function(Utils) {
  var method_name = "flickr.photos.getRecent";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.getSizes = (function(Utils) {
  var method_name = "flickr.photos.getSizes";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.getUntagged = (function(Utils) {
  var method_name = "flickr.photos.getUntagged";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.getWithGeoData = (function(Utils) {
  var method_name = "flickr.photos.getWithGeoData";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.getWithoutGeoData = (function(Utils) {
  var method_name = "flickr.photos.getWithoutGeoData";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.licenses.getInfo = (function(Utils) {
  var method_name = "flickr.photos.licenses.getInfo";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.licenses.setLicense = (function(Utils) {
  var method_name = "flickr.photos.licenses.setLicense";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.notes.add = (function(Utils) {
  var method_name = "flickr.photos.notes.add";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.notes.delete = (function(Utils) {
  var method_name = "flickr.photos.notes.delete";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.notes.edit = (function(Utils) {
  var method_name = "flickr.photos.notes.edit";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.people.add = (function(Utils) {
  var method_name = "flickr.photos.people.add";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.people.delete = (function(Utils) {
  var method_name = "flickr.photos.people.delete";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.people.deleteCoords = (function(Utils) {
  var method_name = "flickr.photos.people.deleteCoords";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.people.editCoords = (function(Utils) {
  var method_name = "flickr.photos.people.editCoords";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.people.getList = (function(Utils) {
  var method_name = "flickr.photos.people.getList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.recentlyUpdated = (function(Utils) {
  var method_name = "flickr.photos.recentlyUpdated";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.removeTag = (function(Utils) {
  var method_name = "flickr.photos.removeTag";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.search = (function(Utils) {
  var method_name = "flickr.photos.search";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.setContentType = (function(Utils) {
  var method_name = "flickr.photos.setContentType";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.setDates = (function(Utils) {
  var method_name = "flickr.photos.setDates";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.setMeta = (function(Utils) {
  var method_name = "flickr.photos.setMeta";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.setPerms = (function(Utils) {
  var method_name = "flickr.photos.setPerms";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.setSafetyLevel = (function(Utils) {
  var method_name = "flickr.photos.setSafetyLevel";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.setTags = (function(Utils) {
  var method_name = "flickr.photos.setTags";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.suggestions.approveSuggestion = (function(Utils) {
  var method_name = "flickr.photos.suggestions.approveSuggestion";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.suggestions.getList = (function(Utils) {
  var method_name = "flickr.photos.suggestions.getList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.suggestions.rejectSuggestion = (function(Utils) {
  var method_name = "flickr.photos.suggestions.rejectSuggestion";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.suggestions.removeSuggestion = (function(Utils) {
  var method_name = "flickr.photos.suggestions.removeSuggestion";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.suggestions.suggestLocation = (function(Utils) {
  var method_name = "flickr.photos.suggestions.suggestLocation";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.transform.rotate = (function(Utils) {
  var method_name = "flickr.photos.transform.rotate";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photos.upload.checkTickets = (function(Utils) {
  var method_name = "flickr.photos.upload.checkTickets";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.addPhoto = (function(Utils) {
  var method_name = "flickr.photosets.addPhoto";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.comments.addComment = (function(Utils) {
  var method_name = "flickr.photosets.comments.addComment";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.comments.deleteComment = (function(Utils) {
  var method_name = "flickr.photosets.comments.deleteComment";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.comments.editComment = (function(Utils) {
  var method_name = "flickr.photosets.comments.editComment";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.comments.getList = (function(Utils) {
  var method_name = "flickr.photosets.comments.getList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.create = (function(Utils) {
  var method_name = "flickr.photosets.create";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.delete = (function(Utils) {
  var method_name = "flickr.photosets.delete";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.editMeta = (function(Utils) {
  var method_name = "flickr.photosets.editMeta";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.editPhotos = (function(Utils) {
  var method_name = "flickr.photosets.editPhotos";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.getContext = (function(Utils) {
  var method_name = "flickr.photosets.getContext";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.getInfo = (function(Utils) {
  var method_name = "flickr.photosets.getInfo";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.getList = (function(Utils) {
  var method_name = "flickr.photosets.getList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.getPhotos = (function(Utils) {
  var method_name = "flickr.photosets.getPhotos";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.orderSets = (function(Utils) {
  var method_name = "flickr.photosets.orderSets";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.removePhoto = (function(Utils) {
  var method_name = "flickr.photosets.removePhoto";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.removePhotos = (function(Utils) {
  var method_name = "flickr.photosets.removePhotos";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.reorderPhotos = (function(Utils) {
  var method_name = "flickr.photosets.reorderPhotos";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.photosets.setPrimaryPhoto = (function(Utils) {
  var method_name = "flickr.photosets.setPrimaryPhoto";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.places.find = (function(Utils) {
  var method_name = "flickr.places.find";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.places.findByLatLon = (function(Utils) {
  var method_name = "flickr.places.findByLatLon";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.places.getChildrenWithPhotosPublic = (function(Utils) {
  var method_name = "flickr.places.getChildrenWithPhotosPublic";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.places.getInfo = (function(Utils) {
  var method_name = "flickr.places.getInfo";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.places.getInfoByUrl = (function(Utils) {
  var method_name = "flickr.places.getInfoByUrl";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.places.getPlaceTypes = (function(Utils) {
  var method_name = "flickr.places.getPlaceTypes";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.places.getShapeHistory = (function(Utils) {
  var method_name = "flickr.places.getShapeHistory";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.places.getTopPlacesList = (function(Utils) {
  var method_name = "flickr.places.getTopPlacesList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.places.placesForBoundingBox = (function(Utils) {
  var method_name = "flickr.places.placesForBoundingBox";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.places.placesForContacts = (function(Utils) {
  var method_name = "flickr.places.placesForContacts";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.places.placesForTags = (function(Utils) {
  var method_name = "flickr.places.placesForTags";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.places.placesForUser = (function(Utils) {
  var method_name = "flickr.places.placesForUser";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.places.resolvePlaceId = (function(Utils) {
  var method_name = "flickr.places.resolvePlaceId";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.places.resolvePlaceURL = (function(Utils) {
  var method_name = "flickr.places.resolvePlaceURL";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.places.tagsForPlace = (function(Utils) {
  var method_name = "flickr.places.tagsForPlace";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.prefs.getContentType = (function(Utils) {
  var method_name = "flickr.prefs.getContentType";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.prefs.getGeoPerms = (function(Utils) {
  var method_name = "flickr.prefs.getGeoPerms";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.prefs.getHidden = (function(Utils) {
  var method_name = "flickr.prefs.getHidden";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.prefs.getPrivacy = (function(Utils) {
  var method_name = "flickr.prefs.getPrivacy";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.prefs.getSafetyLevel = (function(Utils) {
  var method_name = "flickr.prefs.getSafetyLevel";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.push.getSubscriptions = (function(Utils) {
  var method_name = "flickr.push.getSubscriptions";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.push.getTopics = (function(Utils) {
  var method_name = "flickr.push.getTopics";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.push.subscribe = (function(Utils) {
  var method_name = "flickr.push.subscribe";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.push.unsubscribe = (function(Utils) {
  var method_name = "flickr.push.unsubscribe";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.reflection.getMethodInfo = (function(Utils) {
  var method_name = "flickr.reflection.getMethodInfo";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.reflection.getMethods = (function(Utils) {
  var method_name = "flickr.reflection.getMethods";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.stats.getCollectionDomains = (function(Utils) {
  var method_name = "flickr.stats.getCollectionDomains";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.stats.getCollectionReferrers = (function(Utils) {
  var method_name = "flickr.stats.getCollectionReferrers";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.stats.getCollectionStats = (function(Utils) {
  var method_name = "flickr.stats.getCollectionStats";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.stats.getCSVFiles = (function(Utils) {
  var method_name = "flickr.stats.getCSVFiles";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.stats.getPhotoDomains = (function(Utils) {
  var method_name = "flickr.stats.getPhotoDomains";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.stats.getPhotoReferrers = (function(Utils) {
  var method_name = "flickr.stats.getPhotoReferrers";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.stats.getPhotosetDomains = (function(Utils) {
  var method_name = "flickr.stats.getPhotosetDomains";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.stats.getPhotosetReferrers = (function(Utils) {
  var method_name = "flickr.stats.getPhotosetReferrers";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.stats.getPhotosetStats = (function(Utils) {
  var method_name = "flickr.stats.getPhotosetStats";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.stats.getPhotoStats = (function(Utils) {
  var method_name = "flickr.stats.getPhotoStats";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.stats.getPhotostreamDomains = (function(Utils) {
  var method_name = "flickr.stats.getPhotostreamDomains";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.stats.getPhotostreamReferrers = (function(Utils) {
  var method_name = "flickr.stats.getPhotostreamReferrers";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.stats.getPhotostreamStats = (function(Utils) {
  var method_name = "flickr.stats.getPhotostreamStats";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.stats.getPopularPhotos = (function(Utils) {
  var method_name = "flickr.stats.getPopularPhotos";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.stats.getTotalViews = (function(Utils) {
  var method_name = "flickr.stats.getTotalViews";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.tags.getClusterPhotos = (function(Utils) {
  var method_name = "flickr.tags.getClusterPhotos";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.tags.getClusters = (function(Utils) {
  var method_name = "flickr.tags.getClusters";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.tags.getHotList = (function(Utils) {
  var method_name = "flickr.tags.getHotList";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.tags.getListPhoto = (function(Utils) {
  var method_name = "flickr.tags.getListPhoto";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.tags.getListUser = (function(Utils) {
  var method_name = "flickr.tags.getListUser";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.tags.getListUserPopular = (function(Utils) {
  var method_name = "flickr.tags.getListUserPopular";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.tags.getListUserRaw = (function(Utils) {
  var method_name = "flickr.tags.getListUserRaw";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.tags.getMostFrequentlyUsed = (function(Utils) {
  var method_name = "flickr.tags.getMostFrequentlyUsed";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.tags.getRelated = (function(Utils) {
  var method_name = "flickr.tags.getRelated";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.test.echo = (function(Utils) {
  var method_name = "flickr.test.echo";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.test.login = (function(Utils) {
  var method_name = "flickr.test.login";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.test.null = (function(Utils) {
  var method_name = "flickr.test.null";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.urls.getGroup = (function(Utils) {
  var method_name = "flickr.urls.getGroup";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.urls.getUserPhotos = (function(Utils) {
  var method_name = "flickr.urls.getUserPhotos";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.urls.getUserProfile = (function(Utils) {
  var method_name = "flickr.urls.getUserProfile";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.urls.lookupGallery = (function(Utils) {
  var method_name = "flickr.urls.lookupGallery";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.urls.lookupGroup = (function(Utils) {
  var method_name = "flickr.urls.lookupGroup";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

Flickr.prototype.urls.lookupUser = (function(Utils) {
  var method_name = "flickr.urls.lookupUser";
  return function (callOptions, callback) {
            if(callOptions && !callback) { callback = callOptions; callOptions = {}; }
            var queryArguments = Utils.generateQueryArguments(method_name, this.flickrOptions, callOptions);
            Utils.queryFlickr(queryArguments, this.flickrOptions, callback, false);
          }
}(Utils));

 Flickr.methodNames = [
    "flickr.activity.userComments",
    "flickr.activity.userPhotos",
    "flickr.auth.checkToken",
    "flickr.auth.getFrob",
    "flickr.auth.getFullToken",
    "flickr.auth.getToken",
    "flickr.auth.oauth.checkToken",
    "flickr.auth.oauth.getAccessToken",
    "flickr.blogs.getList",
    "flickr.blogs.getServices",
    "flickr.blogs.postPhoto",
    "flickr.cameras.getBrandModels",
    "flickr.cameras.getBrands",
    "flickr.collections.getInfo",
    "flickr.collections.getTree",
    "flickr.commons.getInstitutions",
    "flickr.contacts.getList",
    "flickr.contacts.getListRecentlyUploaded",
    "flickr.contacts.getPublicList",
    "flickr.contacts.getTaggingSuggestions",
    "flickr.favorites.add",
    "flickr.favorites.getContext",
    "flickr.favorites.getList",
    "flickr.favorites.getPublicList",
    "flickr.favorites.remove",
    "flickr.galleries.addPhoto",
    "flickr.galleries.create",
    "flickr.galleries.editMeta",
    "flickr.galleries.editPhoto",
    "flickr.galleries.editPhotos",
    "flickr.galleries.getInfo",
    "flickr.galleries.getList",
    "flickr.galleries.getListForPhoto",
    "flickr.galleries.getPhotos",
    "flickr.groups.browse",
    "flickr.groups.discuss.replies.add",
    "flickr.groups.discuss.replies.delete",
    "flickr.groups.discuss.replies.edit",
    "flickr.groups.discuss.replies.getInfo",
    "flickr.groups.discuss.replies.getList",
    "flickr.groups.discuss.topics.add",
    "flickr.groups.discuss.topics.getInfo",
    "flickr.groups.discuss.topics.getList",
    "flickr.groups.getInfo",
    "flickr.groups.join",
    "flickr.groups.joinRequest",
    "flickr.groups.leave",
    "flickr.groups.members.getList",
    "flickr.groups.pools.add",
    "flickr.groups.pools.getContext",
    "flickr.groups.pools.getGroups",
    "flickr.groups.pools.getPhotos",
    "flickr.groups.pools.remove",
    "flickr.groups.search",
    "flickr.interestingness.getList",
    "flickr.machinetags.getNamespaces",
    "flickr.machinetags.getPairs",
    "flickr.machinetags.getPredicates",
    "flickr.machinetags.getRecentValues",
    "flickr.machinetags.getValues",
    "flickr.panda.getList",
    "flickr.panda.getPhotos",
    "flickr.people.findByEmail",
    "flickr.people.findByUsername",
    "flickr.people.getGroups",
    "flickr.people.getInfo",
    "flickr.people.getLimits",
    "flickr.people.getPhotos",
    "flickr.people.getPhotosOf",
    "flickr.people.getPublicGroups",
    "flickr.people.getPublicPhotos",
    "flickr.people.getUploadStatus",
    "flickr.photos.addTags",
    "flickr.photos.comments.addComment",
    "flickr.photos.comments.deleteComment",
    "flickr.photos.comments.editComment",
    "flickr.photos.comments.getList",
    "flickr.photos.comments.getRecentForContacts",
    "flickr.photos.delete",
    "flickr.photos.geo.batchCorrectLocation",
    "flickr.photos.geo.correctLocation",
    "flickr.photos.geo.getLocation",
    "flickr.photos.geo.getPerms",
    "flickr.photos.geo.photosForLocation",
    "flickr.photos.geo.removeLocation",
    "flickr.photos.geo.setContext",
    "flickr.photos.geo.setLocation",
    "flickr.photos.geo.setPerms",
    "flickr.photos.getAllContexts",
    "flickr.photos.getContactsPhotos",
    "flickr.photos.getContactsPublicPhotos",
    "flickr.photos.getContext",
    "flickr.photos.getCounts",
    "flickr.photos.getExif",
    "flickr.photos.getFavorites",
    "flickr.photos.getInfo",
    "flickr.photos.getNotInSet",
    "flickr.photos.getPerms",
    "flickr.photos.getRecent",
    "flickr.photos.getSizes",
    "flickr.photos.getUntagged",
    "flickr.photos.getWithGeoData",
    "flickr.photos.getWithoutGeoData",
    "flickr.photos.licenses.getInfo",
    "flickr.photos.licenses.setLicense",
    "flickr.photos.notes.add",
    "flickr.photos.notes.delete",
    "flickr.photos.notes.edit",
    "flickr.photos.people.add",
    "flickr.photos.people.delete",
    "flickr.photos.people.deleteCoords",
    "flickr.photos.people.editCoords",
    "flickr.photos.people.getList",
    "flickr.photos.recentlyUpdated",
    "flickr.photos.removeTag",
    "flickr.photos.search",
    "flickr.photos.setContentType",
    "flickr.photos.setDates",
    "flickr.photos.setMeta",
    "flickr.photos.setPerms",
    "flickr.photos.setSafetyLevel",
    "flickr.photos.setTags",
    "flickr.photos.suggestions.approveSuggestion",
    "flickr.photos.suggestions.getList",
    "flickr.photos.suggestions.rejectSuggestion",
    "flickr.photos.suggestions.removeSuggestion",
    "flickr.photos.suggestions.suggestLocation",
    "flickr.photos.transform.rotate",
    "flickr.photos.upload.checkTickets",
    "flickr.photosets.addPhoto",
    "flickr.photosets.comments.addComment",
    "flickr.photosets.comments.deleteComment",
    "flickr.photosets.comments.editComment",
    "flickr.photosets.comments.getList",
    "flickr.photosets.create",
    "flickr.photosets.delete",
    "flickr.photosets.editMeta",
    "flickr.photosets.editPhotos",
    "flickr.photosets.getContext",
    "flickr.photosets.getInfo",
    "flickr.photosets.getList",
    "flickr.photosets.getPhotos",
    "flickr.photosets.orderSets",
    "flickr.photosets.removePhoto",
    "flickr.photosets.removePhotos",
    "flickr.photosets.reorderPhotos",
    "flickr.photosets.setPrimaryPhoto",
    "flickr.places.find",
    "flickr.places.findByLatLon",
    "flickr.places.getChildrenWithPhotosPublic",
    "flickr.places.getInfo",
    "flickr.places.getInfoByUrl",
    "flickr.places.getPlaceTypes",
    "flickr.places.getShapeHistory",
    "flickr.places.getTopPlacesList",
    "flickr.places.placesForBoundingBox",
    "flickr.places.placesForContacts",
    "flickr.places.placesForTags",
    "flickr.places.placesForUser",
    "flickr.places.resolvePlaceId",
    "flickr.places.resolvePlaceURL",
    "flickr.places.tagsForPlace",
    "flickr.prefs.getContentType",
    "flickr.prefs.getGeoPerms",
    "flickr.prefs.getHidden",
    "flickr.prefs.getPrivacy",
    "flickr.prefs.getSafetyLevel",
    "flickr.push.getSubscriptions",
    "flickr.push.getTopics",
    "flickr.push.subscribe",
    "flickr.push.unsubscribe",
    "flickr.reflection.getMethodInfo",
    "flickr.reflection.getMethods",
    "flickr.stats.getCollectionDomains",
    "flickr.stats.getCollectionReferrers",
    "flickr.stats.getCollectionStats",
    "flickr.stats.getCSVFiles",
    "flickr.stats.getPhotoDomains",
    "flickr.stats.getPhotoReferrers",
    "flickr.stats.getPhotosetDomains",
    "flickr.stats.getPhotosetReferrers",
    "flickr.stats.getPhotosetStats",
    "flickr.stats.getPhotoStats",
    "flickr.stats.getPhotostreamDomains",
    "flickr.stats.getPhotostreamReferrers",
    "flickr.stats.getPhotostreamStats",
    "flickr.stats.getPopularPhotos",
    "flickr.stats.getTotalViews",
    "flickr.tags.getClusterPhotos",
    "flickr.tags.getClusters",
    "flickr.tags.getHotList",
    "flickr.tags.getListPhoto",
    "flickr.tags.getListUser",
    "flickr.tags.getListUserPopular",
    "flickr.tags.getListUserRaw",
    "flickr.tags.getMostFrequentlyUsed",
    "flickr.tags.getRelated",
    "flickr.test.echo",
    "flickr.test.login",
    "flickr.test.null",
    "flickr.urls.getGroup",
    "flickr.urls.getUserPhotos",
    "flickr.urls.getUserProfile",
    "flickr.urls.lookupGallery",
    "flickr.urls.lookupGroup",
    "flickr.urls.lookupUser"
];
 window.Flickr = Flickr;
}());
