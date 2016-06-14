/* Refactor without D3:
 * http://www.jeromecukier.net/blog/2015/05/19/you-may-not-need-d3/
 *
 * Really only using D3 for selections. Can do fine without it.
 */

var sideLength = 30;
var fps = 20;
var grid = new Grid(sideLength, sideLength);


/**
 * Init
 */

function init() {

  randomizeData();
  changeRendering('checkbox'); // init view 


  /**
   * UI Binding
   */

  var gridDisplay = document.querySelector('#grid');
  document.querySelector('#start').addEventListener('click', start);
  document.querySelector('#stop').addEventListener('click', stop);
  document.querySelector('#next').addEventListener('click', turn);
  document.querySelector('#reset').addEventListener('click', randomizeData);
  var fpsSlider = document.querySelector('#fpsSlider');
  fpsSlider.addEventListener('input', (e) => updateFps(e.target.value));
  var fpsData = document.querySelector('#fpsData');
  updateFps(fps);

  var viewSelect = document.querySelector('#viewSelection');
  viewSelect.addEventListener('change', (e) => changeRendering(e.target.value));

  // Add views to dropdown
  for (var view in Views)
    viewSelect.insertAdjacentHTML('beforeend', '<option>' + view + '</option>');

}



/**
 * Display
 */

function changeRendering(type) {

  view = Views[type];
  d3.select('#display').selectAll('*').remove();
  view.init('#display', grid);
  view.update('#display', grid);
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

  grid = Conway.nextGeneration(grid);
  view.update('#display', grid);
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
  fpsData.textContent = newFps;
}



/**
 * Misc
 */

function randomizeData() {

  grid.fill( () => randomElement([false, true]) );
  console.log('s:', grid.space);


  // Helper
  function randomElement(array) {

    return array[Math.floor(Math.random() * array.length)];
  }
}


