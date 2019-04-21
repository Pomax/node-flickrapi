var fs = require("fs"),
  consolidated = {
  "flickr.reflection.getMethods.json": JSON.parse(fs.readFileSync(__dirname + "/data/flickr/flickr.reflection.getMethods.json"));
}

var jsonFiles = fs.readdirSync("./data/flickr/methods");
for(var i=0, len=jsonFiles.length; i<len; i++) {
  var filename = jsonFiles[i],
    lastDot = filename.lastIndexOf(".");
  if(filename.substring(lastDot) !== ".json") {
    continue;
  }

  var value = fs.readFileSync(__dirname + "/data/flickr/methods/" + filename, "utf8");
  consolidated["methods/" + filename] = JSON.parse(value);
}

fs.writeFileSync("./built-api.js", "module.exports = " + JSON.stringify(consolidated, null, "\t"));
console.log("built-api.js regenerated with " + Object.keys(consolidated).length + " api files consolidated");
