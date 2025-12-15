// Cyber palette
function Cyber() {
  Palette.call(this);
  
  var _c1 = [103, 30, 63];
  var _c2 = [194, 59, 119];
  var _c3 = [215, 216, 221];
  var _c4 = [77, 157, 182];
  var _c5 = [48, 83, 122];
  var _c6 = [15, 24, 35];
  
  var c1 = this.colors3D(_c1, _c2, 255);
  var c2 = this.colors3D(_c2, _c3, 255);
  var c3 = this.colors3D(_c3, _c4, 255);
  var c4 = this.colors3D(_c4, _c5, 255);
  var c5 = this.colors3D(_c5, _c6, 255);
  var c6 = this.colors3D(_c6, _c1, 255);
  
  this.colors = c1.concat(c2).concat(c3).concat(c4).concat(c5).concat(c6);
}

Cyber.prototype = Object.create(Palette.prototype);
Cyber.prototype.constructor = Cyber;

Cyber.buildPalette = function() {
  return new Cyber();
};

