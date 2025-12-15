// Jupiter palette
function Jupiter() {
  Palette.call(this);
  
  var _c1 = [97, 73, 47];
  var _c2 = [240, 60, 7];
  var _c3 = [180, 99, 36];
  var _c4 = [250, 164, 87];
  var _c5 = [239, 216, 222];
  
  var c1 = this.colors3D(_c1, _c2, 255);
  var c2 = this.colors3D(_c2, _c3, 255);
  var c3 = this.colors3D(_c3, _c4, 255);
  var c4 = this.colors3D(_c4, _c5, 255);
  var c5 = this.colors3D(_c5, _c1, 255);
  
  this.colors = c1.concat(c2).concat(c3).concat(c4).concat(c5);
}

Jupiter.prototype = Object.create(Palette.prototype);
Jupiter.prototype.constructor = Jupiter;

Jupiter.buildPalette = function() {
  return new Jupiter();
};

