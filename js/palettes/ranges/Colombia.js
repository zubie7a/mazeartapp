// Colombia palette
function Colombia() {
  Palette.call(this);
  
  var _c1 = [249, 206, 92];
  var _c2 = [216, 160, 22];
  var _c3 = [28, 61, 114];
  var _c4 = [0, 0, 114];
  var _c5 = [68, 0, 0];
  var _c6 = [194, 0, 0];
  
  var c1 = this.colors3D(_c1, _c2, 255);
  var c2 = this.colors3D(_c2, _c3, 255);
  var c3 = this.colors3D(_c3, _c4, 255);
  var c4 = this.colors3D(_c4, _c5, 255);
  var c5 = this.colors3D(_c5, _c6, 255);
  
  var _colors = c1.concat(c2).concat(c3).concat(c4).concat(c5);
  this.colors = _colors.concat(_colors.slice().reverse());
}

Colombia.prototype = Object.create(Palette.prototype);
Colombia.prototype.constructor = Colombia;

Colombia.buildPalette = function() {
  return new Colombia();
};

