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
                        .domain([0,1000])
                        .range([10,100]);

    var drinkNames = Object.keys(quantity);

    var svgContainer = d3.select("body").append("svg")
                                            .attr("width", 1500)
                                            .attr("height", 1000);

    var text = svgContainer.selectAll("text")
                            .data(drinkNames)
                            .enter()
                            .append("text")
                            .attr("x","10px")
                            .attr("y",function(y,i){ return (i*16)+11+'px' ;})
                            .attr("font-size","14px")
                            .text(function(text){ return text; });

    var rectangle = svgContainer
                             .selectAll("rect")
                             .data(drinkNames)
                             .enter()
                             .append("rect")
                             .attr("x", '155px')
                             .attr("y", function(y,i){ return i*16+'px' ;})
                             .attr("width", function(d) { return scale(quantity[d])+'px'; })
                             .attr("height", '15px')
                             .attr("text-align", 'right')
                             .attr("fill","steelblue");

});
