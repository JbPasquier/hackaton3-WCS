var ph = require("pornhub");

// get details about a video
ph.search({search: "teen", thumbsize: "medium"}, function(err, results) {
  console.log(err, results);
});
