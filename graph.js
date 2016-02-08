d3.json("juice_orders", function(data) {
    var quantity = {};
    for(var i = 0; i < data.length; i++){
        var drink = data[i];
        if(quantity[drink.drinkName] === undefined)
            quantity[drink.drinkName] = drink.quantity;
        else
            quantity[drink.drinkName] += drink.quantity;
    }

    var scale = d3.scale.linear()
                        .domain([0,1000])
                        .range([0,600]);

    var drinkNames = Object.keys(quantity);

    d3.select(".chart")
    .selectAll("div")
    .data(drinkNames)
    .enter()
    .append("div")
    .style("width", function(d) { return scale(quantity[d])+'px'; })
});
