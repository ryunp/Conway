var Views = Views || {};

Views.checkbox = (function() {
		


	function init(rootEl, grid) {

		// Create base view element
		baseEl = d3.select(rootEl).append('table');
	}


	function update(rootEl, grid) {

		var rows = baseEl.selectAll('tr')
			.data(grid.space);
		
		rows.enter()
			.append('tr');

		var cells = rows.selectAll('td')
			.data( (d) => d );

		cells.enter()
			.append('td')
			.append('input')
			.property('type', 'checkbox')
			.on('click', function(d, x, y) {

				var v = new Vector(x, y);
				var newState = !grid.get(v);

				grid.set(v, newState);

				d3.select(this)
					.property('checked', newState);
			});

		// Update view values with data
		cells.select('input')
			.property('checked', (d) => d);
	}


	return {init, update};
})();



Views.checkbox_noD3 = (function() {
	
	var cellSize = 15;


	function init(rootEl, grid) {

		// Create base Table element
		baseEl = document.createElement('table');
		baseEl.setAttribute('width', cellSize * grid.width);
		baseEl.setAttribute('height', cellSize * grid.height);

		for (var y = 0; y < grid.height; y++) {

			var tr = document.createElement('tr');

			for (var x = 0; x < grid.width; x++) {

				var td = document.createElement('td');
				td.setAttribute('width', cellSize);
				td.setAttribute('height', cellSize);
				tr.appendChild(td);
				
				var cb = document.createElement('input');
				cb.setAttribute('type', 'checkbox');
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




Views.svg = (function() {

	var cellSize = 15;


	function init(rootEl, grid) {

		baseEl = d3.select(rootEl).append('svg')
		 .attr('width', cellSize * grid.width)
		 .attr('height', cellSize * grid.height);
	}


	function update(rootEl, grid) {

		// Derp. Since new arrays are assigned in Conway, data is recreated. :(
		baseEl.selectAll('*').remove();

		/* Handle Rows */
		// Capture result of view/data staging (list of rows)
		var rows = baseEl.selectAll('g')
			.data(grid.space);

		// Check into 'enter' state and create lacking view items (each row)
		rows.enter()
			.append('g');

		/* Handle Cols */
		// Capture result of view/data staging (list of cols)
		var cells = rows.selectAll('g')
			.data( (d) => d );

		// Check into 'enter' state and create lacking view items (each col)
		cells.enter()
			.append('rect')
			.attr('x', (d, colIdx, rowIdx) => colIdx * cellSize )
			.attr('y', (d, colIdx, rowIdx) => rowIdx * cellSize )
			.attr('width', cellSize).attr('height', cellSize)
			.on('mouseup', function(d, x, y) {

				var v = new Vector(x, y);
				var newState = !grid.get(v);

				grid.set(v, newState);

				d3.select(this)
					.attr('fill', newState ? 'black' : 'white');
			});

		// Update view values with data
		cells.attr('fill', (d) => d ? 'black' : 'white' );
	}


	return {init, update};
})();



Views.svg_noD3 = (function() {

	var cellSize = 15;


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