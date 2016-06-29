/* Refactor without D3:
 * http://www.jeromecukier.net/blog/2015/05/19/you-may-not-need-d3/
 *
 * Really only using D3 for selections. Can do fine without it.
 */

var scene;
var fps = 20;

/**
 * Init
 */

function init() {


	initScene();
	initUI();


	function initScene() {

		var el = document.querySelector('#display');
		var grid = new Grid(60, 60);
		
		scene = new Scene(el, grid,	Views.circle);
		scene.randomize();

		scene.init();
		scene.update();
	}


	function initUI() {
	
		var viewSelect = document.querySelector('#viewSelection');

		document.querySelector('#start').addEventListener('click', start);
		document.querySelector('#stop').addEventListener('click', stop);
		document.querySelector('#next').addEventListener('click', step);
		document.querySelector('#reset').addEventListener('click', onReset);
		document.querySelector('#fpsSlider').addEventListener('input', onFpsSlider);
		viewSelect.addEventListener('change', onViewSelection);

		for (var view in Views)
			viewSelect.insertAdjacentHTML('beforeend', `<option value=${view}>${view}</option>`);
		
		updateFps(fps);
	}
}



/**
 * UI handlers
 */

function onFpsSlider(e) {

	updateFps(e.target.value);
}

function onViewSelection(e) {

	scene.clear();
	scene.setView(Views[e.target.value]);
	scene.init();
	scene.update();
}


function onReset(e) {

	scene.randomize();
	scene.update();
}



/*
 * Timing
 */

var timer, prevTime, refreshInterval;


function start() {

	if (! timer)
		stepLoop();
}


function stop() {

	cancelAnimationFrame(timer);
	timer = null;
}


function step() {

	Conway.nextGeneration(scene.grid);		
	scene.update();
}


function stepLoop(timeStamp) {

	if (!prevTime)
		prevTime = timeStamp;

	if (timeStamp - prevTime > refreshInterval) {

		step();
		prevTime = timeStamp;
	}
	
	timer = requestAnimationFrame(stepLoop);
}


function updateFps(newFps) {

	fps = newFps;
	refreshInterval = 1000 / fps;
	document.querySelector('#fpsData').textContent = newFps;
}