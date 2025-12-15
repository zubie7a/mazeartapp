// Sepia palette
function Sepia() {
  Palette.call(this);
  
  this.colors = [];
  var r = 112;
  var g = 66;
  var b = 20;
  
  for (var i = 0; i < 2000; i++) {
    if (i < 127) {
      r += 1; g += 1; b += 1;
    } else if (i < 127 + 64) {
      r -= 1; g -= 1; b -= 1;
    } else if (i < 127 + 64 + 64) {
      r += 1; g += 1; b += 1;
    } else if (i < 127 + 64 + 64 + 255) {
      r -= 1; g -= 1; b -= 1;
    } else if (i < 127 + 64 + 64 + 255 + 127) {
      r += 1; g += 1; b += 1;
    } else {
      break;
    }
    this.colors.push([r, g, b]);
  }
}

Sepia.prototype = Object.create(Palette.prototype);
Sepia.prototype.constructor = Sepia;

Sepia.buildPalette = function() {
  return new Sepia();
};

