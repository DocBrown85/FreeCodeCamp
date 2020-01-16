var educationDataURL =
  "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";
var countyDataURL =
  "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";

var headings = d3
  .select("#chart")
  .append("div")
  .attr("class", "headings");
headings
  .append("h1")
  .attr("id", "title")
  .text("United States Educational Attainment");
headings
  .append("h3")
  .attr("id", "description")
  .html(
    "Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)"
  );

var width = 960;
var height = 600;

var svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var path = d3.geoPath();

var x = d3
  .scaleLinear()
  .domain([2.6, 75.1])
  .rangeRound([600, 860]);

var color = d3
  .scaleThreshold()
  .domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8))
  .range(d3.schemeGreens[9]);

var g = svg
  .append("g")
  .attr("id", "legend")
  .attr("transform", "translate(0,40)");

g.selectAll("rect")
  .data(
    color.range().map(function(d) {
      d = color.invertExtent(d);
      if (d[0] == null) d[0] = x.domain()[0];
      if (d[1] == null) d[1] = x.domain()[1];
      return d;
    })
  )
  .enter()
  .append("rect")
  .attr("height", 8)
  .attr("x", function(d) {
    return x(d[0]);
  })
  .attr("width", function(d) {
    return x(d[1]) - x(d[0]);
  })
  .attr("fill", function(d) {
    return color(d[0]);
  });

g.append("text")
  .attr("class", "caption")
  .attr("x", x.range()[0])
  .attr("y", -6)
  .attr("fill", "#000")
  .attr("text-anchor", "start")
  .attr("font-weight", "bold")
  .text("Education Rate");

g.call(
  d3
    .axisBottom(x)
    .tickSize(13)
    .tickFormat(function(x) {
      return Math.round(x) + "%";
    })
    .tickValues(color.domain())
)
  .select(".domain")
  .remove();

var tooltip = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .attr("id", "tooltip")
  .style("opacity", 0);

var showTooltip = function(d) {
  tooltip.style("opacity", 0.9);
  tooltip.html(function() {
    var result = educationData.filter(function(obj) {
      return obj.fips == d.id;
    });
    if (result[0]) {
      return (
        result[0]["area_name"] +
        ", " +
        result[0]["state"] +
        ": " +
        result[0].bachelorsOrHigher +
        "%"
      );
    }
    //could not find a matching fips id in the data
    return 0;
  });
  tooltip.attr("data-education", function() {
    var result = educationData.filter(function(obj) {
      return obj.fips == d.id;
    });
    if (result[0]) {
      return result[0].bachelorsOrHigher;
    }
    //could not find a matching fips id in the data
    return 0;
  });
  tooltip.style("left", d3.event.pageX + 28 + "px");
  tooltip.style("top", d3.event.pageY - 28 + "px");
};

var hideToolip = function(d) {
  tooltip.style("opacity", 0);
};

var buildColorplethMap = function(data) {
  educationData = data[0];
  countyData = data[1];
  console.log(educationData);
  console.log(countyData);

  svg
    .append("g")
    .attr("class", "counties")
    .selectAll("path")
    .data(topojson.feature(countyData, countyData.objects.counties).features)
    .enter()
    .append("path")
    .attr("class", "county")
    .attr("data-fips", function(d) {
      return d.id;
    })
    .attr("data-education", function(d) {
      var result = educationData.filter(function(obj) {
        return obj.fips == d.id;
      });
      if (result[0]) {
        return result[0].bachelorsOrHigher;
      }
      //could not find a matching fips id in the data
      console.log("could find data for: ", d.id);
      return 0;
    })
    .attr("fill", function(d) {
      var result = educationData.filter(function(obj) {
        return obj.fips == d.id;
      });
      if (result[0]) {
        return color(result[0].bachelorsOrHigher);
      }
      //could not find a matching fips id in the data
      return color(0);
    })
    .attr("d", path)
    .on("mouseover", showTooltip)
    .on("mouseout", hideToolip)
    .append("title")
    .text(function(d) {
      return d.rate + "%";
    });

  svg
    .append("path")
    .datum(
      topojson.mesh(countyData, countyData.objects.states, function(a, b) {
        return a !== b;
      })
    )
    .attr("class", "states")
    .attr("d", path);
};

var promises = [d3.json(educationDataURL), d3.json(countyDataURL)];

Promise.all(promises).then(buildColorplethMap);
