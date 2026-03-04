console.log("Öjdahl Entreprenad – hemsidan är igång!");

// Mobile menu toggle
const navToggle = document.createElement('button');
navToggle.innerHTML = '&#9776;';
navToggle.classList.add('nav-toggle');
navToggle.style.display = 'none';
navToggle.style.background = 'none';
navToggle.style.border = 'none';
navToggle.style.color = '#fff';
navToggle.style.fontSize = '1.5rem';
navToggle.style.cursor = 'pointer';

const nav = document.querySelector('nav');
const headerContainer = document.querySelector('header .header-content');
if (headerContainer) {
  headerContainer.appendChild(navToggle);
}

navToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Show/hide toggle button on mobile
function checkScreenSize() {
  if (window.innerWidth <= 768) {
    navToggle.style.display = 'block';
    nav.classList.remove('active');
  } else {
    navToggle.style.display = 'none';
    nav.classList.add('active');
  }
}

window.addEventListener('resize', checkScreenSize);
checkScreenSize();

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
      });
    }
    // Close mobile menu after click
    if (window.innerWidth <= 768) {
      nav.classList.remove('active');
    }
  });
});

// Highlight active section
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');

  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100; // Adjust for fixed header
    const sectionHeight = section.offsetHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

console.log('Filter buttons found:', filterButtons.length);
console.log('Gallery items found:', galleryItems.length);

filterButtons.forEach(button => {
  button.addEventListener('click', function() {
    console.log('Filter button clicked:', this.getAttribute('data-filter'));
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    
    const filter = this.getAttribute('data-filter');
    
    // Filter gallery items
    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      console.log('Item category:', category, 'Filter:', filter, 'Match:', filter === 'all' || category === filter);
      
      if (filter === 'all' || category === filter) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// Modal functionality for images
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeBtn = document.getElementsByClassName('close')[0];
const prevBtn = document.querySelector('.modal-prev');
const nextBtn = document.querySelector('.modal-next');

let currentImageIndex = 0;
let visibleImages = [];

// Function to update visible images array
function updateVisibleImages() {
  visibleImages = Array.from(document.querySelectorAll('.gallery-item:not(.hidden) img'));
}

// Function to show image in modal
function showImage(index) {
  if (visibleImages.length === 0) return;
  
  currentImageIndex = (index + visibleImages.length) % visibleImages.length;
  const img = visibleImages[currentImageIndex];
  modalImg.src = img.src;
  modalCaption.textContent = img.alt;
  modal.style.display = 'block';
  document.body.classList.add('modal-open');
}

// Add click event to all images in gallery
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', function() {
    updateVisibleImages();
    currentImageIndex = visibleImages.indexOf(this);
    showImage(currentImageIndex);
  });
});

// Navigation buttons
prevBtn.addEventListener('click', function() {
  showImage(currentImageIndex - 1);
});

nextBtn.addEventListener('click', function() {
  showImage(currentImageIndex + 1);
});

// Close modal when clicking close button
closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
});

// Close modal when clicking outside the image
modal.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
  if (modal.style.display === 'block') {
    if (event.key === 'Escape') {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
    } else if (event.key === 'ArrowLeft') {
      showImage(currentImageIndex - 1);
    } else if (event.key === 'ArrowRight') {
      showImage(currentImageIndex + 1);
    }
  }
});

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const company = document.getElementById('company').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;
  
  // Create email body
  const emailBody = `Namn: ${name}\nE-post: ${email}\nTelefonnummer: ${phone}\nFöretag: ${company || 'Ej angett'}\nÄmne: ${subject}\n\nMeddelande:\n${message}`;
  
  // Create mailto link
  const mailtoLink = `mailto:martin@ojdahl.com?subject=Ny kontakt från ${encodeURIComponent(name)}&body=${encodeURIComponent(emailBody)}`;
  
  // Show success message
  const formMessage = document.getElementById('formMessage');
  formMessage.className = 'form-message success';
  formMessage.textContent = 'Tack för ditt meddelande! Vi återkommer till dig snarast.';
  
  // Open email client
  window.location.href = mailtoLink;
  
  // Reset form
  this.reset();
  
  // Hide message after 5 seconds
  setTimeout(() => {
    formMessage.className = 'form-message';
  }, 5000);
});