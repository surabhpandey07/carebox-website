document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking menu items
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function() {
            menuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
});