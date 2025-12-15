// Shiny palette
function Shiny() {
  Palette.call(this);
  
  var _c1 = [106, 212, 255];
  var _c2 = [255, 107, 163];
  var _c3 = [253, 143, 102];
  var _c4 = [255, 212, 104];
  var _c5 = [228, 251, 101];
  
  var c1 = this.colors3D(_c1, _c2, 255);
  var c2 = this.colors3D(_c2, _c3, 255);
  var c3 = this.colors3D(_c3, _c4, 255);
  var c4 = this.colors3D(_c4, _c5, 255);
  var c5 = this.colors3D(_c5, _c1, 255);
  
  this.colors = c1.concat(c2).concat(c3).concat(c4).concat(c5);
}

Shiny.prototype = Object.create(Palette.prototype);
Shiny.prototype.constructor = Shiny;

Shiny.buildPalette = function() {
  return new Shiny();
};

