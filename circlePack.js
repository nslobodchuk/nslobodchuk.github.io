
  function CirclePack(width, height){

    this.width_ = width;
    this.height_ = height;

  }

  CirclePack.prototype =
  {
    width: function(value){

    if (!arguments.length) return this.width_;
    this.width_ = value;
    //if(this.svgAppened()) this.updateWidthHeight();
    return this;
    },

    height: function(value){

    if (!arguments.length) return this.height_;
    this.height_ = value;
    //if(this.svgAppened()) this.updateWidthHeight();
    return this;
    },

    zoomAnalysis: function(){

      var width = this.width();
      var height = this.height();
      var packWidth = packHeight = 2000;

      var node= this.sectionCircles["dataAnalysis"];

      d3.select('.assets').select('g').transition()
    .duration(1000).attr("transform", "translate(0,0) scale("+Math.min(width, height)/packWidth+")")
    .transition()
    .duration(1000)
    .attr("transform", "translate("+(-node.x+node.r*Math.max(width/height,1))*(Math.min(width, height)/(node.r*2))+","+ (-node.y+node.r*Math.max(height/width,1))*(Math.min(width, height)/(node.r*2))+") scale("+(Math.min(width, height)/(node.r*2)) +")")
    ;

    },

    zoomVis: function(){

      var width = this.width();
      var height = this.height();
      var packWidth = packHeight = 2000;

      var sectionCircles = this.sectionCircles;

      d3.select(".scatterplot").remove();




      var random1 = d3.randomNormal(10, 5);
    var random2 = d3.randomNormal(0, 4);

    var points = d3.range(100).map(function() { 
      var x = random1();
      var y = 2+0.6*x+random2();
      return [x, y]; });

    var x = d3.scaleLinear().domain(d3.extent(points.map(function(d){return d[0];}))).range([0, sectionCircles["dataVis"].r*Math.sqrt(2)-100]);
    var y = d3.scaleLinear().domain(d3.extent(points.map(function(d){return d[1];}))).range([sectionCircles["dataVis"].r*Math.sqrt(2)-100, 0]);

    x.domain([x.domain()[0] - (x.domain()[1]-x.domain()[0])*0.1, x.domain()[1] + (x.domain()[1]-x.domain()[0])*0.1]);
    y.domain([y.domain()[0] - (y.domain()[1]-y.domain()[0])*0.1, y.domain()[1] + (y.domain()[1]-y.domain()[0])*0.1])

    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    var scatterplot = d3.select("#node-dataVis")
  .select(function(){return this.parentNode}).append("g").attr("class", "scatterplot")
    .attr("transform", function(d){return "translate("+(-d.r/(Math.sqrt(2)))+","+(-d.r/(Math.sqrt(2)))+")"})
    .append("g").attr("transform", "translate(50,50)");

    scatterplot.selectAll("circle")
  .data(points)
  .enter().append("circle")
  .style("opacity", 0.5)
    .attr("cx", function(d) { return x(d[0]); })
    .attr("cy", function(d) { return y(d[1]); })
    .attr("r", 0).transition().delay(function(d,i){return i*100;}).attr("r",15).transition().attr("r",10);

scatterplot.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + (sectionCircles["dataVis"].r*Math.sqrt(2) -100)+ ")")
    .style("font-size","20px")
    .call(xAxis.ticks(5));

scatterplot.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(0,0)")
    .style("font-size","20px")
    .call(yAxis.ticks(5));






      var node= this.sectionCircles["dataVis"];

      d3.select('.assets').select('g')
      .transition()
    .duration(1000).attr("transform", "translate(0,0) scale("+Math.min(width, height)/packWidth+")")
      .transition()
    .duration(1000).attr("transform", "translate("+(-node.x+node.r*Math.max(width/height,1))*(Math.min(width, height)/(node.r*2))+","+ (-node.y+node.r*Math.max(height/width,1))*(Math.min(width, height)/(node.r*2))+") scale("+(Math.min(width, height)/(node.r*2)) +")")
    ;

    },

    zoomProgramming: function(){

      var width = this.width();
      var height = this.height();
      var packWidth = packHeight = 2000;

      var node= this.sectionCircles["programming"];

      d3.select('.assets').select('g')
      .transition()
    .duration(1000)
    .attr("transform", "translate(0,0) scale("+Math.min(width, height)/packWidth+")")
      .transition()
    .duration(1000).attr("transform", "translate("+(-node.x+node.r*Math.max(width/height,1))*(Math.min(width, height)/(node.r*2))+","+ (-node.y+node.r*Math.max(height/width,1))*(Math.min(width, height)/(node.r*2))+") scale("+(Math.min(width, height)/(node.r*2)) +")")
    ;

    },

    zoomFinance: function(){

      var width = this.width();
      var height = this.height();
      var packWidth = packHeight = 2000;

      var node= this.sectionCircles["financialAnalysis"];

      d3.select('.assets').select('g')
      .transition()
    .duration(1000).attr("transform", "translate(0,0) scale("+Math.min(width, height)/packWidth+")")
      .transition()
    .duration(1000).attr("transform", "translate("+(-node.x+node.r*Math.max(width/height,1))*(Math.min(width, height)/(node.r*2))+","+ (-node.y+node.r*Math.max(height/width,1))*(Math.min(width, height)/(node.r*2))+") scale("+(Math.min(width, height)/(node.r*2)) +")")
    ;

    },

    scale1: function(){

      var width = this.width();
      var height = this.height();
      var packWidth = packHeight = 2000;


      d3.select('.assets').select('g')
      .transition()
    .duration(1000).attr("transform", "translate(0,0) scale("+Math.min(width, height)/packWidth+")")

    },

    rescale: function(width, height) {


      var packWidth = packHeight = 2000;

      this.width(width).height(height);

      d3.select('.assets').attr("width", width).attr("height", height);

      d3.select('.assets').select('g').attr("transform", "scale("+Math.min(width, height)/packWidth+ ")");


    },

    appendVis: function(){



var packWidth = 2000,
    packHeight = 2000,
    width = this.width(),
    height = this.height();

var format = d3.format(",d");



var stratify = d3.stratify()
    .parentId(function(d) {return d.parent; });

var pack = d3.pack()
    .size([packWidth, packHeight])
    .padding(1);


    var data = [
    {id:"circlePack", parent: null, value:null},
    {id: "dataAnalysis", parent:"circlePack", value:1, order:0, label: "Data Analysis"},
    {id: "dataVis", parent:"circlePack", value:1, order:1, label: "Data Visualization"},
    {id: "programming", parent:"circlePack", value:1, order:2, label: "Programming"},
    {id: "financialAnalysis", parent:"circlePack", value:1, order:2, label: "Financial Analysis"},
    {id: "R", parent:"programming", value:1/8, order:1, label: "R"},
    {id: "SAS", parent:"programming", value:1/8, order:2, label: "SAS"},
    {id: "Stata", parent:"programming", value:1/8, order:3, label: "Stata"},
    {id: "JavaScript", parent:"programming", value:1/8, order:4, label: "JavaScript"},
    {id: "d3js", parent:"programming", value:1/8, order:5, label: "d3.js"}
    ]

  var root = stratify(data)
      .sum(function(d) { return d.value; })
      .sort(function(a, b) { return a.order - b.order; });

  pack(root);

  //console.log(root.descendants());

  var node = d3.select("#graph")
  .append('svg').attr('class', 'assets')
  .attr("width", width).attr("height", height).append("g")
    .selectAll("g")
    .data(root.descendants())
    .enter().append("g")
      .attr("id",function(d) { return "group-" + d.id; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      .attr("class", function(d) { return "node" + (!d.children ? " node--leaf" : d.depth ? "" : " node--root"); })
      .each(function(d) { d.node = this; })
      .on("mouseover", hovered(true))
      .on("mouseout", hovered(false));

  node.append("circle")
      .attr("id", function(d) { return "node-" + d.id; })
      .attr("r", function(d) { return d.r; })
      .style('fill', 'none')
      .style('stroke','black')
      /*.style("fill", function(d) { return d3.interpolateViridis(d.depth/2); })*/;

      var sectionCircles = {};

      root.descendants().forEach(function(d){
        if(d.id==="dataAnalysis"|| d.id==="dataVis"|| d.id==="programming"|| d.id==="financialAnalysis"){
          sectionCircles[d.id] = d;
        }
    })

      this.sectionCircles = sectionCircles;
//console.log("sectionCircles");
//console.log(sectionCircles);





  var text1 = d3.select("#node-dataAnalysis")
  .select(function(){return this.parentNode})
  .append("g").append("text")
  .style("font-size", "140px")
  .attr("text-anchor", "middle")
  .attr("dy","40")
    .append("tspan")
    .text("(X'X)");
    text1.append("tspan")
    .attr("baseline-shift", "super")
    .text("-1");
    text1.append("tspan")
    .text("X'Y");


  var random1 = d3.randomNormal(10, 5);
    var random2 = d3.randomNormal(0, 4);

    var points = d3.range(100).map(function() { 
      var x = random1();
      var y = 2+0.6*x+random2();
      return [x, y]; });

    var x = d3.scaleLinear().domain(d3.extent(points.map(function(d){return d[0];}))).range([0, sectionCircles["dataVis"].r*Math.sqrt(2)-100]);
    var y = d3.scaleLinear().domain(d3.extent(points.map(function(d){return d[1];}))).range([sectionCircles["dataVis"].r*Math.sqrt(2)-100, 0]);

    x.domain([x.domain()[0] - (x.domain()[1]-x.domain()[0])*0.1, x.domain()[1] + (x.domain()[1]-x.domain()[0])*0.1]);
    y.domain([y.domain()[0] - (y.domain()[1]-y.domain()[0])*0.1, y.domain()[1] + (y.domain()[1]-y.domain()[0])*0.1])

    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    var scatterplot = d3.select("#node-dataVis")
  .select(function(){return this.parentNode}).append("g").attr("class", "scatterplot")
    .attr("transform", function(d){return "translate("+(-d.r/(Math.sqrt(2)))+","+(-d.r/(Math.sqrt(2)))+")"})
    .append("g").attr("transform", "translate(50,50)");

    scatterplot.selectAll("circle")
  .data(points)
  .enter().append("circle")
    .style("opacity", 0.5)
    .attr("cx", function(d) { return x(d[0]); })
    .attr("cy", function(d) { return y(d[1]); })
    .attr("r", 0).transition().delay(function(d,i){return i*100;}).attr("r",15).transition().attr("r",10);

scatterplot.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + (sectionCircles["dataVis"].r*Math.sqrt(2) -100)+ ")")
    .style("font-size","20px")
    .call(xAxis.ticks(5));

scatterplot.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(0,0)")
    .style("font-size","20px")
    .call(yAxis.ticks(5));


d3.selectAll("#node-R, #node-SAS, #node-Stata, #node-JavaScript, #node-d3js")
  .select(function(){return this.parentNode})
  .append("g")
  .append("text")
  .style("font-size","50px")
  .attr("text-anchor", "middle")
  .attr("dy","15")
  .text(function(d){return d.data.label});






var parseTime = d3.timeParse("%Y-%m-%d");

var x = d3.scaleTime()
    .range([0, 2*Math.PI]);

var y = d3.scaleLog()
    .range([0, sectionCircles["dataVis"].r]);

var line = d3.radialLine()
    .angle(function(d) { return x(d.Date); })
    .radius(function(d) { return y(d["Adj Close"]); });

var svg = d3.select("#node-financialAnalysis")
  .select(function(){return this.parentNode})
  .append("g");

d3.csv("table.csv", type1, function(error, data) {
  if (error) throw error;

  x.domain(d3.extent(data, function(d) { return d.Date; }));
  y.domain(d3.extent(data, function(d) { return d["Adj Close"]; }));

var yAxis = d3.axisLeft(y).ticks(null, "$");
//console.log(y.ticks())

svg.append("g")
.attr("transform", "translate(" + (0)+"," + (0) + ")")
.selectAll('.circle')
.data(y.ticks().map(function(d){return [d]}))
.enter()
.append("circle")
.attr("class", "circle")
.style('fill','none')
.style('stroke', 'black')
.attr("r", function(d){return y(d[0])});


  svg.append("g")
  .attr("transform", "translate(" + (0)+"," + (0) + ")")
  .append("g")
  .attr("transform", "rotate(45)")
      .attr("class", "axis axis--y")
      .style("font-size","20px")
      .call(yAxis)
      .append("g")
          .append("text")
          .style("font-size","20px")
      .attr("class", "axis-title")
      .attr("y", y(y.domain()[1]))
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");

  svg.append("g").attr("transform", "translate(" + 0 +"," + 0+ ")").append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);
});


d3.select('.assets').select('g').attr("transform", "scale("+Math.min(width, height)/packWidth+ ")");

function type1(d) {
  d.Date = parseTime(d.Date);
  d["Adj Close"] = +d["Adj Close"];
  return d;
}






function hovered(hover) {
  return function(d) {
    d3.selectAll(d.ancestors().map(function(d) { return d.node; })).classed("node--hover", hover);
  };
}


function type(d) {
  d.value = +d.value;
  return d;
}

setInterval(
  function(){},
  100
)

function updatePack(){
  data[1].value+=1;

}

//d3.select('.assets').select('g').transition().duration(1000).attr("transform", "translate(-200,-200) scale(0.2)")

/*var transition = d3.select('.assets').select('g');

for(node in sectionCircles){

  node= sectionCircles[node];


    transition = transition.transition()
    .delay(2000)
    .duration(1000).attr("transform", "translate("+(-node.x+node.r)*(width/(node.r*2))+","+ (-node.y+node.r)*(height/(node.r*2))+") scale("+(width/(node.r*2)) +")")
    .transition().delay(2000)
    .duration(1000).attr("transform", "translate(0,0) scale("+width/packWidth+")");


}*/

//this.zoomAnalysis();


var width1 = 600,
    height1 = 600;
var width2 = 100,
    height2 = 1;


/*d3.select('.assets').transition().duration(5000).attr("width", width1).attr("height", height1)
.transition().duration(5000).attr("width", width2).attr("height", height2);

d3.select('.assets').select('g')
.transition().duration(5000)
.attr("transform", "scale("+ Math.min(width1,height1)/Math.min(width, height) +")")
.transition().duration(5000)
.attr("transform", "scale("+ Math.min(width2,height2)/Math.min(width, height) +")")*/


function resize(width, height) {

  //var width0 = console.log(d3.select('.assets').node().getBoundingClientRect().width);
  //var height0 = console.log(d3.select('.assets').node().getBoundingClientRect().height);

  d3.select('.assets').attr("width", width).attr("height", height);

d3.select('.assets').select('g')
.attr("transform", "scale("+ Math.min(width,height)/600 +")");

}

//resize(width2,height2);




    }
  }



	//var circlePack = new CirclePack(600,600);

  //circlePack.appendVis();

  //circlePack.zoomAnalysis();
  //circlePack.rescale(300,300);
  //setTimeout(function(){circlePack.zoomVis()}, 6000);
