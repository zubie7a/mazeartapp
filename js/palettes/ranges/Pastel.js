// Pastel palette
function Pastel() {
  Palette.call(this);
  
  var _c1 = [168, 230, 207];
  var _c2 = [220, 237, 193];
  var _c3 = [255, 211, 182];
  var _c4 = [255, 170, 165];
  var _c5 = [255, 139, 148];
  
  var c1 = this.colors3D(_c1, _c2, 255);
  var c2 = this.colors3D(_c2, _c3, 255);
  var c3 = this.colors3D(_c3, _c4, 255);
  var c4 = this.colors3D(_c4, _c5, 255);
  var c5 = this.colors3D(_c5, _c1, 255);
  
  this.colors = c1.concat(c2).concat(c3).concat(c4).concat(c5);
}

Pastel.prototype = Object.create(Palette.prototype);
Pastel.prototype.constructor = Pastel;

Pastel.buildPalette = function() {
  return new Pastel();
};

