var board, timer, prevTime, fps, areaLimit = 10000;

function init() {
	// Board
	var el = document.querySelector('#display');
	var grid = new Grid(60, 30);
	
	board = new Board(el, grid,	Views.circle);
	board.reset();


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
	
	document.querySelector('#gridWidth').addEventListener('blur', onGridWidth);
	document.querySelector('#gridHeight').addEventListener('blur', onGridHeight);

	updateFps(20);
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
	board.randomize([false, true]);
	board.update();
}

function onGridWidth(e) {
	const newWidth = e.target.value;
	const area = newWidth * board.grid.height;

	if (newWidth != board.grid.width) {
		if ((area > 0) && (area <= areaLimit)) {
			board.setGrid(new Grid(newWidth, board.grid.height));
			board.reset();
		} else {
			e.target.value = board.grid.width;
			console.log(`Area limited to 1 - ${areaLimit}, ${area} is outside range.`);
		}
	}
}

function onGridHeight(e) {
	const newHeight = e.target.value;
	const area = board.grid.width * newHeight;

	if (newHeight != board.grid.height) {
		if ((area > 0) && (area <= areaLimit)) {
			board.setGrid(new Grid(board.grid.width, newHeight));
			board.reset();
		} else {
			e.target.value = board.grid.height;
			console.log(`Area limited to 1 - ${areaLimit}, ${area} is outside range.`);
		}
	}
}



/*
 * Timing
 */

function start() {
	if (!timer)
		stepLoop();
}

function stop() {
	if (timer) {
		cancelAnimationFrame(timer);
		timer = null;
	}
}

function step() {
	stop();
	Conway.nextGeneration(board.grid);
	board.update();
}

function stepLoop(timeStamp) {
	if (!prevTime)
		prevTime = timeStamp;

	var delta = timeStamp - prevTime;
	var spf = 1000 / fps;
	if (delta > spf) {

		step();
		prevTime = timeStamp;
	}
	
	timer = requestAnimationFrame(stepLoop);
}

function updateFps(newFps) {
	fps = newFps;
	document.querySelector('#fpsData').textContent = newFps;
}
