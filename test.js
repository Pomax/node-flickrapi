/**
 * This is a test runner that sets up the Flickr
 * API, and uses its connect/express proxy function
 * to listen for API calls that are POST'ed to the
 * API url. In this case:
 *
 *  http://127.0.0.1:3000/service/rest/flickr.method.name
 *
 * A test page for this API can be accessed by
 * loading http://127.0.0.1:3000 in your browser.
 */
var habitat = require("habitat"),
    env = habitat.load(),
    Flickr = require("./src/FlickrApi"),
    FlickrOptions = env.get("FLICKR");
    express = require("express");

Flickr.authenticate(FlickrOptions, function(error, flickr) {
  var app = express();

  app.configure(function() {
    app.disable('x-powered-by');
    app.use(express.compress());
    app.use(express.bodyParser());
    app.use(express.static("browser"));
    flickr.proxy(app, "/service/rest");
  });

  app.listen(3000, function(err, result) {
    if (err) { console.error(err); process.exit(1); }
    else { console.log("listening on port 3000 (press ctrl-c to exit)."); }
  });
});
