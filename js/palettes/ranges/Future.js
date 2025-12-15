// Future palette
function Future() {
  Palette.call(this);
  
  var _c1 = [221, 162, 151];
  var _c2 = [86, 39, 207];
  var _c3 = [73, 48, 89];
  var _c4 = [220, 239, 95];
  var _c5 = [184, 244, 28];
  var _c6 = [131, 43, 91];
  
  // AWESOME RANDOM PALETTE #1
  var c1 = this.colors3D(_c1, _c2, 255);
  var c2 = this.colors3D(_c2, _c3, 255);
  var c3 = this.colors3D(_c3, _c4, 255);
  var c4 = this.colors3D(_c4, _c5, 255);
  var c5 = this.colors3D(_c5, _c6, 255);
  var c6 = this.colors3D(_c6, _c1, 255);
  
  this.colors = c1.concat(c2).concat(c3).concat(c4).concat(c5).concat(c6);
}

Future.prototype = Object.create(Palette.prototype);
Future.prototype.constructor = Future;

Future.buildPalette = function() {
  return new Future();
};

