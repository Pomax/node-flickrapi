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
    express = require("express"), app, server;


// Set up a temporary oauth callback server if
// we do not have authentication credentials yet.
if(!FlickrOptions.access_token || !FlickrOptions.access_token_secret) {
  app = express();
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
    });
  });
  server = app.listen(4321, function(err, result) {
    if (err) { console.error(err); process.exit(1); }
    console.log("auth server listening on port 4321");
  });
}


// Start up the Flickr API proxy, and call the test.echo
// method to make sure we are actually able to talk to Flickr.
Flickr.authenticate(FlickrOptions, function(error, flickr) {
  app = express();

  app.configure(function() {
    app.disable('x-powered-by');
    app.use(express.compress());
    app.use(express.json());
    app.use(express.static("browser"));
    flickr.proxy(app, "/service/rest/");
  });

  server = app.listen(3000, function(err, result) {
    if (err) { console.error(err); process.exit(1); }
    else {
      console.log("listening on port 3000 (press ctrl-c to exit).");
      flickr.test.echo({"test": "test"}, function(err,result) {
        if(err) console.log("note: error connecting to the flickr API");
      });

      /**
       *
       *
       *    Drop in any code you want to test at this point.
       *
       *
       */

      // Simple test code: downsync the user's content,
      // if the --downsync runtime argument was passed.
      if (process.argv.indexOf("--downsync")>-1) {
        FlickrOptions.afterDownsync = function() {
          console.log("\nDownsync finished.");
          server.close();
          process.exit(0);
        };
        var user = FlickrOptions.user_id.replace("%40","-"),
            downsync = Flickr.downsync("data/" + user);
        console.log("Downsyncing for user: " + user);
        downsync(false, flickr);
      }
    }
  });
});
