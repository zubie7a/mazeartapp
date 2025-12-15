// PaletteGenerator - factory for creating palettes (matches iOS structure)
var PaletteGenerator = {
  buildPalette: function(paletteIndex, rgb) {
    rgb = rgb || [];
    
    switch (paletteIndex) {
      case 0: // Manual/Random
        return Manual.buildPalette(rgb);
      case 1: // Rainbows
        return Rainbows.buildPalette();
      case 2: // Blaze
        return Blaze.buildPalette();
      case 3: // Glacier
        return Glacier.buildPalette();
      case 4: // Ocean
        return Ocean.buildPalette();
      case 5: // Natural
        return Natural.buildPalette();
      case 6: // Bluesky
        return Bluesky.buildPalette();
      case 7: // Grayscale
        return Grayscale.buildPalette();
      case 8: // Sepia
        return Sepia.buildPalette();
      case 9: // Mystical
        return Mystical.buildPalette();
      case 10: // Tropical
        return Tropical.buildPalette();
      case 11: // Aurora
        return Aurora.buildPalette();
      case 12: // Neon
        return Neon.buildPalette();
      case 13: // Brazil
        return Brazil.buildPalette();
      case 14: // Mexico
        return Mexico.buildPalette();
      case 15: // Colombia
        return Colombia.buildPalette();
      case 16: // Germany
        return Germany.buildPalette();
      case 17: // Netherlands
        return Netherlands.buildPalette();
      case 18: // Sunset
        return Sunset.buildPalette();
      case 19: // Beach
        return Beach.buildPalette();
      case 20: // Future
        return Future.buildPalette();
      case 21: // Sunny
        return Sunny.buildPalette();
      case 22: // Pastel
        return Pastel.buildPalette();
      case 23: // Intense
        return Intense.buildPalette();
      case 24: // Dash
        return Dash.buildPalette();
      case 25: // Runner
        return Runner.buildPalette();
      case 26: // Mint
        return Mint.buildPalette();
      case 27: // Viridis
        return Viridis.buildPalette();
      case 28: // Happy
        return Happy.buildPalette();
      case 29: // Comfy
        return Comfy.buildPalette();
      case 30: // Shiny
        return Shiny.buildPalette();
      case 31: // Cyber
        return Cyber.buildPalette();
      case 32: // Jupiter
        return Jupiter.buildPalette();
      case 33: // Blossom
        return Blossom.buildPalette();
      default:
        return Rainbows.buildPalette();
    }
  }
};

