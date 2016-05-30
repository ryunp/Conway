// Settings
var size = 30;
var fps = 20;



// Conway logic
function nextGeneration(grid) {

  var newGrid = createGrid(grid[0].length, grid.length);

  for (var y = 0; y < newGrid.length; y++) {

    for (var x = 0; x < newGrid[0].length; x++) {

        var neighbors = neighborCount(grid, x, y);
        
        // Stay alive or revive if 3 beighbors
        if (neighbors == 3) {
          newGrid[y][x] = 1;
          continue;
        }

        // Stay alive if 2 neighbors
        if (grid[y][x] == 1 && (neighbors == 2)) {
          newGrid[y][x] = 1;
          continue;
        }

        // Stay dead or die
        newGrid[y][x] = 0;
    }
  }

  return newGrid; 
};



// UI Binding
var gridDisplay = document.querySelector("#grid");
document.querySelector("#start").addEventListener("click", start);
document.querySelector("#stop").addEventListener("click", stop);
document.querySelector("#next").addEventListener("click", turn);
document.querySelector("#reset").addEventListener("click", resetGrid);
var fpsSlider = document.querySelector("#fpsSlider");
fpsSlider.addEventListener("input", fpsSliderChanged);
var fpsData = document.querySelector("#fpsData");

updateFps(fps);



// Timing functionality
var timer, prevTime, refreshInterval;


function start() {

  if (! timer)
    requestAnimationFrame(turn);
}


function stop() {

  cancelAnimationFrame(timer);
  timer = null;
}


function turn(timeStamp) {

  if (!prevTime)
    prevTime = timeStamp;

  if (timeStamp - prevTime > refreshInterval) {

    grid = nextGeneration(captureGrid("#grid"));
    // grid = nextGeneration(grid);
    display(grid);

    prevTime = timeStamp;
    //console.log("render");
  } //else console.log("rest");
  
  timer = requestAnimationFrame(turn);

};


function updateFps(newFps) {

  fps = newFps;
  refreshInterval = 1000/fps;
  fpsData.textContent = newFps;
}

function fpsSliderChanged(e) {

  updateFps(e.target.value);
}



// Grid functionality
var grid = createGrid(size, size);
grid.forEach(array => fillArrayRandomly(array, [0,1]));
display(grid);


function createGrid(width, height) {

  var ddArray = new Array(height);

  for (var y = 0; y < height; y++)
    ddArray[y] = new Array(width);

  return ddArray;
}


function display(grid) {

  gridDisplay.innerHTML = gridToHTMLTable(grid);
}


function resetGrid() {

  grid.forEach(array => fillArrayRandomly(array, [0,1]));
  display(grid);
}


function captureGrid(nodeID) {

  var rows = document.querySelector(nodeID).querySelectorAll("tr");
  var newGrid = createGrid(grid[0].length, grid.length);

  Array.prototype.forEach.call(rows, (el, y) => {

    var cols = el.querySelectorAll("td");
    Array.prototype.forEach.call(cols, (el, x) => {
      
      newGrid[y][x] = el.firstChild.checked ? 1 : 0;
    });

  });

  return newGrid;
}


function neighborCount(grid, x, y){

  var count = 0;

  for (var yOffset = -1; yOffset <= 1; yOffset++) {
    for (var xOffset = -1; xOffset <= 1; xOffset++) {

      // Skip out of array bounds
      if ((y + yOffset) < 0 || grid.length <= (y + yOffset) ||
          (x + xOffset) < 0 || grid[0].length <= (x + xOffset))
        continue;

      // Skip self
      if (xOffset == 0 && yOffset == 0)
        continue;


      if (grid[y + yOffset][x + xOffset] == 1)
        count++;
    }
  }

  return count;
};


function gridToHTMLTable(grid) {

  // wtf gl
  return encloseHTML("table", grid.reduce( (prev, array) => {
    return prev + (encloseHTML("tr", array.reduce( (prev, state) => {
        return prev + encloseHTML("td", createCheckboxNode(state))
    }, "")))
  }, ""));
}



// Array helpers
function fillArrayRandomly(array, list) {

  for (var i = 0; i < array.length; i++)
    array[i] = randomArrayItem(list);
}


function randomArrayItem(array) {

  return array[Math.floor(Math.random() * array.length)];
}



// HTML helpers
function createCheckboxNode(state) {

  return '<input type="checkbox"' + (state ? ' checked' : '') + ">";
}


function encloseHTML(type, text) {

  return "<" + type + ">" + text + "</" + type + ">";
}