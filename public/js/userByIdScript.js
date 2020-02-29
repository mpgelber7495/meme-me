var Handlebars = require("handlebars");
Handlebars.registerHelper("progress", function(arr1, arr2) {
  return parseInt(arr1.length) + parseInt(arr2.length);
});
