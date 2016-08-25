Fork of https://github.com/Pomax/node-flickrapi that adds support for providing
a custom path for the 'data' folder parent creates in the root of your project.

    npm install --save flickrapi-move-data-dir

To use in a JS file:

    var flickr = require('flickrapi-move-data-dir')

To provide a custom path:

    var flickr = new Flickr({
      api_key: "1234ABCD1234ABCD1234ABCD1234ABCD",
      data_path: __dirname + '/node_modules/flickrapi-move-data-dir/data'
    });

