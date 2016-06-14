/* https://github.com/gruiz17/explosions */
$(document).ready(function() {
	setEventHandler('miniworks', 'mousemove');
	setEventHandler('hexagon', 'mousedown');
	$("#mousemoveSelector").change(function() {
		setEventHandlerFromMenuOption(this, 'mousemove');
	});
	$("#mousedownSelector").change(function() {
		setEventHandlerFromMenuOption(this, 'mousedown');
	});
});

function doVisual(visualName, fmx, fmy, timeScale) {
	if (!timeScale) timeScale=1;
	var w = window.innerWidth,
		h = window.innerHeight;
	var visual = visuals[visualName];
	return visual(w * fmx, h * fmy, w, h, timeScale);
}
function setEventHandler(visualName, eventName) {
	svg.on(eventName, mouseHandler(visualName));
}
function setEventHandlerFromMenuOption(element, eventName) {
	var visualName = element.value;
	setEventHandler(visualName, eventName);
}
function mouseHandler(visualName) {
	return function() {
		var m = d3.mouse(svg[0][0]);
		var w = window.innerWidth, h = window.innerHeight;
		var fmx = m[0]/w, fmy = m[1]/h;
		//if (window.recorder) {recorder.record([visualName, fmx, fmy]);}
		return doVisual(visualName, fmx, fmy);
	};
}
function getTimeScale() {
	return parseFloat( $('#input-play-timescale').val() ) || 1;
}

visuals = {
	circlereverse: function(mx, my, h, w, timeScale) {
		svg.append("svg:circle")
			.attr("cx",mx).attr("cy",my).attr("r",w/2).style("stroke",colors(++ci))
			.transition().duration(timeScale*500).attr("r",0).style("stroke-opacity",1e-6).remove();
	},
	//...
}
