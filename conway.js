/**
 * Rules for conway's GoL
 * @type {Object}
 */
var Conway = {

  /**
   * Provides the next step of life
   * @param  {Grid} curGen Grid object
   * @return {Grid}        Same Grid object given
   */
  nextGeneration: function nextGeneration(curGen) {

    var nextGen = new Grid(curGen.width, curGen.height);

    curGen.forEach( (state, vector) => {

      var neighbors = curGen.neighbors(vector);

      // Stay alive or revive if 3 neighbors
      if (neighbors == 3) {
        nextGen.set(vector, Grid.States.ALIVE);
        return;
      }

      // Stay alive if 2 neighbors
      if (state == Grid.States.ALIVE && (neighbors == 2)) {
        nextGen.set(vector, Grid.States.ALIVE);
        return;
      }

      // Stay dead or die
      nextGen.set(vector, Grid.States.DEAD);
    });

    curGen.space = nextGen.space;
  }
};