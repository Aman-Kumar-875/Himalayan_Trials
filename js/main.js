// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Enhanced Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Thank you for subscribing to our newsletter!';
                successMessage.style.color = '#28a745';
                successMessage.style.marginTop = '10px';
                successMessage.style.fontWeight = 'bold';
                
                // Add success message after the form
                this.parentNode.appendChild(successMessage);
                
                // Reset form
                emailInput.value = '';
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }
        });
    }
    
    // Contact form validation and submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const nameInput = this.querySelector('input[name="name"]');
            const emailInput = this.querySelector('input[name="email"]');
            const messageInput = this.querySelector('textarea[name="message"]');
            
            // Reset previous error messages
            this.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Validate name
            if (!nameInput.value.trim()) {
                displayError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (!emailInput.value.trim()) {
                displayError(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                displayError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                displayError(messageInput, 'Please enter your message');
                isValid = false;
            }
            
            if (isValid) {
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                successMessage.style.color = '#28a745';
                successMessage.style.padding = '15px';
                successMessage.style.marginTop = '20px';
                successMessage.style.backgroundColor = 'rgba(40, 167, 69, 0.1)';
                successMessage.style.borderRadius = '4px';
                successMessage.style.fontWeight = 'bold';
                
                // Add success message after the form
                this.parentNode.appendChild(successMessage);
                
                // Reset form
                this.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
        
        // Helper function to display error messages
        function displayError(input, message) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            errorMessage.style.color = '#dc3545';
            errorMessage.style.fontSize = '0.85rem';
            errorMessage.style.marginTop = '5px';
            
            input.parentNode.appendChild(errorMessage);
            input.style.borderColor = '#dc3545';
            
            // Remove error styling when input changes
            input.addEventListener('input', function() {
                this.style.borderColor = '';
                const error = this.parentNode.querySelector('.error-message');
                if (error) error.remove();
            });
        }
        
        // Helper function to validate email format
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    }
    
    // Booking form validation and submission
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation (similar to contact form)
            let isValid = true;
            // Add validation for all required booking fields
            
            if (isValid) {
                // Show booking confirmation
                const bookingSection = document.querySelector('.booking-section');
                const confirmationMessage = document.createElement('div');
                confirmationMessage.className = 'booking-confirmation';
                confirmationMessage.innerHTML = `
                    <div class="confirmation-content">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: #28a745; margin-bottom: 20px;"></i>
                        <h2>Booking Request Received!</h2>
                        <p>Thank you for your booking request. Our team will review your details and contact you within 24 hours to confirm your reservation.</p>
                        <p>A confirmation email has been sent to your email address.</p>
                        <button class="btn" id="back-to-home">Back to Home</button>
                    </div>
                `;
                
                confirmationMessage.style.position = 'fixed';
                confirmationMessage.style.top = '0';
                confirmationMessage.style.left = '0';
                confirmationMessage.style.width = '100%';
                confirmationMessage.style.height = '100%';
                confirmationMessage.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                confirmationMessage.style.display = 'flex';
                confirmationMessage.style.alignItems = 'center';
                confirmationMessage.style.justifyContent = 'center';
                confirmationMessage.style.zIndex = '1000';
                
                document.body.appendChild(confirmationMessage);
                
                // Back to home button
                document.getElementById('back-to-home').addEventListener('click', function() {
                    window.location.href = 'index.html';
                });
            }
        });
    }
});