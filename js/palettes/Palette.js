// Base Palette class - matches iOS Palette structure
function Palette() {
  // An index to know where in the array are we while shifting
  this.colorIndex = 0;
  
  // An array that will contain arrays/triples of [R,G,B] colors
  this.colors = [];
  
  // Default value of positions to shift in color array
  this.shiftPositions = 5;
}

// Shift the current position, while wrapping around if reaching limit
Palette.prototype.shiftIndex = function() {
  if (this.colors.length === 0) return;
  this.colorIndex = (this.colorIndex + this.shiftPositions) % this.colors.length;
};

// Get color with alpha
Palette.prototype.getColor = function(alpha) {
  if (this.colors.length === 0) {
    return { r: 255, g: 255, b: 255, a: alpha };
  }
  
  var RGB = this.colors[this.colorIndex];
  var color = {
    r: RGB[0],
    g: RGB[1],
    b: RGB[2],
    a: alpha
  };
  
  this.shiftIndex();
  return color;
};

// Create a 3D line between two RGB points
Palette.prototype.colors3D = function(start, end, steps) {
  // start is a 3D plane point defined by R,G,B coordinates
  // end is a 3D plane point defined by R,G,B coordinates
  // The purpose of this function is to make a 3D line between
  // both points and capture the points in it as the palette.
  
  // A vector defining the distance between both points
  var distVector = [
    end[0] - start[0],
    end[1] - start[1],
    end[2] - start[2]
  ];
  
  // Each position will hold a 3-element array that contains RGB values
  var resColors = [];
  // Do a certain number of steps between both coordinates to generate
  // the resulting colors matrix
  var stepR = distVector[0] / steps;
  var stepG = distVector[1] / steps;
  var stepB = distVector[2] / steps;
  
  for (var i = 0; i < steps; i++) {
    // Move every color along the vector until reaching target color
    var R = Math.round(start[0] + (stepR * i));
    var G = Math.round(start[1] + (stepG * i));
    var B = Math.round(start[2] + (stepB * i));
    resColors.push([R, G, B]);
  }
  
  return resColors;
};

