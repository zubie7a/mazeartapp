// Beach palette
function Beach() {
  Palette.call(this);
  
  var blueToOrange = this.colors3D([0, 0, 255], [255, 128, 0], 512);
  var orangeToCyan = this.colors3D([255, 128, 0], [0, 255, 255], 512);
  var _colors = blueToOrange.concat(orangeToCyan);
  this.colors = _colors.concat(_colors.slice().reverse());
}

Beach.prototype = Object.create(Palette.prototype);
Beach.prototype.constructor = Beach;

Beach.buildPalette = function() {
  return new Beach();
};

