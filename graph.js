// d3.json("juice_orders", function(data) {
//     console.log(data.length);
// });
var data = [4, 8, 15, 16, 23, 42];

d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d * 10 + "px"; })
    .text(function(d) { console.log(d);return d; });
