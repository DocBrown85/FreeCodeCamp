d3.json(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
).then(function(data) {
  console.log(data);

  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 30, left: 60};
  var width = 460 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  var svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

  /*
   * Setup axes
   */
  var xData = data.map(function(item) {
    return item.Year;
  });

  var xScale = d3
    .scaleLinear()
    .range([0, width])
    .domain([
      d3.min(xData, function(d) {
        return d - 1;
      }),
      d3.max(xData, function(d) {
        return d + 1;
      })
    ]);

  var xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .text("Year");
});
