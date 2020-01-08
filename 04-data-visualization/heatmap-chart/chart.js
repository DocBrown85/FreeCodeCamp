var dataURL =
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

d3.json(dataURL).then(function(data) {
  console.log(data);
});
