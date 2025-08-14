document.addEventListener('DOMContentLoaded', function() {
    const applyFiltersBtn = document.getElementById('apply-filters');
    
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            const countryFilter = document.getElementById('country-filter').value;
            const activityFilter = document.getElementById('activity-filter').value;
            const difficultyFilter = document.getElementById('difficulty-filter').value;
            const durationFilter = document.getElementById('duration-filter').value;
            
            const destinationCards = document.querySelectorAll('.destination-card');
            let visibleCount = 0;
            
            destinationCards.forEach(card => {
                const country = card.getAttribute('data-country');
                const activity = card.getAttribute('data-activity');
                const difficulty = card.getAttribute('data-difficulty');
                const duration = card.getAttribute('data-duration');
                
                const countryMatch = countryFilter === 'all' || country === countryFilter;
                const activityMatch = activityFilter === 'all' || activity === activityFilter;
                const difficultyMatch = difficultyFilter === 'all' || difficulty === difficultyFilter;
                const durationMatch = durationFilter === 'all' || duration === durationFilter;
                
                if (countryMatch && activityMatch && difficultyMatch && durationMatch) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            
            const noResults = document.getElementById('no-results');
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        });
    }
});