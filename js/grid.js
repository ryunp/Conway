/**
 * Object to encapsulate double dimension array and accessors
 * 
 * @param {int}  width  Number of columns
 * @param {int}  height  Number of rows
 */
function Grid(width, height) {

  this.width = width;
  this.height = height;
  this.space = new Array(height).fill(new Array(width));
}


/**
 * Set cell value
 * @param {Vector}  vector  X,Y coordinate object
 * @param {value}  value   New value for cell
 */
Grid.prototype.set = function set(vector, value) {

  if (! this.isInside(vector))
    return null;

  this.space[vector.y][vector.x] = value;
};


/**
 * Get cell value
 * @param  {Vector}  vector  X,Y coordinate object
 * @return {boolean}  Value of cell
 */
Grid.prototype.get = function get(vector) {

  if (! this.isInside(vector))
    return null;

  return this.space[vector.y][vector.x];
};


/**
 * Aggregate neighboring values
 * @param  {Vector}  vector  Coordinates
 * @param  {int}  radius  Depth of tessellation
 * @return {Array}  List of neighboring values
 */
Grid.prototype.getNeighbors = function getNeighbors(vector, radius) {

  var neighbors = [];

  for (var yOffset = -radius; yOffset <= radius; yOffset++) {
    for (var xOffset = -radius; xOffset <= radius; xOffset++) {

      if (xOffset == 0 && yOffset == 0)
        continue;

      var value = this.get( new Vector(vector.x + xOffset, vector.y + yOffset) );

      if (value != undefined)
        neighbors.push(value);
    }
  }

  return neighbors;
}


/**
 * Iterates through each cell assigning given function's return value
 * 
 * @param  {Function}  fn  Function to set cells' value
 * @param  {Object}   ctx  Context for 'this'
 */
Grid.prototype.fill = function fill(fn, ctx) {

  for (var y = 0; y < this.height; y++)
    for (var x = 0; x < this.width; x++)
      this.space[y][x] = fn.call(ctx);
};


/**
 * Iterates through each cell and calls a given function with cell value and 
 * coordinate vector as arguments
 * 
 * @param  {Function}  fn  Function to call on each cell
 * @param  {Object}  ctx  Context for 'this'
 */
Grid.prototype.forEach = function forEach(fn, ctx) {

  for (var y = 0; y < this.height; y++)
    for (var x = 0; x < this.width; x++)
      fn.call(ctx, this.space[y][x], new Vector(x, y));
};


/**
 * Checks if coordinates are within grid bounds
 * @param  {Vector} vector  X,Y coordinate object
 * @return {boolean}           true or false
 */
Grid.prototype.isInside = function(vector) {

  return vector.x >= 0 && vector.x < this.width &&
    vector.y >= 0 && vector.y < this.height;
};