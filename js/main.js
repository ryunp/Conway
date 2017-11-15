var board, timer, prevTime, refreshInterval, fps = 20;


function init() {

	// Board
	var el = document.querySelector('#display');
	var grid = new Grid(60, 60);
	
	board = new Board(el, grid,	Views.circle);
	board.randomize();

	board.init();
	board.update();


	// UI
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



/**
 * UI handlers
 */

function onFpsSlider(e) {

	updateFps(e.target.value);
}

function onViewSelection(e) {

	board.clear();
	board.setView(Views[e.target.value]);
	board.init();
	board.update();
}


function onReset(e) {

	board.randomize();
	board.update();
}



/*
 * Timing
 */

function start() {

	if (! timer)
		stepLoop();
}


function stop() {

	cancelAnimationFrame(timer);
	timer = null;
}


function step() {

	Conway.nextGeneration(board.grid);		
	board.update();
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