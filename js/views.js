var Views = Views || {};


Views.circle = (function() {
	var cellSize = 10;
	var radius = cellSize/2;

	
	function init(rootEl, grid) {
		var svgNS = "http://www.w3.org/2000/svg";

		// Create base SVG element
		baseEl = document.createElementNS(svgNS, "svg");
		baseEl.setAttribute('width', radius * 2 * grid.width);
		baseEl.setAttribute('height', radius * 2 * grid.height);

		// Create cells
		for (var y = 0; y < grid.height; y++) {
			// Group in SVG:G baseEls
			var g = document.createElementNS(svgNS, "g");

			for (var x = 0; x < grid.width; x++) {

				var circle = document.createElementNS(svgNS, "circle");

				circle.setAttribute('r', radius);
				circle.setAttribute('cx', radius + (x * radius * 2) );
				circle.setAttribute('cy', radius + (y * radius * 2));
				circle.style.fill = "#ff9999";
				circle.addEventListener('mouseup', toggleCell);

				g.appendChild(circle);
			}

			baseEl.appendChild(g);
		}

		// Append SVG and G/Rects to root element
		rootEl.appendChild(baseEl);

		// Callback definition
		function toggleCell(e) {
			var el = e.target;
			var v = new Vector(
				(el.getAttribute('cx') - radius) / (radius * 2),
				(el.getAttribute('cy') - radius) / (radius * 2));

			console.log(el, v);
			var newState = !grid.get(v);

			grid.set(v, newState);
			el.style.fill = newState ? 'black' : 'white';
		}
	}


	// Utilizing built-in live collections, gg
	function update(rootEl, grid) {
		grid.forEach((value, vector) => {
			baseEl.children[vector.y].children[vector.x]
				.style.fill = value ? 'black' : 'white';
		});
	}

	return {init, update};
})();

Views.checkbox = (function() {
	
	var cellSize = 10;

	function init(rootEl, grid) {
		// Create base Table element
		baseEl = document.createElement('table');
		baseEl.setAttribute('width', cellSize * grid.width);
		baseEl.setAttribute('height', cellSize * grid.height);
		baseEl.setAttribute('cellpadding', 0);

		for (var y = 0; y < grid.height; y++) {
			var tr = document.createElement('tr');

			for (var x = 0; x < grid.width; x++) {
				var td = document.createElement('td');
				td.setAttribute('width', cellSize);
				td.setAttribute('height', cellSize);
				tr.appendChild(td);
				
				var cb = document.createElement('input');
				cb.setAttribute('type', 'checkbox');
				cb.style.width = cellSize + 'px';
				cb.style.height = cellSize + 'px';
				cb.addEventListener('click', toggleCell);
				td.appendChild(cb);
			}

			baseEl.appendChild(tr);
		}

		// Append SVG and G/Rects to root element
		rootEl.appendChild(baseEl);

		// Callback definition
		function toggleCell(e) {
			var cb = e.target,  td = cb.parentElement,  tr = td.parentElement;
			var v = new Vector(td.cellIndex, tr.rowIndex);
			var newState = !grid.get(v);

			grid.set(v, newState);
			cb.checked = newState;
		}
	}


	// Utilizing built-in live collections, gg
	function update(rootEl, grid) {
		grid.forEach((value, vector) => {
			baseEl.children[vector.y].children[vector.x].childNodes[0]
				.checked = value;
		});
	}

	return {init, update};
})();


Views.square = (function() {
	var cellSize = 10;

	function init(rootEl, grid) {
		var svgNS = "http://www.w3.org/2000/svg";

		// Create base SVG element
		baseEl = document.createElementNS(svgNS, "svg");
		baseEl.setAttribute('width', cellSize * grid.width);
		baseEl.setAttribute('height', cellSize * grid.height);

		// Create cells
		for (var y = 0; y < grid.height; y++) {
			// Group in SVG:G baseEls
			var g = document.createElementNS(svgNS, "g");

			for (var x = 0; x < grid.width; x++) {
				var rect = document.createElementNS(svgNS, "rect");

				rect.setAttribute('width', cellSize);
				rect.setAttribute('height', cellSize);
				rect.setAttribute('x', x * cellSize);
				rect.setAttribute('y', y * cellSize);
				rect.style.fill = "#ff9999";
				rect.addEventListener('mouseup', toggleCell);

				g.appendChild(rect);
			}

			baseEl.appendChild(g);
		}

		// Append SVG and G/Rects to root element
		rootEl.appendChild(baseEl);

		// Callback definition
		function toggleCell(e) {
			var el = e.target;
			var v = new Vector(
				el.getAttribute('x') / cellSize,
				el.getAttribute('y') / cellSize);

			var newState = !grid.get(v);

			grid.set(v, newState);
			el.style.fill = newState ? 'black' : 'white';
		}
	}

	// Utilizing built-in live collections, gg
	function update(rootEl, grid) {
		grid.forEach((value, vector) => {
			baseEl.children[vector.y].children[vector.x]
				.style.fill = value ? 'black' : 'white';
		});
	}

	return {init, update};
})();