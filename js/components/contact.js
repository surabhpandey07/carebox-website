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
    // FAQ functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    question.addEventListener('click', () => {
    const column = item.closest('.faq-column');
    const isActive = item.classList.contains('active');
    // Close other items in the same column
    if (column) {
    column.querySelectorAll('.faq-item').forEach(otherItem => {
    if (otherItem !== item && otherItem.classList.contains('active')) {
    otherItem.classList.remove('active');
    const otherAnswer = otherItem.querySelector('.faq-answer');
    if (otherAnswer) {
    otherAnswer.style.maxHeight = '0px';
    }
    }
    });
    }
    // Toggle current item
    item.classList.toggle('active');
    if (!isActive) {
    answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
    answer.style.maxHeight = '0px';
    }
    });
    });
    // Handle resize for FAQ items
    let resizeTimeout;
    window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
    faqItems.forEach(item => {
    if (item.classList.contains('active')) {
    const answer = item.querySelector('.faq-answer');
    if (answer) {
    answer.style.maxHeight = answer.scrollHeight + 'px';
    }
    }
    });
    }, 100);
    });
    });