/**
 * Rules for conway's GoL
 * @type {Object}
 */
var Conway = {

  'States': {
    'ALIVE': true,
    'DEAD': false
  },

  /**
   * Provides the next step of life
   * @param  {Grid}  Gameboard's Grid object
   * @return {Grid}  Same gameboard with updated grid
   */
  nextGeneration: function nextGeneration(curGrid) {

    var newGrid = new Grid(curGrid.width, curGrid.height);

    curGrid.forEach( function(state, vector) {

      var neighborsAlive = countNeighbors(curGrid, vector, 1);

      // Stay alive or revive if 3 neighbors
      if (neighborsAlive == 3) {
        newGrid.set(vector, Conway.States.ALIVE);
        return;
      }

      // Stay alive if 2 neighbors
      if (state == Conway.States.ALIVE && (neighborsAlive == 2)) {
        newGrid.set(vector, Conway.States.ALIVE);
        return;
      }

      // Stay dead or die
      newGrid.set(vector, Conway.States.DEAD);
    });

    curGrid.space = newGrid.space;


    /**
     * Counts alive neighbors within radius including diagonals
     * 
     * @param  {Grid}  grid  Grid object
     * @param  {Vector}  vector  X,Y coordinate object
     * @return {int}  Number of alive neighbors
     */
    function countNeighbors(grid, vector, radius) {

      return grid.getNeighbors(vector, radius).reduce(countAlive, 0);

      function countAlive(total, state) {
        return total + (state == Conway.States.ALIVE ? 1 : 0);
      }
    }
  }
};