// QueueItem model - used in BFS algorithm
function QueueItem(square, row, col, islandId) {
  this.square = square;
  this.row = row;
  this.col = col;
  this.islandId = islandId;
}

