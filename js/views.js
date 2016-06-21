var Views = {

  'checkbox': (function() {
    
    var baseEl;


    function init(rootHTML) {

      // Create base view element
      baseEl = d3.select(rootHTML).append('table');
    }


    function update(grid) {

      /* Handle Rows */
      // Capture result of view/data staging (list of rows)
      var rows = baseEl.selectAll('tr')
        .data(grid.space);
      
      // Check into 'enter' state and create lacking view items (each row)
      rows.enter()
        .append('tr');

      /* Handle Cols */
      // Capture result of view/data staging (list of cols)
      var cells = rows.selectAll('td')
        .data( (d) => d );

      // Check into 'enter' state and create lacking view items (each col)
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
  })(),


  'checkbox_noD3': (function() {
		
		var cellSize = 15;
		var baseEl;


		function init(rootEl, grid) {

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
			rootEl.appendChild(baseEl);


			function toggleCell(e) {

				var cb = e.target,  td = cb.parentElement,  tr = td.parentElement;
				var v = new Vector(td.cellIndex, tr.rowIndex);
				var newState = !grid.get(v);

				grid.set(v, newState);
				cb.checked = newState;
			}
		}


		function update(grid) {

			grid.forEach((value, vector) => {

				baseEl.children[vector.y].children[vector.x].childNodes[0]
					.checked = value;
			});

		}


		return {init, update};
	})(),



  'svg': (function() {

    var baseEl;
    var cellSize = 15;


    function init(rootHTML, grid) {

      baseEl = d3.select(rootHTML).append('svg')
       .attr('width', cellSize * grid.width)
       .attr('height', cellSize * grid.height);
    }


    function update(grid) {

      baseEl.selectAll('*').remove();

      var rows = baseEl.selectAll('g')
        .data(grid.space);

      rows.enter()
        .append('g');

      var cells = rows.selectAll('g')
        .data( (d) => d );

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

      cells.attr('fill', (d) => d ? 'black' : 'white' );
    }


    return {init, update};
  })(),



  'svg_noD3': (function() {

    var cellSize = 15;
    var baseEl;


    function init(rootHTML, grid) {

      var svgNS = "http://www.w3.org/2000/svg";

      baseEl = document.createElementNS(svgNS, "svg");
      baseEl.setAttribute('width', cellSize * grid.width);
      baseEl.setAttribute('height', cellSize * grid.height);

      for (var y = 0; y < grid.height; y++) {

        var g = document.createElementNS(svgNS, "g");

        for (var x = 0; x < grid.width; x++) {

          var rect = document.createElementNS(svgNS, "rect");

          rect.setAttribute('width', cellSize);
          rect.setAttribute('height', cellSize);
          rect.setAttribute('x', x * cellSize);
          rect.setAttribute('y', y * cellSize);
          rect.style.fill = "#ff9999";
          rect.addEventListener('mouseup', createClickCB(x, y));

          g.appendChild(rect);
        }

        baseEl.appendChild(g);
      }

      rootHTML.appendChild(baseEl);


      function createClickCB(x, y) {

        return function onCellClick(e) {
          
          var v = new Vector(x, y);
          var newState = !grid.get(v);

          grid.set(v, newState);
          e.target.style.fill = newState ? 'black' : 'white';
        }
      }
    }


    function update(grid) {

      grid.forEach((value, vector) => {

        baseEl.children[vector.y].children[vector.x]
          .style.fill = value ? 'black' : 'white';
      });

    }


    return {init, update};
  })()
}