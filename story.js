var sections = [];


d3.selectAll(".section").each(function(d,i){sections[i]=this;})




 	var story = new CirclePack(400,400);
  	//story.element = "#graph";

  	story.appendVis();


	var transitions = {
		0: function() {story.zoomAnalysis();},
		1: function() {story.zoomVis();},
		2: function() {story.zoomProgramming();},
		3: function() {story.zoomFinance();},
		inactiveTransition: function(){ story.scale1()},
		resize: function(width, height) { story.rescale(width, height);}
	}


var scr = new Scroll(document.getElementById('container'), sections, document.getElementById('graph'), transitions);



