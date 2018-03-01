function Board(rootEl, grid, view) {

	this.rootEl = rootEl;
	this.grid = grid;
	this.view = view;
}


Board.prototype.setView = function(view) {
	this.view = view;
};

Board.prototype.setGrid = function(grid) {
    this.grid = grid;
}

Board.prototype.init = function() {
	this.view.init(this.rootEl, this.grid);
};

Board.prototype.randomize = function(values) {
	this.grid.fill(chooseRandom.bind(null, values));

    function chooseRandom(array) {
        return array[Math.floor(Math.random() * array.length)];
    };
};

Board.prototype.clear = function() {
	while (this.rootEl.firstChild)
		this.rootEl.removeChild(this.rootEl.firstChild);
};

Board.prototype.update = function() {
	this.view.update(this.rootEl, this.grid);
};

Board.prototype.reset = function() {
    this.clear();
    this.init();
    this.randomize([false, true]);
    this.update();
}