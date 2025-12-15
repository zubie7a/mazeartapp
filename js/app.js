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
  
  // Store original matrix dimensions for scaling
  var originalN = null;
  
  // Initialize canvas size (for initial setup only)
  function setCanvasSize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    var canvasRect = DrawingEngine.setCanvasSize(w, h, params);
    
    canvas.width = DrawingEngine.W;
    canvas.height = DrawingEngine.H;
    canvas.style.width = canvasRect.width + 'px';
    canvas.style.height = canvasRect.height + 'px';
    canvas.style.left = canvasRect.x + 'px';
    canvas.style.top = canvasRect.y + 'px';
    
    // Store the original N when canvas is first set
    if (originalN === null) {
      originalN = DrawingEngine.N;
    }
  }
  
  // Scale canvas without regenerating matrix
  function scaleCanvas() {
    if (originalN === null || DrawingEngine.matrix.length === 0) return;
    
    var w = window.innerWidth;
    var h = window.innerHeight;
    var squareSize = Math.min(w, h);
    var canvasX = (w / 2) - (squareSize / 2);
    var canvasY = (h / 2) - (squareSize / 2);
    
    // Update canvas dimensions but keep the original N (matrix structure)
    DrawingEngine.W = squareSize;
    DrawingEngine.H = squareSize;
    DrawingEngine.N = originalN; // Keep original matrix size
    
    // Update canvas element
    canvas.width = squareSize;
    canvas.height = squareSize;
    canvas.style.width = squareSize + 'px';
    canvas.style.height = squareSize + 'px';
    canvas.style.left = canvasX + 'px';
    canvas.style.top = canvasY + 'px';
    
    // Update parameters
    params.setShiftX(canvasX);
    params.setShiftY(canvasY);
    params.setScreenWidth(w);
    params.setScreenHeight(h);
    params.setCenX(squareSize / 2);
    params.setCenY(squareSize / 2);
    
    // Redraw the existing matrix at the new size
    DrawingEngine.fillMatrix(context, params);
  }
  
  // Generate and draw new pattern
  function generateNewPattern() {
    DrawingEngine.apply_0_1_rule();
    DrawingEngine.drawMatrix(params);
    DrawingEngine.fillMatrix(context, params);
    // Store the original N value after generating pattern
    originalN = DrawingEngine.N;
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
  
  // Close modal on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && infoModal.classList.contains('show')) {
      closeInfoModal();
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
    var pixelSize = parseInt(this.value);
    params.setPixelSize(pixelSize);
    pixelSizeValue.textContent = pixelSize;
    setCanvasSize();
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

