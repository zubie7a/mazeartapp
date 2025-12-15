// Germany palette
function Germany() {
  Palette.call(this);
  
  var _c1 = [0, 0, 0];
  var _c2 = [255, 0, 0];
  var _c3 = [255, 204, 0];
  
  var c1 = this.colors3D(_c1, _c2, 255);
  var c2 = this.colors3D(_c2, _c3, 255);
  
  var _colors = c1.concat(c2);
  this.colors = _colors.concat(_colors.slice().reverse());
}

Germany.prototype = Object.create(Palette.prototype);
Germany.prototype.constructor = Germany;

Germany.buildPalette = function() {
  return new Germany();
};

