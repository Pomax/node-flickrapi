# A Node.js implementation of the Flickr API

Because it seems like there haven't been any implemented yet.

## how to use this package

The initial require is simply `require("FlickrAPI")` after making
sure you added FlickrAPI to your package.json, either manually or
by running `npm install FlickrAPI --save` for the project you're
using it in.

Once available, you can authenticate with flickr, which will
result in a callback that gives you the actual API object:

```
var Flickr = require("FlickrAPI"),
    FlickrOptions = {
      key: "API key that you get from Flickr",
      secret: "API key secret that you get from Flickr"
    };
Flickr.authenticate(FlickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object
});
```

calling API functions is then a matter of calling the functions
as they are listed on http://www.flickr.com/services/api, so
if you wish to get all your own photos, you would call:

```
flickr.photos.search({ user_id: flickr.user_id }, function(err, res) {
  // res is our result object.
});
```

All results are in JSON format. For obvious reasons.

### Downloading all your Flickr stuff

You can use this module to very easily download all your flickr stuff:

```
var FlickrAPI = require("FlickrAPI"),
    FlickrOptions = { ... };
Flickr.authenticate(FlickrOptions, FlickrAPI.downsync);
```

That's all you need to run. This will generate a data directory with
your images in `./data/images` (in several sizes), and the information
architecture (metadata, sets, collections, etc) in `./data/ia`.

### Using all your Flickr stuff offline

If you downloaded all your Flickr stuff, you can use these in your
node apps by "dry loading" Flickr:

```
var FlickrAPI = require("FlickrAPI"),
    flickrData = Flickr.loadLocally();
```

This will give you an object with the following structure:

```
{
  photos: [photo objects],
  photo_keys: [photo.id array, sorted on publish date],
  photosets: [set objects],
  photoset_keys: [set.id array, sorted on publish date],
  collections: [collection objects],
  collection_keys: [collection.id array, sorted on publish date],
}
```

Note sure what these objects look like? head over to your `./data/ia`
directory and just open a .json file in your favourite text editor.

## On first run

On first run, the authentication function will notice that
there are no `access_token` and `access_token_secret` values
set, and will negotiate these with Flickr using their oauth
API. Once this finishes, the app notify you that you need
additional environment variables to properly use it, such as:

```
$> node app
{ oauth_callback_confirmed: 'true',
  oauth_token: '...',
  oauth_token_secret: '...' }
prompt: oauth_verifier: []
```

This will open a browser that allows you to consent to the app
accessing your most private of private parts. On Flickr. If you
do, you'll get an number code that you need to pass so that the
FlickrAPI can negotiate access tokens with Flickr. Doing so
continues the program:

```
$> node app
{ oauth_callback_confirmed: 'true',
  oauth_token: '...',
  oauth_token_secret: '...' }
prompt: oauth_verifier: 123-456-789

Add the following variables to your environment:

export FLICKR_USER_ID="12345678%40N12"
export FLICKR_ACCESS_TOKEN="72157634942121673-3e02b190b9720d7d"
export FLICKR_ACCESS_TOKEN_SECRET="99c038c9fc77673e"
```

Add these variables to your environment, or put them in an `.env`
file for use with `habitat` or the like, or put them straight into
your source code to use the FlickrAPI:

```
var FlickrOptions = {
      key: "your API key",
      secret: "your API key secret",
      user_ud: "...",
      access_token: "...",
      access_token_secret: "..."
    }
```

The FlickrAPI package will now be able to authenticate with Flickr
without constantly needing to ask you for permission.
