# A Node.js implementation of the Flickr API

With oauth authentication for Flickr API keys.

## how to use this package

The initial require is simply `require("flickrapi")` after making
sure you added flickrapi to your package.json, either manually or
by running `npm install flickrapi --save` for the project you're
using it in.

Once available, you can authenticate with flickr, which will
result in a callback that gives you the actual API object:

```
var Flickr = require("flickrapi"),
    flickrOptions = {
      key: "API key that you get from Flickr",
      secret: "API key secret that you get from Flickr"
    };
Flickr.authenticate(flickrOptions, function(error, flickr) {
  // we can now use "flickr" as our API object
});
```

calling API functions is then a matter of calling the functions
as they are listed on http://www.flickr.com/services/api, so
if you wish to get all your own photos, you would call:

```
flickr.photos.search({
  user_id: flickr.options.user_id,
  page: 1,
  per_page: 500
}, function(err, result) {
  // result is Flickr's response
});
```

All results are in JSON format. For obvious reasons.

### flickr.options

In addition to the standard Flickr functions, the `flickr` object
also has an `options` property, which looks like this:

```
{
  key: "your API key",
  secret: "your API key secret",
  user_id: "your user id, based on your first-time authorisation",
  access_token: "the preauthorised Flickr access token",
  access_token_secret: "its corresponding secret",
  oauth_timestamp: "the timestamp for the last flickr API call",
  oauth_nonce: "the cryptographic nonce that request used"
}
```

### Downloading all your Flickr stuffs

You can use this module to very easily download all your Flickr stuffs:

```
var Flickr = require("flickrapi"),
    flickrOptions = { ... };
Flickr.authenticate(flickrOptions, flickrapi.downsync());
```

That's all you need to run. This will generate a data directory with
your images in `./data/images` (in several sizes), and the information
architecture (metadata, sets, collections, etc) in `./data/ia`.

If you want this in a different directory, you can pass the dir as an
argument to the downsync function:

```
var Flickr = require("flickrapi"),
    flickrOptions = { ... };
Flickr.authenticate(flickrOptions, flickrapi.downsync("userdata/me"));
```

This will now create a `./data` for the flickr API information, but\
also a `./userdata/me/` directory that contains the `images` and `ia`
dirs with your personal data.

### Using all your Flickr stuffs in an app

If you downloaded all your Flickr stuffs, you can use these in your
own node apps by "dry loading" Flickr:

```
var Flickr = require("flickrapi"),
    flickrData = Flickr.loadLocally();
```

This will give you an object with the following structure:

```
{
  photos: [photo objects],
  photo_keys: [photo.id array, sorted on publish date],
  photosets: [set objects],
  photoset_keys: [set.id array, sorted on creation date],
  collections: [collection objects],
  collection_keys: [collection.id array, sorted on title],
}
```

Not sure what these objects look like? head over to your `./data/ia`
directory and just open a .json file in your favourite text editor.

## On first run

### Fetching the API

On first run, the package will fetch all known methods from
Flickr, and cache them for future use. This can take a bit,
as there are a fair number of methods, but is inconsequential
on subsequent package loading.

### Authenticating with Flickr

On first run, the authentication function will notice that
there are no `access_token` and `access_token_secret` values
set, and will negotiate these with Flickr using their oauth
API, based on the permissions you request for your API key.

By default, the only permissions are "read" permissions, but
you can override this by adding a `permissions` property to
the options object:

* `permissions: "read"` will give the app read-only access (default)
* `permissions: "write"` will give it read + write access
* `permissions: "delete"` will give it read, write and delete access

Running the app will show output such as the following block:

```
$> node app
{ oauth_callback_confirmed: 'true',
  oauth_token: '...',
  oauth_token_secret: '...' }
prompt: oauth_verifier: []
```

Once the app reaches this point it open a browser, allowing you to
consent to the app accessing your most private of private parts. On
Flickr, at least. If you agree to authorize it, you will get an
authorisation code that you need to pass so that the flickrapi can
negotiate access tokens with Flickr. Doing so continues the program:

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
file for use with `process.env` or the `habitat` package or the like,
or put them straight into your source code to use the flickrapi:

```
var FlickrOptions = {
      key: "your API key",
      secret: "your API key secret",
      user_ud: "...",
      access_token: "...",
      access_token_secret: "..."
    }
```

The flickrapi package will now be able to authenticate with Flickr
without constantly needing to ask you for permission to access data.
