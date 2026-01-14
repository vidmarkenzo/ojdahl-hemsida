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
const headerContainer = document.querySelector('header .container');
headerContainer.appendChild(navToggle);

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

// Modal functionality for images
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = document.getElementsByClassName('close')[0];

// Add click event to all images in gallery
document.querySelectorAll('.gallery img').forEach(img => {
  console.log('Binding click event to image:', img.src);
  img.addEventListener('click', function() {
    console.log('Image clicked:', this.src);
    modal.style.display = 'block';
    modalImg.src = this.src;
  });
});

// Close modal when clicking close button
closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Close modal when clicking outside the image
modal.addEventListener('click', function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});