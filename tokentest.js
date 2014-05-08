var habitat = require("habitat"),
    env = habitat.load(),
    Flickr = require("./src/FlickrApi"),
    FlickrOptions = env.get("FLICKR");

Flickr.tokenOnly(FlickrOptions, function(error, flickr) {
	flickr.test.echo({"test": "test"}, function(err,result) {
		if(err) { return console.log("note: error connecting to the flickr API"); }

			flickr.photos.search({ tags: "red+panda" }, function(err,result) {
				if(err) { return console.log("error:", err); }
				console.log(result.photos.photo.length + " results found. First result:");
				console.log(JSON.stringify(result.photos.photo[0],false,2));

				process.exit(0);
			});

	});
});
