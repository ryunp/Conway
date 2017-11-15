function Board(rootEl, grid, view) {

	this.rootEl = rootEl;
	this.grid = grid;
	this.view = view;
}


Board.prototype.setView = function(view) {
	 
	this.view = view;
};


Board.prototype.init = function() {

	this.view.init(this.rootEl, this.grid);
};


Board.prototype.randomize = function() {

	this.grid.fill(randomGenerator([false, true]));

    function randomGenerator(values) {
        return function generate() {
            return values[Math.floor(Math.random() * values.length)];
        };
    }
};

Board.prototype.clear = function() {

	while (this.rootEl.firstChild)
		this.rootEl.removeChild(this.rootEl.firstChild);
};


Board.prototype.update = function() {
	 
	this.view.update(this.rootEl, this.grid);
};