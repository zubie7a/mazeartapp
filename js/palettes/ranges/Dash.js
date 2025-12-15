// Dash palette
function Dash() {
  Palette.call(this);
  
  var _c1 = [238, 64, 53];
  var _c2 = [243, 119, 54];
  var _c3 = [253, 244, 152];
  var _c4 = [123, 192, 67];
  var _c5 = [3, 146, 207];
  
  var c1 = this.colors3D(_c1, _c2, 255);
  var c2 = this.colors3D(_c2, _c3, 255);
  var c3 = this.colors3D(_c3, _c4, 255);
  var c4 = this.colors3D(_c4, _c5, 255);
  var c5 = this.colors3D(_c5, _c1, 255);
  
  this.colors = c1.concat(c2).concat(c3).concat(c4).concat(c5);
}

Dash.prototype = Object.create(Palette.prototype);
Dash.prototype.constructor = Dash;

Dash.buildPalette = function() {
  return new Dash();
};

