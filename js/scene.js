function Scene(rootEl, grid, view) {

	this.rootEl = rootEl;
	this.grid = grid;
	this.view = view;
}


Scene.prototype.setView = function(view) {
	 
	this.view = view;
};


Scene.prototype.init = function() {

	this.view.init(this.rootEl, this.grid);
};


Scene.prototype.clear = function() {

	while (this.rootEl.firstChild)
		this.rootEl.removeChild(this.rootEl.firstChild);
};


Scene.prototype.update = function() {
	 
	this.view.update(this.rootEl, this.grid);
};