// var margin = {top: 20, right: 20, bottom: 30, left: 40},
//     width = 1000 - margin.left - margin.right,
//     height = 600 - margin.top - margin.bottom;


// var x = d3.scale.ordinal()
//     .rangeRoundBands([0, 600], .1);

var y = d3.scale.linear()
    .range([600,0]);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("body").append("svg")
    .attr("width","1000")
    .attr("height","800")
    .style("margin-left","100px")
  .append("g")
    .attr("transform", "translate(80,20)");


d3.json("./juice_orders", function(error, data) {
  var totalItem = _.map(data,"drinkName");
  var uniqueCount = _.countBy(totalItem, _.identity);
  var onlyJuices = _.omit(uniqueCount, ["CTL","ctl","Register User"]);

  var juices = [];

  _.forIn(onlyJuices, function(value, key) {
    var juice = {};
    juice.drinkName = key;
    juice.totalOrders = value;
    juices.push(juice);
  });

  // x.domain(juices.map(function(d) { return d.drinkName; }));
  y.domain([0, d3.max(juices, function(d) { return d.totalOrders; })]);

  console.log(d3.max(juices, function(d) { return d.totalOrders; }));

  // svg.append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0,800)")


  svg.append("g")
      .attr("class", "y-axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".75em")
      .style("text-anchor", "end")
      .text("totalOrders");

  // svg.selectAll(".juiceBar")
  //     .data(juices)
  //   .enter().append("rect")
  //     .attr("class", "juiceBar")
  //     .attr("width", x.rangeBand())
  //     .attr("height", function(d) { return 800 - y(d.totalOrders);})
  //     .attr("x", function(d) { return x(d.drinkName); })
  //     .attr("y", function(d) { return y(d.totalOrders); })
  //       .on('mouseover',function() {
  //         d3.select(this).append("svg:title")
  //         .text(function(d) {return d.drinkName +": "+d.totalOrders;})
  //       })

        var line = svg
                              .selectAll(".juiceBar")
                              .data(juices)
                              .enter()
                              .append("line")
                              .attr("class", "juiceBar")
                              .attr("x1", function(d,i){ return 50 + (i*22)+5 ; })
                              .attr("y1", function(d) { return 600; })
                              .attr("x2", function(d,i){ return 50 + (i*22)+5 ;})
                              .attr("y2", function(d){ return 600 - y(d.totalOrders);})
                              .style("stroke-width","20")
                              .style("stroke","steelblue")
                              .attr("fill","steelblue");
});
