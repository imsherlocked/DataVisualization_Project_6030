// #This is a not used in the code. Used only for testing and debugging

console.log("Map" + map);
console.log("TFM" + treesFeatureLayer);

window.selectCounty = null;

const svg = d3.select("svg"),
  width = 400,
  height = 460;
const projection = d3
  .geoEquirectangular()
  .scale(90000)
  .rotate([76.6, 0])
  .center([0, 39.3])
  .translate([width / 2, height / 2]);
d3.json(
  "Community_Statistical_Areas__CSAs___Reference_Boundaries.geojson"
).then(function (data) {
  d3.csv("crime_Trend.csv").then(function (dataset) {
    console.log(data);
    svg
      .append("g")
      .selectAll("path")
      .data(data.features)
      .join("path")
      .attr("fill", "black")
      .attr("d", d3.geoPath().projection(projection))
      .style("stroke", "#111");
    console.log(dataset);
    var headers = ["0", "100", "500", "1000", "2000", "3000", "4000", "5000"];
    var namecity = {};
    var first = {};
    var second = {};
    var third = {};
    var four = {};
    var five = {};
    var six = {};
    dataset.forEach((d) => {
      namecity[d["Neighbourhood"]] = d["Total_Crimes"];
      first[d["Neighbourhood"]] = d["year2012"];
      second[d["Neighbourhood"]] = d["year2013"];
      third[d["Neighbourhood"]] = d["year2014"];
      four[d["Neighbourhood"]] = d["year2015"];
      five[d["Neighbourhood"]] = d["year2016"];
      six[d["Neighbourhood"]] = d["year2017"];
    });
    console.log("NameCity" + namecity);
    var colorScale = d3
      .scaleLinear()
      .domain([0, 0.1 * d3.max(Object.values(namecity))])
      .domain([0, 100, 500, 1000, 2000, 3000, 4000, 5000])
      .range(d3.schemeReds[8]);
    let mouseOver = function (d) {
      d3.selectAll(".Community")
        .transition()
        .duration(100)
        .style("opacity", 0.5);
      d3.select(this)
        .transition()
        .duration(00)
        .style("opacity", 1)
        .style("stroke", "black");
    };

    let mouseLeave = function (d) {
      d3.selectAll(".Community")
        .transition()
        .duration(100)
        .style("opacity", 0.8);
      d3.select(this).transition().duration(200).style("stroke", "transparent");
    };
    var county = svg
      .append("g")
      .selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", d3.geoPath().projection(projection))
      .style("fill", (d) => {
        console.log("---" + namecity[d.properties.Community]);
        return colorScale(namecity[d.properties.Community]);
      })
      .style("stroke", "white")
      .style("stroke", "transparent")
      .attr("class", function (d) {
        return "Community";
      })
      .style("opacity", 0.8)
      .on("mouseover", mouseOver)
      .on("mouseleave", mouseLeave)
      .on("click", function (d, i) {
        updateChart();

        console.log("D", i.properties.Community);
        // scatterPlotDataArray[0].data[]
        //console.log(first[i.properties.Community]);
        var countyName = [];
        var countyN = i.properties.Community;
        //console.log(countyN);
        countyName = countyN.split("/");
        //console.log(countyName);
        countyName.forEach((d) => {   //baltimore/xyz
          //console.log("jkjkk" + d);
          dataset.forEach((da) => {   //baltimore
            //console.log(da.Neighbourhood.featureId);
            // console.log(
            //   "Main Data Elements",
            //   da.Neighbourhood.toString().split("/")
            // );
            var neigh = da.Neighbourhood.toString().split("/");
            //console.log("Neigh", neigh);
            //console.log(da.Neighbourhood.indexOf(d));
            if (neigh[0] == d) {
              treesFeatureLayer.eachFeature(function (e, idx) {
                // console.log(e.feature.id);
                //if(da==d)
                if (da.Neighbourhood.indexOf(e.feature.id) > -1) {
                  console.log("Inside");
                  e.setOpacity(1);
                  e.setZIndexOffset(1000);
                } else {
                  e.setOpacity(0.01);
                }
              });
            }
          });
        });

        //console.log(countyName.split("/"));

        treesFeatureLayer.eachFeature(function (e, idx) {
          // console.log(e.feature.id);
          if (countyName.length > -1) {
            e.setOpacity(1);
            e.setZIndexOffset(1000);
          } else {
            e.setOpacity(0.01);
          }
        });
      });

    function updateChart() {
      var scatterPlotDataArray = [];
      // window.selectCounty = county.on({
      //   click: function (d) {
      //     console.log(d);
      //   },
      // });
      treesFeatureLayer.eachActiveFeature(function (e) {
        console.log("FeatureId", e.feature.id);
        scatterPlotDataArray.push({
          x: e.feature.properties.Impact,
          y: e.feature.properties.Intensity,
          featureId: e.feature.id,
        });
      });
      return;
    }
    // .on("click", function (d, i) {
    //   var year_2012 = first[i.properties.Community];
    //   var year_2013 = second[i.properties.Community];
    //   var year_2014 = third[i.properties.Community];
    //   var year_2015 = four[i.properties.Community];
    //   var year_2016 = five[i.properties.Community];
    //   var year_2017 = six[i.properties.Community];
    //   console.log(" -> " + i.properties.Community);
    //   console.log(namecity[i.properties.Community]);
    //   var data = [
    //     { Cases: "2012", count: year_2012 },
    //     { Cases: "2013", count: year_2013 },
    //     { Cases: "2014", count: year_2014 },
    //     { Cases: "2015", count: year_2015 },
    //     { Cases: "2016", count: year_2016 },
    //     { Cases: "2017", count: year_2017 },
    //   ];
    //   if (document.getElementById("id5") != null) {
    //     document.getElementById("id5").remove();
    //   }

    //   var labels = data.map((d) => d.Cases);
    //   console.log("Labels" + labels);
    //   var frequency = data.map((d) => d.count);
    //   console.log(frequency);

    //   const margin = { top: 10, right: 30, bottom: 40, left: 60 },
    //     width = 450 - margin.left - margin.right,
    //     height = 360 - margin.top - margin.bottom;
    //   var svg1 = d3
    //     .select("#line")
    //     .append("svg")
    //     .attr("width", width + margin.left + margin.right)
    //     .attr("height", height + margin.top + margin.bottom)
    //     .attr("id", "id5")
    //     .append("g")
    //     .attr("transform", `translate(${margin.left}, ${margin.top})`);
    //   const myColor = d3.scaleOrdinal().range(d3.schemeSet2);
    //   const x = d3
    //     .scaleLinear()
    //     .domain(
    //       d3.extent(data, function (d) {
    //         return d.Cases;
    //       })
    //     )
    //     .nice()
    //     .range([0, width]);
    //   svg1
    //     .append("g")
    //     .attr("transform", `translate(0, ${height})`)
    //     .call(d3.axisBottom(x).ticks(7));

    //   const y = d3
    //     .scaleLinear()
    //     .domain([
    //       0,
    //       d3.max(data, function (d) {
    //         return +d.count;
    //       }),
    //     ])
    //     .nice()
    //     .range([height, 0]);
    //   svg1.append("g").call(d3.axisLeft(y));
    //   const line = svg1
    //     .append("g")
    //     .append("path")
    //     .datum(data)
    //     .attr(
    //       "d",
    //       d3
    //         .line()
    //         .x(function (d) {
    //           return x(d.Cases);
    //         })
    //         .y(function (d) {
    //           return y(d.count);
    //         })
    //     )
    //     .attr("stroke", "#E74C3C")
    //     .style("stroke-width", 4)
    //     .style("fill", "none");

    //   document.getElementById("details").innerHTML =
    //     "<b>Total Crimes: " +
    //     namecity[i.properties.Community] +
    //     ", Neighbourhood: " +
    //     [i.properties.Community];
    // });
    var legend = svg
      .selectAll(".legend")
      .data(headers.slice())
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function (d, i) {
        return "translate(-20," + i * 20 + ")";
      });
    legend
      .append("rect")
      .attr("x", 400)
      .attr("width", 25)
      .attr("height", 17)
      .style("fill", colorScale);
    legend
      .append("text")
      .attr("x", 400)
      .attr("y", 20)
      .style("text-anchor", "end")
      .text(function (d) {
        return d;
      });
  });
});
