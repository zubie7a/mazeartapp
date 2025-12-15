// Comfy palette
function Comfy() {
  Palette.call(this);
  
  var _c1 = [48, 242, 242];
  var _c2 = [97, 242, 194];
  var _c3 = [145, 242, 145];
  var _c4 = [194, 242, 97];
  var _c5 = [242, 242, 48];
  
  var c1 = this.colors3D(_c1, _c2, 255);
  var c2 = this.colors3D(_c2, _c3, 255);
  var c3 = this.colors3D(_c3, _c4, 255);
  var c4 = this.colors3D(_c4, _c5, 255);
  var c5 = this.colors3D(_c5, _c1, 255);
  
  this.colors = c1.concat(c2).concat(c3).concat(c4).concat(c5);
}

Comfy.prototype = Object.create(Palette.prototype);
Comfy.prototype.constructor = Comfy;

Comfy.buildPalette = function() {
  return new Comfy();
};

