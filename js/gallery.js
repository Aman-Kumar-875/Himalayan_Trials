document.addEventListener('DOMContentLoaded', function() {
    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Gallery Modal
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    const closeModal = document.querySelector('.close-modal');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    let currentIndex = 0;
    const visibleItems = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');
    
    // Open modal when clicking on gallery zoom icon
    document.querySelectorAll('.gallery-zoom').forEach((zoomIcon, index) => {
        zoomIcon.addEventListener('click', function(e) {
            e.preventDefault();
            
            const item = this.closest('.gallery-item');
            const visible = visibleItems();
            currentIndex = visible.indexOf(item);
            
            const img = item.querySelector('img');
            const title = item.querySelector('h3').textContent;
            const desc = item.querySelector('p').textContent;
            
            modalImg.src = img.src;
            modalCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
            modal.style.display = 'block';
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Previous image
    prevBtn.addEventListener('click', function() {
        const visible = visibleItems();
        currentIndex = (currentIndex - 1 + visible.length) % visible.length;
        const item = visible[currentIndex];
        
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const desc = item.querySelector('p').textContent;
        
        modalImg.src = img.src;
        modalCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
    });
    
    // Next image
    nextBtn.addEventListener('click', function() {
        const visible = visibleItems();
        currentIndex = (currentIndex + 1) % visible.length;
        const item = visible[currentIndex];
        
        const img = item.querySelector('img');
        const title = item.querySelector('h3').textContent;
        const desc = item.querySelector('p').textContent;
        
        modalImg.src = img.src;
        modalCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                prevBtn.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn.click();
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });
});