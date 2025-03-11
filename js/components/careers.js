document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const body = document.body;
    
    // Initialize menu state
    let isMenuOpen = false;
    let touchStartX = 0;
    let touchStartY = 0;

    function toggleMenu(instant = false) {
        if (!menuBtn || !mobileNav) return;
        
        isMenuOpen = !isMenuOpen;
        const duration = instant ? 0 : 300;

        // Update button state
        menuBtn.setAttribute('aria-expanded', String(isMenuOpen));
        menuBtn.classList.toggle('active', isMenuOpen);

        // Update menu state with animation
        if (!isMenuOpen) {
            mobileNav.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            mobileNav.style.transform = 'translateX(-100%)';
            
            setTimeout(() => {
                mobileNav.classList.remove('active');
                body.classList.remove('menu-open');
                body.style.overflow = '';
            }, duration);
        } else {
            mobileNav.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
            mobileNav.classList.add('active');
            body.classList.add('menu-open');
            body.style.overflow = 'hidden';
            
            requestAnimationFrame(() => {
                mobileNav.style.transform = 'translateX(0)';
            });
        }
    }

    // Improved touch handling
    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }

    function handleTouchMove(e) {
        if (!isMenuOpen) return;

        const touchCurrentX = e.touches[0].clientX;
        const touchCurrentY = e.touches[0].clientY;
        const deltaX = touchStartX - touchCurrentX;
        const deltaY = Math.abs(touchStartY - touchCurrentY);

        // Ensure horizontal swipe
        if (deltaX > 0 && deltaY < Math.abs(deltaX)) {
            e.preventDefault();
            mobileNav.style.transition = 'none';
            const newPosition = Math.max(-deltaX, -100);
            mobileNav.style.transform = `translateX(${newPosition}%)`;
        }
    }

    function handleTouchEnd(e) {
        if (!isMenuOpen) return;

        const deltaX = touchStartX - e.changedTouches[0].clientX;
        
        if (deltaX > 50) { // Swipe threshold
            toggleMenu();
        } else {
            // Reset position
            mobileNav.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            mobileNav.style.transform = 'translateX(0)';
        }
    }

    // Event Listeners
    menuBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        toggleMenu();
    });

    mobileNav?.addEventListener('touchstart', handleTouchStart, { passive: true });
    mobileNav?.addEventListener('touchmove', handleTouchMove, { passive: false });
    mobileNav?.addEventListener('touchend', handleTouchEnd, { passive: true });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && 
            !mobileNav?.contains(e.target) && 
            !menuBtn?.contains(e.target)) {
            toggleMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });

    // Improved resize handler
    const debounce = (fn, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), delay);
        };
    };

    window.addEventListener('resize', debounce(() => {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMenu(true);
        }
    }, 250));

    // Handle menu links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-item');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });
});