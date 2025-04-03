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
});
window.addEventListener('resize', function () {
    let img = document.getElementById("dashboardImage");
    if (window.innerWidth <= 768) {
        img.src = "/assets/images/mobile-image.png"; // Change to mobile image
    } else {
        img.src = "/assets/images/desktop-image.png"; // Keep desktop image
    }
});

// Run once on load
window.dispatchEvent(new Event('resize'));
