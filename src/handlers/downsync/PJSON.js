/**
 * Pretty-print JSON files, because we will want
 * to inspect them manually, as good humans.
 */
module.exports = (function() {
  if (!JSON.prettyprint) {
    JSON.prettyprint = function prettyprint(data) {
      return this.stringify(data, undefined, 2);
    };
  }
  return JSON;
}());
