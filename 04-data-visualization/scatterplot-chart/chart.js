d3.json(
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
).then(function(data) {
  console.log(data);

  // set the dimensions and margins of the graph
  var margin = {top: 100, right: 20, bottom: 30, left: 60};
  var width = 920 - margin.left - margin.right;
  var height = 630 - margin.top - margin.bottom;

  var svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "graph")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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

  var yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("id", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "y axis")
    .attr("id", "y-axis")
    //.attr("transform", "rotate(0)")
    .call(yAxis);

  data.forEach(function(d) {
    d.Place = +d.Place;
    var parsedTime = d.Time.split(":");
    d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
  });

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  svg
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("r", 6)
    .attr("cx", function(d) {
      return xScale(d.Year);
    })
    .attr("cy", function(d) {
      return yScale(d.Time);
    })
    .attr("data-xvalue", function(d) {
      return d.Year;
    })
    .attr("data-yvalue", function(d) {
      return d.Time.toISOString();
    })
    .style("fill", function(d) {
      return color(d.Doping != "");
    });

  //title
  svg
    .append("text")
    .attr("id", "title")
    .attr("x", width / 2)
    .attr("y", 0 - margin.top / 2)
    .attr("text-anchor", "middle")
    .style("font-size", "30px")
    .text("Doping in Professional Bicycle Racing");
});
