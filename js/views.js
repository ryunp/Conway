var Views = {

  'checkbox': (function() {
    
    var container;


    function init(rootHTML) {

      // Create base view element
      container = d3.select(rootHTML).append('table');
    }


    function update(grid) {

      /* Handle Rows */
      // Capture result of view/data staging (list of rows)
      var rows = container.selectAll('tr')
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



  'svg': (function() {

    var container;
    var cellSize = 15;


    function init(rootHTML, grid) {

      container = d3.select(rootHTML).append('svg')
       .attr('width', cellSize * grid.width)
       .attr('height', cellSize * grid.height);
    }


    function update(grid) {

      // Derp. Since new arrays are assigned in Conway, data is recreated. :(
      container.selectAll('*').remove();

      /* Handle Rows */
      // Capture result of view/data staging (list of rows)
      var rows = container.selectAll('g')
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
  })(),



  'svg_noD3': (function() {

    var cellSize = 15;
    var container;


    function init(rootHTML, grid) {

      var svgNS = "http://www.w3.org/2000/svg";

      // Create base SVG element
      container = document.createElementNS(svgNS, "svg");
      container.setAttribute('width', cellSize * grid.width);
      container.setAttribute('height', cellSize * grid.height);

      // Create cells
      for (var y = 0; y < grid.height; y++) {

        // Group in SVG:G containers
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

        container.appendChild(g);
      }

      // Append SVG and G/Rects to root element
      document.querySelector(rootHTML).appendChild(container);


      function createClickCB(x, y) {

        return function onCellClick(e) {
          
          var v = new Vector(x, y);
          var newState = !grid.get(v);

          grid.set(v, newState);
          e.target.style.fill = newState ? 'black' : 'white';
        }
      }
    }


    // Utilizing built-in live collections, gg
    function update(grid) {

      grid.forEach((value, vector) => {

        container.children[vector.y].children[vector.x]
          .style.fill = value ? 'black' : 'white';
      });

    }


    return {init, update};
  })()
}