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

    const faqItems = document.querySelectorAll('.faq-item');
    const faqSection = document.querySelector('.infai-website-with-background-child');
    const faqColumns = document.querySelectorAll('.faq-column');

    function updateColumnHeight(column) {
        let columnHeight = 0;
        const items = column.querySelectorAll('.faq-item');
        
        items.forEach(item => {
            columnHeight += item.offsetHeight;
            if (item.classList.contains('active')) {
                const answer = item.querySelector('.faq-answer');
                columnHeight += answer.scrollHeight;
            }
        });
        
        return columnHeight;
    }

    function updateSectionHeight() {
        const columnHeights = Array.from(faqColumns).map(updateColumnHeight);
        const maxColumnHeight = Math.max(...columnHeights);
        const totalHeight = maxColumnHeight + 144;

        requestAnimationFrame(() => {
            faqSection.style.transition = 'height 0.3s ease-out';
            faqSection.style.height = `${totalHeight}px`;
        });
    }

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const column = item.closest('.faq-column');
            const isActive = item.classList.contains('active');
            
            // Close other items in the same column
            column.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0px';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            if (!isActive) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                setTimeout(updateSectionHeight, 300);
            } else {
                answer.style.maxHeight = '0px';
                setTimeout(updateSectionHeight, 300);
            }
        });
    });

    // Handle resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateSectionHeight, 100);
    });

    // Initial height setup
    updateSectionHeight();
});