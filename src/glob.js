var fs = require("fs"),
  path = require("path");

module.exports = function(root, pattern) {
  function walk(dir) {
    if (!fs.existsSync(dir)) {
      return;
    }

    var list = fs.readdirSync(dir);
    if (!list.length) {
      return;
    }
    for (var i = 0, len = list.length; i < len; i++) {
      var file = list[i],
        fullpath = path.resolve(dir, file);
      if (fs.statSync(fullpath).isDirectory()) {
        walk(fullpath);
        continue;
      }
      if (fullpath.contains(pattern)) {
        files.push(fullpath);
      }
    }
    return files
  }

  var files = [];
  return walk(root);
}
