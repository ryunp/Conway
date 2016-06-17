var Views = {

  'checkbox': {

    init: function init(rootHTML) {

      // Create base view element
      d3.select(rootHTML).append('table');
    },

    update: function update(rootHTML, grid) {

      var table = d3.select(rootHTML).select('table');

      /* Handle Rows */
      // Capture result of view/data staging (list of rows)
      var rows = table.selectAll('tr')
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

          d3.select(this)
            .property('checked', grid.toggle(new Vector(x,y)));
        });

      // Update view values with data
      cells.select('input')
        .property('checked', (d) => d);
    }
  },

  'svg': (function() {

    var cellSize = 15;

    function init(rootHTML, grid) {

      d3.select(rootHTML).append('svg')
       .attr('width', cellSize * grid.width)
       .attr('height', cellSize * grid.height);
    }

    function update(rootHTML, grid) {

      var svg = d3.select(rootHTML).select('svg');
      svg.selectAll('*').remove(); // Recreating rect's each time?

      /* Handle Rows */
      // Capture result of view/data staging (list of rows)
      var rows = svg.selectAll('g')
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

            d3.select(this)
            .attr('fill', grid.toggle(new Vector(x,y)) ? 'black' : 'white');
        });

      // Update view values with data
      cells.attr('fill', (d) => d ? 'black' : 'white' );
    }

    return {init, update};
  })()
}