// Drawing Engine - handles the 0-1 rule algorithm and BFS coloring
var DrawingEngine = {
  matrix: [],
  N: 100,
  W: -1,
  H: -1,
  
  // Initialize the matrix with empty squares
  singularMatrix: function() {
    this.matrix = [];
    for (var i = 0; i < this.N; i++) {
      var row = [];
      for (var j = 0; j < this.N; j++) {
        var square = new Square();
        square.row = i;
        square.col = j;
        row.push(square);
      }
      this.matrix.push(row);
    }
  },
  
  // Check if any boolean in array is true
  any: function(booleans) {
    return booleans.some(function(b) { return b === true; });
  },
  
  // Apply the 0-1 rule to create the maze pattern
  apply_0_1_rule: function() {
    this.singularMatrix();
    
    // Rows iterator
    for (var i = 0; i < this.matrix.length; i++) {
      // For each row generate a random value 0 or 1
      var row_seed = Math.floor(Math.random() * 2);
      // Now for each cell, go horizontally and set a Down boundary
      for (var j = 0; j < this.matrix[0].length; j++) {
        var square = this.matrix[i][j];
        square.row_seed = row_seed;
        square.D = (row_seed === (j % 2));
      }
    }
    
    // Cols iterator
    for (var j = 0; j < this.matrix[0].length; j++) {
      // For each col generate a random value 0 or 1
      var col_seed = Math.floor(Math.random() * 2);
      // Now for each cell, go vertically and set the Right boundary
      for (var i = 0; i < this.matrix.length; i++) {
        var square = this.matrix[i][j];
        square.col_seed = col_seed;
        square.R = (col_seed === (i % 2));
      }
    }
    
    // Synchronize boundaries between adjacent squares
    for (var row = 0; row < this.matrix.length; row++) {
      for (var col = 0; col < this.matrix[0].length; col++) {
        var square = this.matrix[row][col];
        
        if (row > 0) {
          var squareU = this.matrix[row - 1][col];
          // If there's a shared boundary between this square and the one above it
          var sharedBoundary = this.any([square.U, squareU.D]);
          squareU.D = sharedBoundary;
          square.U = sharedBoundary;
        }
        if (row + 1 < this.matrix.length) {
          var squareD = this.matrix[row + 1][col];
          // If there's a shared boundary between this square and the one below it
          var sharedBoundary = this.any([square.D, squareD.U]);
          squareD.U = sharedBoundary;
          square.D = sharedBoundary;
        }
        if (col > 0) {
          var squareL = this.matrix[row][col - 1];
          // If there's a shared boundary between this square and the one to the left
          var sharedBoundary = this.any([square.L, squareL.R]);
          squareL.R = sharedBoundary;
          square.L = sharedBoundary;
        }
        if (col + 1 < this.matrix[0].length) {
          var squareR = this.matrix[row][col + 1];
          // If there's a shared boundary between this square and the one to the right
          var sharedBoundary = this.any([square.R, squareR.L]);
          squareR.L = sharedBoundary;
          square.R = sharedBoundary;
        }
      }
    }
  },
  
  // Use BFS to color connected regions (islands)
  BFS: function(square, row, col, islandId, params) {
    var queue = [new QueueItem(square, row, col, islandId)];
    
    var colorIndex = Math.floor(Math.random() * (256 * 256 * 256));
    var colorUiColor = null;
    if (params.getPaletteIndex() !== 0) {
      var palette = params.getPalette();
      palette.colorIndex = Math.floor(Math.random() * palette.colors.length);
      var colorObj = palette.getColor(1.0);
      colorUiColor = 'rgb(' + colorObj.r + ', ' + colorObj.g + ', ' + colorObj.b + ')';
    }
    
    while (queue.length > 0) {
      var queueItem = queue.shift();
      var curSquare = queueItem.square;
      var curRow = queueItem.row;
      var curCol = queueItem.col;
      
      if (curSquare.colorIndex !== 0) {
        continue;
      }
      curSquare.colorIndex = colorIndex;
      curSquare.colorUiColor = colorUiColor;
      curSquare.islandId = islandId;
      
      // Try to add neighbors of square to the queue unless a boundary exists between them
      var neighbors = [];
      if (curRow > 0) {
        var squareU = this.matrix[curRow - 1][curCol];
        if (squareU.colorIndex === 0 && !squareU.D) {
          neighbors.push(new QueueItem(squareU, curRow - 1, curCol, islandId));
        }
      }
      if (curRow + 1 < this.matrix.length) {
        var squareD = this.matrix[curRow + 1][curCol];
        if (squareD.colorIndex === 0 && !squareD.U) {
          neighbors.push(new QueueItem(squareD, curRow + 1, curCol, islandId));
        }
      }
      if (curCol > 0) {
        var squareL = this.matrix[curRow][curCol - 1];
        if (squareL.colorIndex === 0 && !squareL.R) {
          neighbors.push(new QueueItem(squareL, curRow, curCol - 1, islandId));
        }
      }
      if (curCol + 1 < this.matrix[0].length) {
        var squareR = this.matrix[curRow][curCol + 1];
        if (squareR.colorIndex === 0 && !squareR.L) {
          neighbors.push(new QueueItem(squareR, curRow, curCol + 1, islandId));
        }
      }
      queue = queue.concat(neighbors);
    }
  },
  
  // Draw the matrix using BFS to color islands
  drawMatrix: function(params) {
    // Reset all color indices
    for (var row = 0; row < this.matrix.length; row++) {
      for (var col = 0; col < this.matrix[0].length; col++) {
        var square = this.matrix[row][col];
        square.colorIndex = 0;
      }
    }
    
    // Use BFS to color each uncolored region
    for (var row = 0; row < this.matrix.length; row++) {
      for (var col = 0; col < this.matrix[0].length; col++) {
        var square = this.matrix[row][col];
        if (square.colorIndex === 0) {
          var islandId = Math.floor(Math.random() * 100);
          this.BFS(square, row, col, islandId, params);
        }
      }
    }
  },
  
  // Fix isolated square colors for smoothing
  fixIsolatedSquareColor: function(square, params) {
    var colors = [];
    var neighborSquares = [];
    
    var row = square.row;
    var col = square.col;
    var rows = params.getVerticalMirroring() ? Math.floor(this.N / 2) : this.N - 1;
    var cols = params.getHorizontalMirroring() ? Math.floor(this.N / 2) : this.N - 1;
    var density = params.getDensity();
    
    if (row > 0) {
      var neighborSquare = this.matrix[row - 1][col];
      colors.push(neighborSquare.getColor(density));
      neighborSquares.push(neighborSquare);
    }
    if (row < rows) {
      var neighborSquare = this.matrix[row + 1][col];
      colors.push(neighborSquare.getColor(density));
      neighborSquares.push(neighborSquare);
    }
    if (col > 0) {
      var neighborSquare = this.matrix[row][col - 1];
      colors.push(neighborSquare.getColor(density));
      neighborSquares.push(neighborSquare);
    }
    if (col < cols) {
      var neighborSquare = this.matrix[row][col + 1];
      colors.push(neighborSquare.getColor(density));
      neighborSquares.push(neighborSquare);
    }
    
    var newSquare = square.clone();
    
    if (colors.indexOf(square.getColor(density)) === -1) {
      var neighborSquare = neighborSquares[Math.floor(Math.random() * neighborSquares.length)];
      newSquare.colorIndex = neighborSquare.colorIndex;
      newSquare.colorUiColor = neighborSquare.colorUiColor;
      newSquare.islandId = neighborSquare.islandId;
    }
    
    return newSquare;
  },
  
  // Fill the canvas with the colored matrix
  fillMatrix: function(context, params) {
    context.clearRect(0, 0, this.W, this.H);
    
    var _N = Math.floor(this.N / params.getPixelSize());
    
    var rows = params.getVerticalMirroring() ? Math.floor(_N / 2 + 2) : _N;
    var cols = params.getHorizontalMirroring() ? Math.floor(_N / 2 + 2) : _N;
    
    for (var row = 0; row < rows; row++) {
      for (var col = 0; col < cols; col++) {
        var square = this.matrix[row][col];
        
        if (params.getSmoothing()) {
          square = this.fixIsolatedSquareColor(square, params);
        }
        
        square.draw(context, _N, this.W, this.H, params.getDensity());
        
        if (params.getVerticalMirroring()) {
          var square2 = square.clone();
          square2.row = _N - square.row + 1;
          square2.draw(context, _N, this.W, this.H, params.getDensity());
        }
        if (params.getHorizontalMirroring()) {
          var square3 = square.clone();
          square3.col = _N - square.col + 1;
          square3.draw(context, _N, this.W, this.H, params.getDensity());
        }
        if (params.getVerticalMirroring() && params.getHorizontalMirroring()) {
          var square4 = square.clone();
          square4.row = _N - square.row + 1;
          square4.col = _N - square.col + 1;
          square4.draw(context, _N, this.W, this.H, params.getDensity());
        }
      }
    }
  },
  
  // Set canvas size based on viewport (letterboxed square)
  setCanvasSize: function(newWidth, newHeight, params) {
    var w = newWidth;
    var h = newHeight;
    // Use minimum dimension to ensure square fits within viewport (letterboxing)
    var squareSize = Math.min(w, h);
    var canvasX = (w / 2) - (squareSize / 2);
    var canvasY = (h / 2) - (squareSize / 2);
    
    this.W = squareSize;
    this.H = squareSize;
    this.N = Math.floor(squareSize / params.getPixelSize());
    
    params.setShiftX(canvasX);
    params.setShiftY(canvasY);
    params.setScreenWidth(w);
    params.setScreenHeight(h);
    params.setCenX(squareSize / 2);
    params.setCenY(squareSize / 2);
    
    return {
      x: canvasX,
      y: canvasY,
      width: squareSize,
      height: squareSize
    };
  }
};

