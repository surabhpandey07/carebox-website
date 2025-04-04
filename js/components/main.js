document.addEventListener('DOMContentLoaded', function() {
    // Existing mobile menu code
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const body = document.body;

    function toggleMenu() {
        menuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    menuBtn?.addEventListener('click', toggleMenu);

    document.addEventListener('click', function(e) {
        if (!mobileNav?.contains(e.target) && !menuBtn?.contains(e.target) && mobileNav?.classList.contains('active')) {
            toggleMenu();
        }
    });

    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileNav?.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Carousel functionality
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    let slideWidth = slides[0]?.getBoundingClientRect().width;

    // Initialize slider
    function initSlider() {
        if (!slider || !slides.length) return;
        
        slideWidth = slides[0].getBoundingClientRect().width;
        slider.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
    }

    // Update slider on window resize
    window.addEventListener('resize', () => {
        initSlider();
    });

    // Next slide function
    function nextSlide() {
        if (!slider || !slides.length) return;
        
        currentSlide = (currentSlide + 1) % slides.length;
        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
    }

    // Previous slide function
    function prevSlide() {
        if (!slider || !slides.length) return;
        
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        slider.style.transition = 'transform 0.5s ease';
        slider.style.transform = `translateX(${-slideWidth * currentSlide}px)`;
    }

    // Add event listeners for buttons
    nextBtn?.addEventListener('click', nextSlide);
    prevBtn?.addEventListener('click', prevSlide);

    // Auto slide functionality
    let autoSlideInterval;

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Start auto sliding
    startAutoSlide();

    // Pause auto sliding on hover
    slider?.addEventListener('mouseenter', stopAutoSlide);
    slider?.addEventListener('mouseleave', startAutoSlide);

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    slider?.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoSlide();
    }, false);

    slider?.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    }, false);

    slider?.addEventListener('touchend', () => {
        const swipeDistance = touchStartX - touchEndX;
        if (Math.abs(swipeDistance) > 50) { // Minimum swipe distance
            if (swipeDistance > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoSlide();
    }, false);

    // Initialize slider on load
    initSlider();
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    let currentSlide = 0;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    }

    // Event listeners
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Auto advance slides
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(slideInterval));
    track.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
        clearInterval(slideInterval);
    });

    track.addEventListener('touchmove', e => {
        touchEndX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', () => {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        slideInterval = setInterval(nextSlide, 5000);
    });
});

// Mobile Why Care Box Carousel
function initMobileCarousel() {
    const track = document.querySelector('.carousel-track');
    if (!track) return;

    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const dotsNav = document.querySelector('.carousel-dots');
    
    let currentIndex = 0;
    let isMoving = false;
    let touchStartX = 0;
    let touchEndX = 0;

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dotsNav.appendChild(dot);
    });

    const dots = Array.from(document.querySelectorAll('.dot'));

    function moveToSlide(index) {
        if (isMoving) return;
        isMoving = true;
        currentIndex = index;
        
        track.style.transform = `translateX(-${index * 100}%)`;
        updateDots();

        setTimeout(() => {
            isMoving = false;
        }, 400);
    }

    function updateDots() {
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Event Listeners
    nextButton?.addEventListener('click', () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
    });

    prevButton?.addEventListener('click', () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(prevIndex);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => moveToSlide(index));
    });

    // Touch events
    track.addEventListener('touchstart', e => {
        touchStartX = e.touches[0].clientX;
        clearInterval(autoplayInterval);
    });

    track.addEventListener('touchmove', e => {
        touchEndX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', () => {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                moveToSlide((currentIndex + 1) % slides.length);
            } else {
                moveToSlide((currentIndex - 1 + slides.length) % slides.length);
            }
        }
        startAutoplay();
    });

    // Autoplay
    let autoplayInterval;

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            moveToSlide((currentIndex + 1) % slides.length);
        }, 5000);
    }

    // Start autoplay and pause on hover
    startAutoplay();
    track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    track.addEventListener('mouseleave', startAutoplay);
}

// Initialize carousel only on mobile
if (window.innerWidth <= 768) {
    initMobileCarousel();
}

window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        initMobileCarousel();
    }
});