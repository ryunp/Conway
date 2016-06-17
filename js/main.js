/* Refactor without D3:
 * http://www.jeromecukier.net/blog/2015/05/19/you-may-not-need-d3/
 *
 * Really only using D3 for selections. Can do fine without it.
 */

var sideLength = 30;
var fps = 20;
var grid = new Grid(sideLength * 1.5, sideLength);


/**
 * Init
 */

function init() {

  console.log(Views);
  randomizeGridData(grid);
  initUI();
  updateFps(fps);

  // Update inital display
  setView('checkbox');



  function initUI() {
  
    var viewSelect = document.querySelector('#viewSelection');

    document.querySelector('#start').addEventListener('click', start);
    document.querySelector('#stop').addEventListener('click', stop);
    document.querySelector('#next').addEventListener('click', turn);
    document.querySelector('#reset').addEventListener('click', reset);
    document.querySelector('#fpsSlider').addEventListener('input', (e) => updateFps(e.target.value));
    viewSelect.addEventListener('change', (e) => setView(e.target.value));

    for (var view in Views)
      viewSelect.insertAdjacentHTML('beforeend', '<option>' + view + '</option>');
  }
}



/**
 * Display
 */

function setView(type) {

  view = Views[type];
  d3.select('#display').selectAll('*').remove();
  view.init('#display', grid);
  view.update(grid);
}

function reset() {

  randomizeGridData(grid);
  view.update(grid);  
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

    turn();
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