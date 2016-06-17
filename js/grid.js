/**
 * Object to encapsulate double dimension array and accessors
 * 
 * @param {int} width  Number of columns
 * @param {int} height Number of rows
 */
function Grid(width, height) {

  this.width = width;
  this.height = height;
  this.space = new Array(height);

  for (var i = 0; i < this.height; i++)
    this.space[i] = new Array(width);
}


/**
 * Unused enumeration for cell states
 * @type {Object}
 */
Grid.States = {
  'DEAD': false,
  'ALIVE': true
};


/**
 * Set cell value
 * @param {Vector} vector X,Y coordinate object
 * @param {value} value   New value for cell
 */
Grid.prototype.set = function set(vector, value) {

  this.space[vector.y][vector.x] = value;
};


/**
 * Get cell value
 * @param  {Vector} vector X,Y coordinate object
 * @return {boolean}       Value of cell
 */
Grid.prototype.get = function get(vector) {

  return this.space[vector.y][vector.x];
};


/**
 * Switches cell's state true/false
 * 
 * @param  {Vector} vector X,Y coordinate object
 * @return {boolean}       The value after toggling
 */
Grid.prototype.toggle = function toggle(vector) {

  var state = this.get(vector);
  var newState = !state;
  
  this.set(vector, newState);

  return newState;
}


/**
 * Iterates through each cell assigning given function's return value
 * 
 * @param  {Function} fn  Function to set cells' value
 * @param  {Object}   ctx Context for 'this'
 */
Grid.prototype.fill = function fill(fn, ctx) {

  try {

    for (var y = 0; y < this.height; y++)
      for (var x = 0; x < this.width; x++)
        this.space[y][x] = fn.call(ctx);
  
  } catch (e) {

    console.log(e);
  }
};


/**
 * Iterates through each cell and calls a given function with cell value and 
 * coordinate vector as arguments
 * 
 * @param  {Function} fn  Function to call on each cell
 * @param  {Object}   ctx Context for 'this'
 */
Grid.prototype.forEach = function forEach(fn, ctx) {

  try {

    for (var y = 0; y < this.height; y++)
      for (var x = 0; x < this.width; x++)
        fn.call(ctx, this.space[y][x], new Vector(x, y));
      
  } catch (e) {

    console.log(e);
  }

};


/**
 * Count number true value cells within 1 block radius including diagonals
 * 
 * @param  {Vector} vector X,Y coordinate object
 * @return {int}           Count of neighboring cells with true values
 */
Grid.prototype.neighbors = function neighbors(vector) {

  var count = 0;

  for (var yOffset = -1; yOffset <= 1; yOffset++) {
    for (var xOffset = -1; xOffset <= 1; xOffset++) {

      // Skip out of array bounds
      if ((vector.y + yOffset) < 0 || this.height <= (vector.y + yOffset) ||
          (vector.x + xOffset) < 0 || this.width <= (vector.x + xOffset))
        continue;

      // Skip self
      if (xOffset == 0 && yOffset == 0)
        continue;


      if (this.space[vector.y + yOffset][vector.x + xOffset] == Grid.States.ALIVE)
        count++;
    }
  }

  return count;
};