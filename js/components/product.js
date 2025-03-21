document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const body = document.body;

    // Toggle menu function
    function toggleMenu() {
        menuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Add click event to menu button
    menuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileNav.contains(e.target) && !menuBtn.contains(e.target) && mobileNav.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Close menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Close menu on resize if open
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileNav.classList.contains('active')) {
            toggleMenu();
        }
    });
    let index = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function moveSlide(direction) {
    index += direction;
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    document.querySelector('.slider').style.transform = `translateX(-${index * (100 + 20)}%)`;
}
    
});
let index = 10;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function moveSlide(direction) {
    index += direction;
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    document.querySelector('.slider').style.transform = `translateX(-${index * (100)}%)`;
}
    
