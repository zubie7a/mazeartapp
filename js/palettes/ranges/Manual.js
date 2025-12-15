// Manual palette - solid color
function Manual() {
  Palette.call(this);
  
  this.colors = [];
  var r = 0;
  var g = 0;
  var b = 0;
  
  // Solid color palette
  for (var i = 0; i < 1530; i++) {
    this.colors.push([r, g, b]);
  }
}

Manual.prototype = Object.create(Palette.prototype);
Manual.prototype.constructor = Manual;

Manual.buildPalette = function(rgb) {
  var palette = new Manual();
  if (rgb && rgb.length >= 3) {
    var r = Math.round(rgb[0] * 255);
    var g = Math.round(rgb[1] * 255);
    var b = Math.round(rgb[2] * 255);
    palette.colors = [];
    for (var i = 0; i < 1530; i++) {
      palette.colors.push([r, g, b]);
    }
  }
  return palette;
};

