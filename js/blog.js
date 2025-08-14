document.addEventListener('DOMContentLoaded', function() {
    // Blog Search Functionality
    const searchForm = document.querySelector('.blog-search form');
    const searchInput = document.querySelector('.blog-search input');
    const blogPosts = document.querySelectorAll('.blog-post');
    const noBlogResults = document.createElement('div');
    noBlogResults.className = 'no-results';
    noBlogResults.innerHTML = '<p>No blog posts found matching your search.</p>';
    noBlogResults.style.display = 'none';
    
    if (document.querySelector('.blog-grid')) {
        document.querySelector('.blog-grid').appendChild(noBlogResults);
    }
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // If search is empty, show all posts
                blogPosts.forEach(post => {
                    post.style.display = 'block';
                });
                noBlogResults.style.display = 'none';
                return;
            }
            
            let foundPosts = 0;
            
            blogPosts.forEach(post => {
                const title = post.querySelector('h3').textContent.toLowerCase();
                const excerpt = post.querySelector('.blog-excerpt').textContent.toLowerCase();
                const category = post.querySelector('.blog-category').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
                    post.style.display = 'block';
                    foundPosts++;
                } else {
                    post.style.display = 'none';
                }
            });
            
            noBlogResults.style.display = foundPosts === 0 ? 'block' : 'none';
        });
    }
    
    // Blog Category Filtering
    const categoryLinks = document.querySelectorAll('.category-list a');
    
    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const category = this.getAttribute('data-category');
                let foundPosts = 0;
                
                blogPosts.forEach(post => {
                    const postCategory = post.getAttribute('data-category');
                    
                    if (category === 'all' || postCategory === category) {
                        post.style.display = 'block';
                        foundPosts++;
                    } else {
                        post.style.display = 'none';
                    }
                });
                
                noBlogResults.style.display = foundPosts === 0 ? 'block' : 'none';
                
                // Update active category
                categoryLinks.forEach(catLink => {
                    catLink.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    }
    
    // Popular Posts Hover Effect
    const popularPosts = document.querySelectorAll('.popular-post');
    
    popularPosts.forEach(post => {
        post.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        post.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
});