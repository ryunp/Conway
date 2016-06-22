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
		var grid = new Grid(45, 30);
		
		scene = new Scene(el, grid,	Views.checkbox);
		
		randomizeGridData(scene.grid);
		scene.init();
		scene.update();
	}


	function initUI() {
	
		var viewSelect = document.querySelector('#viewSelection');

		document.querySelector('#start').addEventListener('click', start);
		document.querySelector('#stop').addEventListener('click', stop);
		document.querySelector('#next').addEventListener('click', turn);
		document.querySelector('#reset').addEventListener('click', resetGrid);
		document.querySelector('#fpsSlider').addEventListener('input', e => updateFps(e.target.value));
		viewSelect.addEventListener('change', viewSelectChanged);

		for (var view in Views)
			viewSelect.insertAdjacentHTML('beforeend', `<option value=${view}>${view}</option>`);
		
		updateFps(fps);
	}
}



/**
 * Display
 */

function viewSelectChanged(e) {

	scene.clear();
	scene.setView(Views[e.target.value]);
	scene.init();
	scene.update();
}


function resetGrid() {

	randomizeGridData(scene.grid);
	scene.update();
}



/*
 * Timing
 */

var timer, prevTime, refreshInterval;


function start() {

	if (! timer)
		lifeLoop();
}


function stop() {

	cancelAnimationFrame(timer);
	timer = null;
}


function turn() {

	Conway.nextGeneration(grid);
	view.update(grid);
}


function lifeLoop(timeStamp) {

	if (!prevTime)
		prevTime = timeStamp;

	if (timeStamp - prevTime > refreshInterval) {

		//turn();
		Conway.nextGeneration(scene.grid);		
		scene.update();
		prevTime = timeStamp;
	}
	
	timer = requestAnimationFrame(lifeLoop);
}


function updateFps(newFps) {

	fps = newFps;
	refreshInterval = 1000 / fps;
	document.querySelector('#fpsData').textContent = newFps;
}



/**
 * Misc
 */

function randomizeGridData(grid) {

	grid.fill( () => randomElement([false, true]) );

	function randomElement(array) {

		return array[Math.floor(Math.random() * array.length)];
	}
}