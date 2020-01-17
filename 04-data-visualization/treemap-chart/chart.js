var videogameSalesDataURL =
  "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json";

var buildTreeMap = function(data) {
  console.log(data);
};

Promise.all([d3.json(videogameSalesDataURL)]).then(buildTreeMap);
