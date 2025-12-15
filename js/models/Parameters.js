// Parameters - stores app configuration
function Parameters() {
  this.prefVertical = true;
  this.prefHorizontal = true;
  this.prefSmoothing = false;
  this.prefDensity = 1.0;
  this.prefPixelSize = 1;
  
  this.prefCenX = 0;
  this.prefCenY = 0;
  this.screenWidth = 0;
  this.screenHeight = 0;
  this.shiftX = 0;
  this.shiftY = 0;
  
  this.prefPaletteIndex = 1;
  this.palette = null;
  
  this.resetParameters();
}

Parameters.prototype.getVerticalMirroring = function() {
  return this.prefVertical;
};

Parameters.prototype.getHorizontalMirroring = function() {
  return this.prefHorizontal;
};

Parameters.prototype.getSmoothing = function() {
  return this.prefSmoothing;
};

Parameters.prototype.getDensity = function() {
  return this.prefDensity;
};

Parameters.prototype.getPixelSize = function() {
  return this.prefPixelSize;
};

Parameters.prototype.getPalette = function() {
  return this.palette;
};

Parameters.prototype.getCenX = function() {
  return this.prefCenX;
};

Parameters.prototype.getCenY = function() {
  return this.prefCenY;
};

Parameters.prototype.getShiftX = function() {
  return this.shiftX;
};

Parameters.prototype.getShiftY = function() {
  return this.shiftY;
};

Parameters.prototype.getScreenWidth = function() {
  return this.screenWidth;
};

Parameters.prototype.getScreenHeight = function() {
  return this.screenHeight;
};

Parameters.prototype.getPaletteIndex = function() {
  return this.prefPaletteIndex;
};

Parameters.prototype.setVerticalMirroring = function(vertical) {
  this.prefVertical = vertical;
};

Parameters.prototype.setHorizontalMirroring = function(horizontal) {
  this.prefHorizontal = horizontal;
};

Parameters.prototype.setDensity = function(density) {
  this.prefDensity = density;
};

Parameters.prototype.setPixelSize = function(pixelSize) {
  this.prefPixelSize = pixelSize;
};

Parameters.prototype.setSmoothing = function(smoothing) {
  this.prefSmoothing = smoothing;
};

Parameters.prototype.setCenX = function(cenX) {
  this.prefCenX = cenX;
};

Parameters.prototype.setCenY = function(cenY) {
  this.prefCenY = cenY;
};

Parameters.prototype.setShiftX = function(shiftX) {
  this.shiftX = shiftX;
};

Parameters.prototype.setShiftY = function(shiftY) {
  this.shiftY = shiftY;
};

Parameters.prototype.setScreenWidth = function(width) {
  this.screenWidth = width;
};

Parameters.prototype.setScreenHeight = function(height) {
  this.screenHeight = height;
};

Parameters.prototype.setPaletteIndex = function(paletteIndex) {
  this.prefPaletteIndex = paletteIndex;
  this.updatePalette();
};

Parameters.prototype.getPaletteColors = function() {
  if (!this.palette) {
    return null;
  }
  var color = this.palette.getColor(1.0);
  return 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';
};

Parameters.prototype.updatePalette = function() {
  this.palette = PaletteGenerator.buildPalette(this.prefPaletteIndex);
};

Parameters.prototype.resetParameters = function() {
  this.prefPaletteIndex = 1;
  this.prefVertical = true;
  this.prefHorizontal = true;
  this.prefSmoothing = false;
  this.prefDensity = 0.8;
  this.prefPixelSize = 2;
  this.screenWidth = window.innerWidth || 800;
  this.screenHeight = window.innerHeight || 600;
  this.prefCenX = this.screenWidth / 2;
  this.prefCenY = this.screenHeight / 2;
  this.updatePalette();
};

