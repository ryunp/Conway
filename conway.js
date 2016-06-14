var Conway = {

  nextGeneration: function nextGeneration(grid) {

  var newGrid = new Grid(grid.width, grid.height);

  for (var y = 0; y < newGrid.height; y++) {
    for (var x = 0; x < newGrid.width; x++) {

        var v = new Vector(x, y);
        var neighbors = grid.neighbors(v);

        // Stay alive or revive if 3 beighbors
        if (neighbors == 3) {
          newGrid.set(v, true);
          continue;
        }

        // Stay alive if 2 neighbors
        if (grid.get(v) == true && (neighbors == 2)) {
          newGrid.set(v, true);
          continue;
        }

        // Stay dead or die
        newGrid.set(v, false);
      }
    }

    grid.space = newGrid.space;

    return grid; 
  }
};