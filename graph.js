d3.json("juice_orders", function(data) {
    var quantity = {};


    for(var i = 0; i < data.length; i++){
        var drink = data[i];
        if(quantity[drink.drinkName] === undefined)
            quantity[drink.drinkName] = drink.quantity;
        else
            quantity[drink.drinkName] += drink.quantity;
    };

    delete(quantity.CTL);
    delete(quantity['Register User']);
    delete(quantity.ctl);

    var scale = d3.scale.linear()
                        .domain([10,6112])
                        .range([50,6112]);

    var drinkNames = Object.keys(quantity);

    var svgContainer = d3.select("body").append("svg")
                                            .attr("width", 1000)
                                            .attr("height", 800);

     var line = svgContainer
                              .selectAll("line")
                              .data(drinkNames)
                              .enter()
                              .append("line")
                              .attr("x1", function(d,i){ return 300 + (i*22)+5 ; })
                              .attr("y1", function(d,i) { return 600; })
                              .attr("x2", function(d,i){ return 300 + (i*22)+5 ;})
                              .attr("y2", function(d){ return 600 - scale(quantity[d]/15);})
                              .style("stroke-width","20")
                              .style("stroke","steelblue")
                              .attr("fill","steelblue");

});
