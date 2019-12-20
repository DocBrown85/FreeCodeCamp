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

  var yData = data.map(function(item) {
    var parsedTime = item.Time.split(":");
    var date = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
    return date;
  });

  var yScale = d3
    .scaleTime()
    .range([0, height])
    .domain(d3.extent(yData));

  console.log(d3.extent(yData));

  var yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

  svg
    .attr("class", "x axis")
    .attr("id", "x-axis")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + height + ")")
    .call(xAxis);

  svg
    .attr("class", "y axis")
    .attr("id", "y-axis")
    .append("g")
    .attr("transform", "translate(" + margin.left + ", 0)")
    .call(yAxis);
});
