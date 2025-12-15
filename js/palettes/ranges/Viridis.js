// Viridis palette
function Viridis() {
  Palette.call(this);
  
  var _c1 = [68, 1, 84];
  var _c2 = [62, 75, 137];
  var _c3 = [38, 130, 142];
  var _c4 = [53, 183, 121];
  var _c5 = [253, 231, 37];
  
  var c1 = this.colors3D(_c1, _c2, 255);
  var c2 = this.colors3D(_c2, _c3, 255);
  var c3 = this.colors3D(_c3, _c4, 255);
  var c4 = this.colors3D(_c4, _c5, 255);
  var c5 = this.colors3D(_c5, _c1, 255);
  
  this.colors = c1.concat(c2).concat(c3).concat(c4).concat(c5);
}

Viridis.prototype = Object.create(Palette.prototype);
Viridis.prototype.constructor = Viridis;

Viridis.buildPalette = function() {
  return new Viridis();
};

