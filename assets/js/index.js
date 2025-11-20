// BeforeAfter class - 必須放在最前面!
class BeforeAfter {
  constructor(options) {
    this.container = document.querySelector(options.id);
    if (!this.container) {
      console.log('Container not found:', options.id);
      return;
    }
    
    this.before = this.container.querySelector('.bal-before');
    this.beforeInset = this.container.querySelector('.bal-before-inset');
    this.handle = this.container.querySelector('.bal-handle');
    
    if (!this.before || !this.handle) {
      console.log('Required elements not found in:', options.id);
      return;
    }
    
    this.isDragging = false;
    
    this.init();
  }
  
  init() {
    // Mouse events
    this.handle.addEventListener('mousedown', this.onDragStart.bind(this));
    document.addEventListener('mousemove', this.onDrag.bind(this));
    document.addEventListener('mouseup', this.onDragEnd.bind(this));
    
    // Touch events
    this.handle.addEventListener('touchstart', this.onDragStart.bind(this));
    document.addEventListener('touchmove', this.onDrag.bind(this));
    document.addEventListener('touchend', this.onDragEnd.bind(this));
    
    // Click on container
    this.container.addEventListener('click', this.onClick.bind(this));
    
    console.log('BeforeAfter initialized for:', this.container.id);
  }
  
  onDragStart(e) {
    e.preventDefault();
    this.isDragging = true;
    console.log('Drag started');
  }
  
  onDrag(e) {
    if (!this.isDragging) return;
    
    const x = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    this.updatePosition(x);
  }
  
  onDragEnd() {
    if (this.isDragging) {
      console.log('Drag ended');
    }
    this.isDragging = false;
  }
  
  onClick(e) {
    if (e.target === this.handle) return;
    this.updatePosition(e.pageX);
  }
  
  updatePosition(x) {
    const rect = this.container.getBoundingClientRect();
    let offsetX = x - rect.left;
    
    // Constrain to container bounds
    offsetX = Math.max(0, Math.min(offsetX, rect.width));
    
    const percentage = (offsetX / rect.width) * 100;
    
    this.before.style.width = percentage + '%';
    this.handle.style.left = percentage + '%';
  }
}

// 原有的 Nerfies 相關代碼
window.HELP_IMPROVE_VIDEOJS = false;

// var INTERP_BASE = "./static/interpolation/stacked";
// var NUM_INTERP_FRAMES = 240;

// var interp_images = [];
// function preloadInterpolationImages() {
//   for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
//     var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
//     interp_images[i] = new Image();
//     interp_images[i].src = path;
//   }
// }

// function setInterpolationImage(i) {
//   var image = interp_images[i];
//   image.ondragstart = function() { return false; };
//   image.oncontextmenu = function() { return false; };
//   $('#interpolation-image-wrapper').empty().append(image);
// }


// $(document).ready(function() {
//     // Check for click events on the navbar burger icon
//     $(".navbar-burger").click(function() {
//       // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
//       $(".navbar-burger").toggleClass("is-active");
//       $(".navbar-menu").toggleClass("is-active");
//     });

//     var options = {
//       slidesToScroll: 1,
//       slidesToShow: 3,
//       loop: true,
//       infinite: true,
//       autoplay: false,
//       autoplaySpeed: 3000,
//     }

//     // Initialize all div with carousel class
//     var carousels = bulmaCarousel.attach('.carousel', options);

//     // Loop on each carousel initialized
//     for(var i = 0; i < carousels.length; i++) {
//       // Add listener to  event
//       carousels[i].on('before:show', state => {
//         console.log(state);
//       });
//     }

//     // Access to bulmaCarousel instance of an element
//     var element = document.querySelector('#my-element');
//     if (element && element.bulmaCarousel) {
//       // bulmaCarousel instance is available as element.bulmaCarousel
//       element.bulmaCarousel.on('before-show', function(state) {
//         console.log(state);
//       });
//     }

//     preloadInterpolationImages();

//     $('#interpolation-slider').on('input', function(event) {
//       setInterpolationImage(this.value);
//     });
//     setInterpolationImage(0);
//     $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

//     bulmaSlider.attach();
// });
