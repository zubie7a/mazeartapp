// Mint palette
function Mint() {
  Palette.call(this);
  
  var _c1 = [67, 67, 67];
  var _c2 = [14, 115, 111];
  var _c3 = [152, 230, 206];
  var _c4 = [197, 240, 225];
  var _c5 = [243, 243, 243];
  
  var c1 = this.colors3D(_c1, _c2, 255);
  var c2 = this.colors3D(_c2, _c3, 255);
  var c3 = this.colors3D(_c3, _c4, 255);
  var c4 = this.colors3D(_c4, _c5, 255);
  var c5 = this.colors3D(_c5, _c1, 255);
  
  this.colors = c1.concat(c2).concat(c3).concat(c4).concat(c5);
}

Mint.prototype = Object.create(Palette.prototype);
Mint.prototype.constructor = Mint;

Mint.buildPalette = function() {
  return new Mint();
};

