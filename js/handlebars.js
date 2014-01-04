/**
 * User: sirzach
 * Date: 1/4/14
 * Time: 3:50 PM
 */

var id = 0,
    cache = [];

Handlebars.registerHelper("bindData", function(data) {
  var dataKey = id++;
  cache[dataKey] = data;

  return "data-handlebar-id=" + dataKey;
});

Handlebars.getBoundData = function(handlebarId) {
  if (typeof(handlebarId) !== "string") {
    // If a string was not passed in, it is the html element, so grab it's id.
    handlebarId = handlebarId.getAttribute("data-handlebar-id");
  }

  return cache[handlebarId];
};