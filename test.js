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
    FlickrOptions = env.get("FLICKR"),
    // node test => auth test; node test false => token only test
    testAuthenticated = (process.argv[2] != "false"),
    server;


// Set up a temporary oauth callback server if
// we do not have authentication credentials yet.
if(!FlickrOptions.access_token || !FlickrOptions.access_token_secret) {
  var express = require("express"),
      app = express(),
      server;
  app.configure(function(){
    app.get("/", function(req, res){
      res.write("<!doctype html><html><head><meta charset='utf-8'><title>Credentials received</title></head>"+
                "<body><h1>oauth credentials received</h1><p>You can close this window/tab now.</p></body></html>");
      res.end();
      FlickrOptions.exchange(req.query);
      // we no longer need the auth server
      server.close();
      // reload environment
      env = habitat.load();
      FlickrOptions = env.get("FLICKR");
      FlickrOptions.api_key = FlickrOptions.key;
      delete FlickrOptions.key;
    });
  });
  server = app.listen(4321, function(err, result) {
    if (err) { console.error(err); process.exit(1); }
    console.log("auth server listening on port 4321");
  });
}


// set up a simple http server using Express.js
var setupApp = function(flickr, next) {
  var express = require("express"),
      app = express(),
      server;
  app.configure(function() {
    app.disable('x-powered-by');
    app.use(express.compress());
    app.use(express.json());
    app.use(express.static("browser"));
    flickr.proxy(app, "/service/rest/");
  });
  server = app.listen(3000, next);
};


// Start up the Flickr API proxy, and call the test.echo
// method to make sure we are actually able to talk to Flickr.
if(testAuthenticated) Flickr.authenticate(FlickrOptions, function(error, flickr) {
  setupApp(flickr, function(err, result) {
    if (err) { console.error(err); process.exit(1); }
    else {


      console.log("testing upload...");
      Flickr.upload({
        photo: require("fs").readFileSync("test.jpg"),
        title: "test"
      }, FlickrOptions, function(err, result) {
//        console.log("error:");
//        console.log(error);
//        console.log("result:");
//        console.log(result);
      });

    }
  });
});

// Start up the Flickr API proxy, and call the test.echo
// method to make sure we are actually able to talk to Flickr.
// *** THIS PATH DOES NOT USE ANY AUTHENTICATION ***
if(!testAuthenticated) Flickr.tokenOnly(FlickrOptions, function(error, flickr) {
  setupApp(flickr, function(err, result) {
    if (err) { console.error(err); process.exit(1); }
    else {
      console.log("listening on port 3000 (press ctrl-c to exit).");

      flickr.test.echo({"test": "test"}, function(err,result) {
        if(err) { return console.log("note: error connecting to the flickr API"); }

        /**
         *
         *    Drop in any code you want to test at this point.
         *
         */
          flickr.photos.search({ tags: "red+panda" }, function(err,result) {
            if(err) { return console.log("error:", err); }
            console.log(result.photos.photo.length + " results found. First result:");
            console.log(JSON.stringify(result.photos.photo[0],false,2));
          });
        /**
         *
         *    The code above simply searches for red panda pictures
         */

      });
    }
  });
});
