// Square model - represents a cell in the maze grid
function Square(U, R, D, L, row, col, row_seed, col_seed, colorIndex, colorUiColor, islandSize, islandId) {
  this.U = U || false;
  this.R = R || false;
  this.D = D || false;
  this.L = L || false;
  
  this.row = row !== undefined ? row : -1;
  this.col = col !== undefined ? col : -1;
  
  this.row_seed = row_seed !== undefined ? row_seed : -1;
  this.col_seed = col_seed !== undefined ? col_seed : -1;
  
  this.colorIndex = colorIndex || 0;
  this.colorUiColor = colorUiColor || null;
  this.islandSize = islandSize || 0;
  this.islandId = islandId || 0;
}

Square.prototype.clone = function() {
  return new Square(
    this.U,
    this.R,
    this.D,
    this.L,
    this.row,
    this.col,
    this.row_seed,
    this.col_seed,
    this.colorIndex,
    this.colorUiColor,
    this.islandSize,
    this.islandId
  );
};

Square.prototype.draw = function(context, N, W, H, density) {
  var color = this.getColor(density);
  var rectX = this.col * (W / N);
  var rectY = this.row * (H / N);
  var rectW = W / N;
  var rectH = H / N;
  
  context.fillStyle = color;
  context.fillRect(rectX, rectY, rectW, rectH);
};

Square.prototype.colorExcluded = function(density) {
  return density * 100 < this.islandId;
};

Square.prototype.getColor = function(density) {
  if (this.colorExcluded(density)) {
    return 'rgb(0, 0, 0)';
  }
  
  if (this.colorUiColor !== null) {
    return this.colorUiColor;
  }
  
  var rMask = 0xFF;
  var gMask = 0xFF00;
  var bMask = 0xFF0000;
  var r = (this.colorIndex & rMask);
  var g = ((this.colorIndex & gMask) >> 8);
  var b = ((this.colorIndex & bMask) >> 16);
  
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
};

Square.prototype.toString = function() {
  return '[U:' + (this.U ? 1 : 0) + ', R:' + (this.R ? 1 : 0) + ', D:' + (this.D ? 1 : 0) + ', L:' + (this.L ? 1 : 0) + ' / C:' + this.colorIndex + ']';
};

