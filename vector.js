/**
 * Data type for cartesian coordinates
 * @param {Integer} x
 * @param {Integer} y
 */
function Vector(x, y) {

  this.x = x;
  this.y = y;
}

Vector.prototype.plus = function(other){
   
   return new Vector(this.x + other.x, this.y + other.y);
};