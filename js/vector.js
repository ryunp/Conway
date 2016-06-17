/**
 * Data type for 2D cartesian coordinates
 * @param {int} x Horizonal plane
 * @param {int} y Vertical plane
 */
function Vector(x, y) {

  this.x = x;
  this.y = y;
}


/**
 * Add two Vector objects returning a new Vector object
 * 
 * @param  {Vector} other X,Y coordinate object
 * @return {Vector}       X,Y coordinate object
 */
Vector.prototype.plus = function(other){
   
   return new Vector(this.x + other.x, this.y + other.y);
};