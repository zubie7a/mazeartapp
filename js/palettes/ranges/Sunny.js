// Sunny palette
function Sunny() {
  Palette.call(this);
  
  var _c1 = [52, 56, 81];
  var _c2 = [76, 193, 229];
  var _c3 = [255, 255, 255];
  var _c4 = [244, 237, 17];
  var _c5 = [235, 167, 78];
  
  var c1 = this.colors3D(_c1, _c2, 255);
  var c2 = this.colors3D(_c2, _c3, 255);
  var c3 = this.colors3D(_c3, _c4, 255);
  var c4 = this.colors3D(_c4, _c5, 255);
  var c5 = this.colors3D(_c5, _c1, 255);
  
  this.colors = c1.concat(c2).concat(c3).concat(c4).concat(c5);
}

Sunny.prototype = Object.create(Palette.prototype);
Sunny.prototype.constructor = Sunny;

Sunny.buildPalette = function() {
  return new Sunny();
};

