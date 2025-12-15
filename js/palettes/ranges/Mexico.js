// Mexico palette
function Mexico() {
  Palette.call(this);
  
  var _c1 = [206, 17, 38];
  var _c2 = [255, 255, 255];
  var _c3 = [0, 104, 71];
  
  var c1 = this.colors3D(_c1, _c2, 255);
  var c2 = this.colors3D(_c2, _c3, 255);
  
  var _colors = c1.concat(c2);
  this.colors = _colors.concat(_colors.slice().reverse());
}

Mexico.prototype = Object.create(Palette.prototype);
Mexico.prototype.constructor = Mexico;

Mexico.buildPalette = function() {
  return new Mexico();
};

