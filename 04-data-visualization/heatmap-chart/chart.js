var dataURL =
  "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

d3.json(dataURL).then(function(data) {
  console.log(data);

  var margin = {top: 30, right: 30, bottom: 50, left: 100},
    width = 1050 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  var headings = d3.select("#chart").append("div");
  headings
    .append("h1")
    .attr("id", "title")
    .text("Monthly Global Land-Surface Temperature");
  headings
    .append("h3")
    .attr("id", "description")
    .html(
      data.monthlyVariance[0].year +
        " - " +
        data.monthlyVariance[data.monthlyVariance.length - 1].year +
        ": base temperature " +
        data.baseTemperature +
        "&#8451;"
    );

  var svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // y axis
  var yScale = d3
    .scaleBand()
    .range([0, height])
    .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);

  var yAxis = d3
    .axisLeft(yScale)
    .tickValues(yScale.domain())
    .tickFormat(function(month) {
      var date = new Date(0);
      date.setUTCMonth(month);
      return d3.timeFormat("%B")(date);
    });

  // x axis
  var xScale = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.monthlyVariance.map(function(item) {
        return item.year;
      })
    );

  var xAxis = d3
    .axisBottom(xScale)
    .tickValues(
      data.monthlyVariance
        .map(function(item) {
          return item.year;
        })
        .filter(function(item) {
          return item % 10 == 0;
        })
    )
    .tickFormat(function(year) {
      var date = new Date(0);
      date.setUTCFullYear(year);
      return d3.timeFormat("%Y")(date);
    });

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("class", "y-axis")
    .call(yAxis);

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("class", "x-axis")
    .attr("transform", "translate(0" + "," + height + ")")
    .call(xAxis);

  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height + margin.top + 20)
    .text("Years");

  svg
    .append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 20)
    .attr("x", -margin.top + 30)
    .text("Months");
});
