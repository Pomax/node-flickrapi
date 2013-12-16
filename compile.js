/**
 * This compiles a client-side Flickr library
 * based on the flickr method information.
 *
 * run with `node compile`
 */
(function() {
  "use strict";

  var APIBuilder = require("./src/flickr-api-object.js"),
      Utils = require("./src/utils.js");

  var buffer = (function() {
    var data = "";
    return {
      write: function(s) { data += s + "\n"; },
      getData: function() { return data; }
    };
  }());

  /**
   * Write out a (nested) object
   */
  var writeTree = function(node, name, write, wrapped) {
    if(typeof node === "function") {
      if (wrapped) {
        write(name + " = (function(Utils) {");
        write("  var required = " + JSON.stringify(node.data.required,null,2) + ";");
        // write("  var optional = " + JSON.stringify(node.data.optional,null,2) + ";");
        write("  var errors = " + JSON.stringify(node.data.errors,null,2) + ";");
        write("  var method_name = \""+name+"\";");
        write("  return " + node.toString());
        write("}(Utils));\n");
      } else {
        write(name + " = " + node.toString() + ";");
      }
    } else {
      write(name + " = {};");
      Object.keys(node).forEach(function(key) {
        writeTree(node[key], name + "." + key, write, wrapped);
      });
    }
  };

  /**
   * Compile a client-side library based on the flickr-api-object code.
   */
  new APIBuilder({}, Utils, function(err, flickr) {
    delete flickr.options;
    buffer.write("(function() {");
    buffer.write(" var Flickr = function(flickrOptions) {");
    writeTree(require("./browser/Utils.js"), "Utils", buffer.write);
    writeTree(flickr, "flickr", buffer.write, true);
    buffer.write("  return flickr;");
    buffer.write("};");
    buffer.write("window.Flickr = Flickr;");
    buffer.write("}());");
    var fs = require("fs");
    fs.writeFileSync("./browser/flickrapi.js", buffer.getData());
  });
}());
