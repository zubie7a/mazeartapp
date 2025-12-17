// Main application controller
(function() {
  'use strict';
  
  var canvas = document.getElementById('mainCanvas');
  var context = canvas.getContext('2d');
  var params = new Parameters();
  var bgColor = '#000000';
  
  // UI Elements
  var menuToggle = document.getElementById('menuToggle');
  var closeSidebar = document.getElementById('closeSidebar');
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('overlay');
  var newBtn = document.getElementById('newBtn');
  var shareBtn = document.getElementById('shareBtn');
  var infoBtn = document.getElementById('infoBtn');
  var paletteSelect = document.getElementById('paletteSelect');
  var densitySlider = document.getElementById('densitySlider');
  var densityValue = document.getElementById('densityValue');
  var pixelSizeSlider = document.getElementById('pixelSizeSlider');
  var pixelSizeValue = document.getElementById('pixelSizeValue');
  var verticalMirrorToggle = document.getElementById('verticalMirrorToggle');
  var horizontalMirrorToggle = document.getElementById('horizontalMirrorToggle');
  var smoothingToggle = document.getElementById('smoothingToggle');
  
  // Store original on-screen canvas size so we can scale back to it
  var originalCanvasSize = null;
  
  // Initialize canvas size (for initial setup only)
  function setCanvasSize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    
    // Let the drawing engine pick an appropriate internal size & grid
    DrawingEngine.setCanvasSize(w, h, params);
    
    // Backing store matches the engine's internal canvas size
    canvas.width = DrawingEngine.W;
    canvas.height = DrawingEngine.H;
    
    // Capture the original on-screen size (once)
    if (originalCanvasSize === null) {
      originalCanvasSize = DrawingEngine.W;
    }
    
    // Apply CSS scaling/position so the canvas is centered and fits the screen
    updateCanvasDisplaySize();
  }
  
  // Update CSS size/position of the canvas to keep it centered
  // and clamped to the original on-screen size and current viewport.
  function updateCanvasDisplaySize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var screenSize = Math.min(w, h);
    
    var baseSize = originalCanvasSize !== null ? originalCanvasSize : DrawingEngine.W;
    var displaySize = Math.min(baseSize, screenSize);
    
    var canvasX = (w / 2) - (displaySize / 2);
    var canvasY = (h / 2) - (displaySize / 2);
    
    canvas.style.width = displaySize + 'px';
    canvas.style.height = displaySize + 'px';
    canvas.style.left = canvasX + 'px';
    canvas.style.top = canvasY + 'px';
    
    params.setShiftX(canvasX);
    params.setShiftY(canvasY);
    params.setScreenWidth(w);
    params.setScreenHeight(h);
    params.setCenX(displaySize / 2);
    params.setCenY(displaySize / 2);
  }
  
  // Ensure the internal canvas is large enough to draw all squares for the
  // current square size (pixel size), then scale back to the original size
  // on screen if necessary.
  function adjustCanvasSizeForSquareSizeChange() {
    if (DrawingEngine.matrix.length === 0) {
      return;
    }
    
    var numSquares = DrawingEngine.N;
    var pixelSize = params.getPixelSize();
    
    // Internal canvas size needed to fit all squares at this pixel size
    var requiredSize = numSquares * pixelSize;
    
    DrawingEngine.W = requiredSize;
    DrawingEngine.H = requiredSize;
    canvas.width = requiredSize;
    canvas.height = requiredSize;
    
    // Scale the canvas element back to the original on-screen size
    // (or smaller if the viewport has shrunk).
    updateCanvasDisplaySize();
  }
  
  // Scale canvas when the window resizes without regenerating the matrix:
  // keep the internal resolution, only adjust the on-screen size.
  function scaleCanvas() {
    if (DrawingEngine.matrix.length === 0) return;
    
    updateCanvasDisplaySize();
    DrawingEngine.fillMatrix(context, params);
  }
  
  // Generate and draw new pattern
  function generateNewPattern() {
    DrawingEngine.apply_0_1_rule();
    DrawingEngine.drawMatrix(params);
    DrawingEngine.fillMatrix(context, params);
  }
  
  // Redraw with current settings
  function redraw() {
    DrawingEngine.drawMatrix(params);
    DrawingEngine.fillMatrix(context, params);
  }
  
  // Refill with current settings (no regeneration)
  function refill() {
    DrawingEngine.fillMatrix(context, params);
  }
  
  // Event Handlers
  menuToggle.addEventListener('click', function() {
    sidebar.classList.add('open');
    overlay.classList.add('show');
  });
  
  closeSidebar.addEventListener('click', function() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  });
  
  overlay.addEventListener('click', function() {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  });
  
  newBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to create a new image?')) {
      generateNewPattern();
    }
  });
  
  shareBtn.addEventListener('click', function() {
    canvas.toBlob(function(blob) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'mazeart-' + Date.now() + '.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  });
  
  // Info modal elements
  var infoModal = document.getElementById('infoModal');
  var modalOkBtn = document.getElementById('modalOkBtn');
  var modalBackdrop = infoModal.querySelector('.modal-backdrop');
  
  infoBtn.addEventListener('click', function() {
    infoModal.classList.add('show');
  });
  
  function closeInfoModal() {
    infoModal.classList.remove('show');
  }
  
  modalOkBtn.addEventListener('click', closeInfoModal);
  modalBackdrop.addEventListener('click', closeInfoModal);
  
  // Keyboard shortcuts
  // - Escape: close info modal
  // - Z: recreate underlying grid (new maze pattern)
  // - R: reapply current palette (recolor existing islands)
  document.addEventListener('keydown', function(e) {
    var tagName = e.target && e.target.tagName ? e.target.tagName.toLowerCase() : '';
    // Don't trigger shortcuts while typing in form controls
    if (tagName === 'input' || tagName === 'select' || tagName === 'textarea') {
      return;
    }

    if (e.key === 'Escape' && infoModal.classList.contains('show')) {
      closeInfoModal();
      return;
    }

    var key = e.key.toLowerCase();
    if (key === 'z') {
      // Recreate the underlying grid (new 0-1 rule + colors)
      generateNewPattern();
    } else if (key === 'r') {
      // Reapply the current palette to existing islands (new colors only)
      redraw();
    } else if (key === 't') {
      // Select a random palette and apply it
      var maxPaletteIndex = 33; // Update if new palettes are added
      var randomIndex = Math.floor(Math.random() * (maxPaletteIndex + 1));
      params.setPaletteIndex(randomIndex);
      paletteSelect.value = String(randomIndex);
      redraw();
    } else if (key === 'f') {
      // Toggle vertical mirroring
      var newVertical = !verticalMirrorToggle.checked;
      verticalMirrorToggle.checked = newVertical;
      params.setVerticalMirroring(newVertical);
      refill();
    } else if (key === 'g') {
      // Toggle horizontal mirroring
      var newHorizontal = !horizontalMirrorToggle.checked;
      horizontalMirrorToggle.checked = newHorizontal;
      params.setHorizontalMirroring(newHorizontal);
      refill();
    } else if (key === 'h') {
      // Toggle smoothing
      var newSmoothing = !smoothingToggle.checked;
      smoothingToggle.checked = newSmoothing;
      params.setSmoothing(newSmoothing);
      refill();
    }
  });
  
  paletteSelect.addEventListener('change', function() {
    params.setPaletteIndex(parseInt(this.value));
    redraw();
  });
  
  densitySlider.addEventListener('input', function() {
    var density = parseFloat(this.value);
    params.setDensity(density);
    densityValue.textContent = density.toFixed(1);
    refill();
  });
  
  pixelSizeSlider.addEventListener('input', function() {
    var pixelSize = parseInt(this.value, 10);
    params.setPixelSize(pixelSize);
    pixelSizeValue.textContent = pixelSize;
    adjustCanvasSizeForSquareSizeChange();
    generateNewPattern();
  });
  
  verticalMirrorToggle.addEventListener('change', function() {
    params.setVerticalMirroring(this.checked);
    refill();
  });
  
  horizontalMirrorToggle.addEventListener('change', function() {
    params.setHorizontalMirroring(this.checked);
    refill();
  });
  
  smoothingToggle.addEventListener('change', function() {
    params.setSmoothing(this.checked);
    refill();
  });
  
  // Handle window resize - scale canvas without regenerating pattern
  window.addEventListener('resize', function() {
    scaleCanvas();
  });
  
  // Initialize
  setCanvasSize();
  generateNewPattern();
  
  // Update UI with current parameter values
  densitySlider.value = params.getDensity();
  densityValue.textContent = params.getDensity().toFixed(1);
  pixelSizeSlider.value = params.getPixelSize();
  pixelSizeValue.textContent = params.getPixelSize();
  verticalMirrorToggle.checked = params.getVerticalMirroring();
  horizontalMirrorToggle.checked = params.getHorizontalMirroring();
  smoothingToggle.checked = params.getSmoothing();
  paletteSelect.value = params.getPaletteIndex();
})();

