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

// Initialize EmailJS with your public key
emailjs.init("wPwbsxblEbS3a4fz7");

function sendEmail(e) {
    e.preventDefault();

    // Show loading state
    const submitButton = document.querySelector('.submit');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';

    // Get form data
    const form = document.getElementById('careerForm');
    const formData = new FormData(form);
    
    // Get file data
    const fileInput = document.getElementById('resume');
    const file = fileInput.files[0];
    
    // Create template parameters
    const templateParams = {
        to_email: 'saurabhpandeygithub07@gmail.com', // Replace with your email
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        phone: formData.get('phone'),
        designation: formData.get('designation'),
        resume_name: file ? file.name : 'No file attached'
    };

    // Send email using EmailJS
    emailjs.send('service_m9qqw3e', 'template_ui84cru', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            submitButton.textContent = 'Success!';
            form.reset();
            setTimeout(() => {
                submitButton.textContent = originalText;
            }, 2000);
            alert('Your application has been submitted successfully!');
        }, function(error) {
            console.log('FAILED...', error);
            submitButton.textContent = originalText;
            alert('Failed to send application. Please try again.');
        });

    return false;
}
// File upload handling with success message
document.getElementById('resume').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const uploadLabel = document.querySelector('.click-to-upload');
    const dragDropText = document.querySelector('.or-drag-and');
    
    if (file) {
        if (file.size > 1024 * 1024) { // 1MB limit
            alert('File size must be less than 1MB');
            this.value = '';
            return;
        }
        
        // Show success message
        uploadLabel.textContent = '✓ ' + file.name;
        dragDropText.textContent = 'File uploaded successfully';
        document.querySelector('.upload-label').classList.add('success');
    }
});

// File size validation
document.getElementById('resume').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file && file.size > 1024 * 1024) { // 1MB
        alert('File size must be less than 1MB');
        this.value = '';
    }
});
