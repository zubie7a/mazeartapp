// Intense palette
function Intense() {
  Palette.call(this);
  
  var _c1 = [0, 0, 0];
  var _c2 = [255, 0, 154];
  var _c3 = [255, 219, 0];
  var _c4 = [255, 255, 255];
  
  var c1 = this.colors3D(_c1, _c2, 255);
  var c2 = this.colors3D(_c2, _c3, 255);
  var c3 = this.colors3D(_c3, _c4, 255);
  var c4 = this.colors3D(_c4, _c1, 255);
  
  var _colors = c1.concat(c2).concat(c3).concat(c4);
  this.colors = _colors.concat(_colors.slice().reverse());
}

Intense.prototype = Object.create(Palette.prototype);
Intense.prototype.constructor = Intense;

Intense.buildPalette = function() {
  return new Intense();
};

