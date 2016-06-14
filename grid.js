function Grid(width, height) {

  this.width = width;
  this.height = height;
  this.space = new Array(height);

  for (var i = 0; i < this.height; i++)
    this.space[i] = new Array(width);
}

Grid.STATES = {
  'dead': 0,
  'alive': 1
};


Grid.prototype.set = function set(vector, value) {

  this.space[vector.y][vector.x] = value;
};


Grid.prototype.get = function get(vector) {

  return this.space[vector.y][vector.x];
};

Grid.prototype.toggle = function toggle(vector) {

  var state = this.get(vector);
  var newState = !state;
  
  this.set(vector, newState);

  return newState;
}


// Uses callback return to set values
Grid.prototype.fill = function fill(filler) {

  try {

    for (var y = 0; y < this.height; y++)
      for (var x = 0; x < this.width; x++)
        this.space[y][x] = filler();
  
  } catch (e) {

    console.log(e);
  }
};


Grid.prototype.forEach = function forEach(fn, ctx) {

  try {

    for (var y = 0; y < this.height; y++)
      for (var x = 0; x < this.width; x++)
        fn.call(ctx, this.grid[y][x], new Vector(x, y));
      
  } catch (e) {

    console.log(e);
  }

};

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


      if (this.space[vector.y + yOffset][vector.x + xOffset] == 1)
        count++;
    }
  }

  return count;
};