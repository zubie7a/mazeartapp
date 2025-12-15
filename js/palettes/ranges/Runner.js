// Runner palette
function Runner() {
  Palette.call(this);
  
  var _c1 = [235, 57, 30];
  var _c2 = [253, 187, 4];
  var _c3 = [227, 142, 101];
  var _c4 = [2, 160, 161];
  var _c5 = [16, 66, 92];
  
  var c1 = this.colors3D(_c1, _c2, 255);
  var c2 = this.colors3D(_c2, _c3, 255);
  var c3 = this.colors3D(_c3, _c4, 255);
  var c4 = this.colors3D(_c4, _c5, 255);
  var c5 = this.colors3D(_c5, _c1, 255);
  
  this.colors = c1.concat(c2).concat(c3).concat(c4).concat(c5);
}

Runner.prototype = Object.create(Palette.prototype);
Runner.prototype.constructor = Runner;

Runner.buildPalette = function() {
  return new Runner();
};

