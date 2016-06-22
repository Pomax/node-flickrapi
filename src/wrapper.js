(function(global, factory) {
	if (typeof module === "object" && typeof module.exports === "object") {
		module.exports = factory(global);
	} else {
		factory(global);
	}
	// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {

  //@CODE

	// Register as a named AMD module
	if (typeof define === "function" && define.amd) {
		define("flickrapi", [], function() {
			return Flickr;
		});
	}

	if (!noGlobal) {
		window.Flickr = Flickr;
	}
	return Flickr;
}));