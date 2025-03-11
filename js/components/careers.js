document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.home-parent');
    const spans = mobileMenuBtn.querySelectorAll('span');
  
    // Toggle menu function
    const toggleMenu = (show) => {
        mobileMenu.classList.toggle('active', show);
        
        spans[0].style.transform = show ? 'rotate(45deg) translate(5px, 5px)' : 'none';
        spans[1].style.opacity = show ? '0' : '1';
        spans[2].style.transform = show ? 'rotate(-45deg) translate(7px, -7px)' : 'none';
    };
  
    // Toggle on button click
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const willShow = !mobileMenu.classList.contains('active');
        toggleMenu(willShow);
    });
  
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            toggleMenu(false);
        }
    });
  
    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 480) {
            toggleMenu(false);
        }
    });
  
    // Prevent menu close when clicking inside menu
    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});