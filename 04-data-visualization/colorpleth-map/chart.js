var educationDataURL =
  "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";
var countyDataURL =
  "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";

var promises = [d3.json(educationDataURL), d3.json(countyDataURL)];

var buildColorplethMap = function(data) {
  educationData = data[0];
  countyData = data[1];
  console.log(educationData);
  console.log(countyData);
};

Promise.all(promises).then(buildColorplethMap);
