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
   * @param  {Grid} curGen Grid object
   * @return {Grid}        Same Grid object given
   */
  nextGeneration: function nextGeneration(curGen) {

    var nextGen = new Grid(curGen.width, curGen.height);

    curGen.forEach( (state, vector) => {

      var neighborCount = countNeighbors(curGen, vector, 1);

      // Stay alive or revive if 3 neighbors
      if (neighborCount == 3) {
        nextGen.set(vector, Conway.States.ALIVE);
        return;
      }

      // Stay alive if 2 neighbors
      if (state == Conway.States.ALIVE && (neighborCount == 2)) {
        nextGen.set(vector, Conway.States.ALIVE);
        return;
      }

      // Stay dead or die
      nextGen.set(vector, Conway.States.DEAD);
    });

    curGen.space = nextGen.space;


    /**
     * Counts alive neighbors within radius including diagonals
     * 
     * @param  {Grid}   grid   Grid object
     * @param  {Vector} vector X,Y coordinate object
     * @return {int}           Number of alive neighbors
     */
    function countNeighbors(grid, vector, radius) {

      var count = 0;

      for (var yOffset = -radius; yOffset <= radius; yOffset++) {
        for (var xOffset = -radius; xOffset <= radius; xOffset++) {

          if (xOffset == 0 && yOffset == 0)
            continue;

          var neighbor = new Vector(vector.x + xOffset, vector.y + yOffset);

          if (grid.get(neighbor) == Conway.States.ALIVE)
            count++;
        }
      }

      return count;
    }
  }
};