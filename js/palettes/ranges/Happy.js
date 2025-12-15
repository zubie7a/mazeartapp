// Happy palette
function Happy() {
  Palette.call(this);
  
  var _c1 = [255, 34, 0];
  var _c2 = [207, 209, 0];
  var _c3 = [255, 223, 0];
  var _c4 = [246, 241, 218];
  var _c5 = [97, 178, 195];
  
  var c1 = this.colors3D(_c1, _c2, 255);
  var c2 = this.colors3D(_c2, _c3, 255);
  var c3 = this.colors3D(_c3, _c4, 255);
  var c4 = this.colors3D(_c4, _c5, 255);
  var c5 = this.colors3D(_c5, _c1, 255);
  
  this.colors = c1.concat(c2).concat(c3).concat(c4).concat(c5);
}

Happy.prototype = Object.create(Palette.prototype);
Happy.prototype.constructor = Happy;

Happy.buildPalette = function() {
  return new Happy();
};

