document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Slider Functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-controls .prev-btn');
    const nextBtn = document.querySelector('.testimonial-controls .next-btn');
    
    // Add more testimonials dynamically for a better slider experience
    const testimonials = [
        {
            content: "The Everest Base Camp trek with Himalayan Trials was the adventure of a lifetime. The guides were knowledgeable and supportive throughout the journey.",
            author: "Sarah Johnson",
            trip: "Everest Base Camp Trek",
            image: "https://randomuser.me/api/portraits/women/32.jpg"
        },
        {
            content: "The attention to detail and personalized service made our Annapurna Circuit trek exceptional. I can't recommend Himalayan Trials enough!",
            author: "Michael Chen",
            trip: "Annapurna Circuit Trek",
            image: "https://randomuser.me/api/portraits/men/45.jpg"
        },
        {
            content: "Our Langtang Valley trek was perfectly organized. The views were breathtaking and our guide was extremely knowledgeable about the local culture.",
            author: "Emma Wilson",
            trip: "Langtang Valley Trek",
            image: "https://randomuser.me/api/portraits/women/22.jpg"
        },
        {
            content: "The Upper Mustang trek was a cultural immersion like no other. Himalayan Trials ensured we had authentic experiences while maintaining comfort.",
            author: "David Thompson",
            trip: "Upper Mustang Trek",
            image: "https://randomuser.me/api/portraits/men/67.jpg"
        }
    ];
    
    // Current slide index
    let currentIndex = 0;
    const visibleCards = 2; // Number of cards visible at once on desktop
    
    // Initialize slider with all testimonials
    function initializeSlider() {
        // Clear existing testimonials
        testimonialSlider.innerHTML = '';
        
        // Add all testimonials to the slider
        testimonials.forEach(testimonial => {
            const card = createTestimonialCard(testimonial);
            testimonialSlider.appendChild(card);
        });
        
        // Update the display
        updateSlider();
    }
    
    // Create a testimonial card element
    function createTestimonialCard(testimonial) {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        
        card.innerHTML = `
            <div class="testimonial-content">
                <p>"${testimonial.content}"</p>
            </div>
            <div class="testimonial-author">
                <img src="${testimonial.image}" alt="${testimonial.author}">
                <div class="author-info">
                    <h4>${testimonial.author}</h4>
                    <p>${testimonial.trip}</p>
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                </div>
            </div>
        `;
        
        return card;
    }
    
    // Update slider display based on current index
    function updateSlider() {
        const allCards = document.querySelectorAll('.testimonial-slider .testimonial-card');
        
        allCards.forEach((card, index) => {
            // On mobile, show only one card at a time
            if (window.innerWidth < 768) {
                card.style.display = index === currentIndex ? 'block' : 'none';
            } else {
                // On desktop, show two cards at a time
                if (index >= currentIndex && index < currentIndex + visibleCards) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }
    
    // Previous slide
    function prevSlide() {
        const allCards = document.querySelectorAll('.testimonial-slider .testimonial-card');
        currentIndex = (currentIndex - 1 + allCards.length) % (allCards.length - (window.innerWidth < 768 ? 0 : visibleCards - 1));
        updateSlider();
    }
    
    // Next slide
    function nextSlide() {
        const allCards = document.querySelectorAll('.testimonial-slider .testimonial-card');
        currentIndex = (currentIndex + 1) % (allCards.length - (window.innerWidth < 768 ? 0 : visibleCards - 1));
        updateSlider();
    }
    
    // Event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }
    
    // Handle window resize
    window.addEventListener('resize', updateSlider);
    
    // Initialize the slider
    initializeSlider();
    
    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);
});