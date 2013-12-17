/**
 * This compiles a client-side Flickr library
 * based on the flickr method information.
 *
 * run with `node compile`
 */
(function() {
  "use strict";
  process.CLIENT_COMPILE = true;

  var APIBuilder = require("./src/flickr-api-object.js"),
      Utils = require("./src/utils.js"),
      methods = [],
      filename = "flickrapi",
      compressor = require("node-minify");

  if(process.argv.indexOf("dev") > -1) {
    filename = "flickrapi.dev";
  }

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
        write("Flickr.prototype"+name + " = (function(Utils) {");
        write("  var method_name = \"flickr"+name+"\";");
        if(process.argv.indexOf("dev") > -1) {
          write("  var required = " + JSON.stringify(node.data.required,null,2) + ";");
          write("  var optional = " + JSON.stringify(node.data.optional,null,2) + ";");
          write("  var errors = " + JSON.stringify(node.data.errors,null,2) + ";");
          write("  var fn = " + node.toString());
          write("  fn.data = { required: required, optional: optional, errors: errors, name: method_name };");
          write("  return fn;");
        }
        else { write("  return " + node.toString()); }
        write("}(Utils));\n");
        methods.push("flickr"+name);
      } else {
        write(name + " = " + node.toString() + ";");
      }
    } else {
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
    buffer.write(" var methodNames = [];");
    buffer.write(" var Utils = {};");
    writeTree(require("./browser/Utils.js"), "Utils", buffer.write);
    buffer.write(" Utils.errors = " + JSON.stringify(Utils.getCallErrors(),false, 4) + ";");

    buffer.write(" var Flickr = " + (function(flickrOptions) { this.bindOptions(flickrOptions); }).toString() + ";");

    buffer.write(" Flickr.prototype = " + JSON.stringify(flickr, false, 4));
    buffer.write(" Flickr.prototype.bindOptions = " + (function(flickrOptions) {
      this.flickrOptions = flickrOptions;
      (function bindOptions(obj, props) {
        Object.keys(props).forEach(function(key) {
          if (typeof obj[key] === "object") {
            bindOptions(obj[key], props[key]);
            obj[key].flickrOptions = flickrOptions;
          }
        });
      }(this, Flickr.prototype));
    }).toString() + ";");
    writeTree(flickr, "", buffer.write, true);
    buffer.write(" Flickr.methodNames = " + JSON.stringify(methods,false,4) + ";");
    buffer.write(" window.Flickr = Flickr;");
    buffer.write("}());");
    var fs = require("fs");
    fs.writeFileSync("./browser/"+filename+".js", buffer.getData());

    // minify
    new compressor.minify({
      type: "uglifyjs",
      fileIn: "browser/"+filename+".js",
      fileOut: "browser/"+filename+"-min.js"
    });
  });
}());
