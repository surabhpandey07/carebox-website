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
    if (menuBtn) {
    menuBtn.addEventListener('click', toggleMenu);
    }
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
    if (mobileNav && menuBtn && !mobileNav.contains(e.target) && !menuBtn.contains(e.target) && mobileNav.classList.contains('active')) {
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
    if (mobileNav && window.innerWidth > 768 && mobileNav.classList.contains('active')) {
    toggleMenu();
    }
    });
    // --- MAIN HOMEPAGE SLIDER ---
    const mainSlider = document.querySelector('.slider:not(.why-carebox-slider-section .slider):not(.section1 .slider)');
    const mainSlides = document.querySelectorAll('.slider:not(.why-carebox-slider-section .slider):not(.section1 .slider) .slide');
    const mainPrevButton = document.querySelector('.prev:not(.why-carebox-slider-section .prev):not(.section1 .prev)');
    const mainNextButton = document.querySelector('.next:not(.why-carebox-slider-section .next):not(.section1 .next)');
    if (mainSlider && mainSlides.length > 0 && mainPrevButton && mainNextButton) {
    let mainCurrentIndex = 0;
    let mainTotalSlides = mainSlides.length;
    function updateMainSlider() {
    let slideWidth = mainSlides[0].offsetWidth;
    mainSlider.style.transform = `translateX(-${mainCurrentIndex * slideWidth}px)`;
    }
    mainNextButton.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (mainCurrentIndex < mainTotalSlides - 1) {
    mainCurrentIndex++;
    } else {
    mainCurrentIndex = 0; // Loop back to start
    }
    updateMainSlider();
    });
    mainPrevButton.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (mainCurrentIndex > 0) {
    mainCurrentIndex--;
    } else {
    mainCurrentIndex = mainTotalSlides - 1; // Loop to end
    }
    updateMainSlider();
    });
    // Ensure correct positioning on window resize
    window.addEventListener("resize", updateMainSlider);
    // Initial setup
    updateMainSlider();
    }
    // --- TEAM MEMBERS SLIDER ---
    const teamSlider = document.querySelector('.section1 .slider');
    const teamSlides = document.querySelectorAll('.section1 .slide');
    const teamPrevBtn = document.querySelector('.section1 .prev');
    const teamNextBtn = document.querySelector('.section1 .next');
    const teamDots = document.querySelectorAll('.section1 .dot');

    if (teamSlider && teamSlides.length > 0 && teamPrevBtn && teamNextBtn) {
        let teamCurrentIndex = 0;
        let teamSlidesToShow = getTeamSlidesToShow();

        function getTeamSlidesToShow() {
            if (window.innerWidth <= 768) {
                return 1;
            } else if (window.innerWidth <= 1024) {
                return 2;
            } else {
                return 3;
            }
        }

        function updateTeamSlider() {
            if (!teamSlider) return;
            const slideWidth = teamSlides[0].offsetWidth;
            teamSlider.style.transition = 'transform 0.5s ease-in-out';
            teamSlider.style.transform = `translateX(-${teamCurrentIndex * slideWidth}px)`;

            // Update active dot
            if (teamDots && teamDots.length > 0) {
                teamDots.forEach((dot, index) => {
                    dot.classList.toggle('active', Math.floor(teamCurrentIndex / teamSlidesToShow) === index);
                });
            }
        }

        teamPrevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (teamCurrentIndex > 0) {
                teamCurrentIndex--;
            } else {
                teamCurrentIndex = teamSlides.length - teamSlidesToShow;
            }
            updateTeamSlider();
        });

        teamNextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const maxIndex = teamSlides.length - teamSlidesToShow;
            if (teamCurrentIndex < maxIndex) {
                teamCurrentIndex++;
            } else {
                teamCurrentIndex = 0;
            }
            updateTeamSlider();
        });

        // Dot navigation
        if (teamDots && teamDots.length > 0) {
            teamDots.forEach((dot, index) => {
                dot.addEventListener('click', (e) => {
                    e.preventDefault();
                    teamCurrentIndex = index * teamSlidesToShow;
                    if (teamCurrentIndex > teamSlides.length - teamSlidesToShow) {
                        teamCurrentIndex = teamSlides.length - teamSlidesToShow;
                    }
                    updateTeamSlider();
                });
            });
        }

        // Handle window resize
        window.addEventListener('resize', function() {
            const newSlidesToShow = getTeamSlidesToShow();
            if (newSlidesToShow !== teamSlidesToShow) {
                teamSlidesToShow = newSlidesToShow;
                teamCurrentIndex = Math.min(teamCurrentIndex, teamSlides.length - teamSlidesToShow);
                updateTeamSlider();
            }
        });

        // Initialize slider
        updateTeamSlider();
    }
    // --- WHY CARE BOX SLIDER ---
    const careboxSlider = document.querySelector('.why-carebox-slider-section .slider');
    const careboxSlides = document.querySelectorAll('.why-carebox-slider-section .slide');
    const careboxPrevBtn = document.querySelector('.why-carebox-slider-section .prev');
    const careboxNextBtn = document.querySelector('.why-carebox-slider-section .next');
    const careboxDots = document.querySelectorAll('.why-carebox-slider-section .dot');
    if (careboxSlider && careboxSlides.length > 0 && careboxPrevBtn && careboxNextBtn) {
    let careboxCurrentIndex = 0;
    let careboxSlidesToShow = getCareboxSlidesToShow();
    function getCareboxSlidesToShow() {
    if (window.innerWidth <= 768) {
    return 1;
    } else if (window.innerWidth <= 1024) {
    return 2;
    } else {
    return 3;
    }
    }
    function updateCareboxSlider() {
    if (!careboxSlider) return;
    const slideWidth = careboxSlides[0].offsetWidth;
    careboxSlider.style.transform = `translateX(-${careboxCurrentIndex * slideWidth}px)`;
    // Update active dot
    if (careboxDots && careboxDots.length > 0) {
    careboxDots.forEach((dot, index) => {
    dot.classList.toggle('active', Math.floor(careboxCurrentIndex / careboxSlidesToShow) === index);
    });
    }
    }
    careboxPrevBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Care Box prev button clicked");
    if (careboxCurrentIndex > 0) {
    careboxCurrentIndex--;
    } else {
    careboxCurrentIndex = careboxSlides.length - careboxSlidesToShow;
    }
    updateCareboxSlider();
    });
    careboxNextBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("Care Box next button clicked");
    const maxIndex = careboxSlides.length - careboxSlidesToShow;
    if (careboxCurrentIndex < maxIndex) {
    careboxCurrentIndex++;
    } else {
    careboxCurrentIndex = 0;
    }
    updateCareboxSlider();
    });
    // Dot navigation
    if (careboxDots && careboxDots.length > 0) {
    careboxDots.forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
    e.preventDefault();
    careboxCurrentIndex = index * careboxSlidesToShow;
    if (careboxCurrentIndex > careboxSlides.length - careboxSlidesToShow) {
    careboxCurrentIndex = careboxSlides.length - careboxSlidesToShow;
    }
    updateCareboxSlider();
    });
    });
    }
    window.addEventListener('resize', function() {
    const newSlidesToShow = getCareboxSlidesToShow();
    if (newSlidesToShow !== careboxSlidesToShow) {
    careboxSlidesToShow = newSlidesToShow;
    careboxCurrentIndex = Math.min(careboxCurrentIndex, careboxSlides.length - careboxSlidesToShow);
    updateCareboxSlider();
    }
    });
    // Initialize slider
    updateCareboxSlider();
    }
    // Animation sections
    const sections = document.querySelectorAll('.backgroundshadow-parent');
    const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.classList.add('show');
    observer.unobserve(entry.target);
    }
    });
    }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
    });
    sections.forEach(section => {
    observer.observe(section);
    });
    // Mobile specific code
    if (window.innerWidth <= 768) {
    const section = document.querySelector('.section');
    // Ensure proper height on mobile browsers
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    // Update on resize
    window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
    // Function to update container height
    function updateContainerHeight() {
    const container = document.querySelector('.infai-website-with-background');
    const footer = document.querySelector('.mobile-footer');
    const lastSection = document.querySelector('.why-carebox-section');
    if (container && footer && lastSection) {
    const totalHeight = lastSection.offsetTop + lastSection.offsetHeight + footer.offsetHeight + 100;
    container.style.height = `${totalHeight}px`;
    }
    }
    // Update height on load and resize
    updateContainerHeight();
    window.addEventListener('resize', updateContainerHeight);
    }
    });