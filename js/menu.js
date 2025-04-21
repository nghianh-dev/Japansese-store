// Menu Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Tạo mảng chứa tất cả các món ăn để tìm kiếm
    const allDishes = [];

    // Thu thập tất cả các món ăn từ trang
    document.querySelectorAll('.menu-card').forEach(card => {
        const name = card.querySelector('h4').textContent;
        const description = card.querySelector('p').textContent;
        const price = card.querySelector('.price').textContent;
        const image = card.querySelector('img').getAttribute('src');
        const category = card.closest('.menu-category').getAttribute('id');

        allDishes.push({
            name,
            description,
            price,
            image,
            category,
            element: card
        });
    });
    // Get all category tabs and menu categories
    const categoryTabs = document.querySelectorAll('.category-tab');
    const menuCategories = document.querySelectorAll('.menu-category');

    // Add click event to each category tab
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Get the category to show
            const category = this.getAttribute('data-category');

            // Show/hide categories based on selection
            if (category === 'all') {
                // Show all categories
                menuCategories.forEach(cat => {
                    cat.style.display = 'block';
                });
            } else {
                // Hide all categories first
                menuCategories.forEach(cat => {
                    cat.style.display = 'none';
                });

                // Show only the selected category
                document.getElementById(category).style.display = 'block';
            }

            // Scroll to the top of the menu section
            document.querySelector('.menu-categories').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Add animation to menu cards
    const menuCards = document.querySelectorAll('.menu-card');

    // Set animation delay for each card
    menuCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Animate elements when they come into view
    function animateOnScroll() {
        menuCards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('fade-in');
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);

    // Initial check on page load
    animateOnScroll();

    // Search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');

    // Function to perform search
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        // Clear previous results
        searchResults.innerHTML = '';

        // Hide search results if search term is empty
        if (searchTerm === '') {
            searchResults.classList.remove('active');
            return;
        }

        // Filter dishes based on search term
        const filteredDishes = allDishes.filter(dish =>
            dish.name.toLowerCase().includes(searchTerm) ||
            dish.description.toLowerCase().includes(searchTerm)
        );

        // Display search results
        if (filteredDishes.length > 0) {
            filteredDishes.forEach(dish => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <div class="search-result-image">
                        <img src="${dish.image}" alt="${dish.name}">
                    </div>
                    <div class="search-result-info">
                        <h4>${dish.name}</h4>
                        <p>${dish.description.length > 60 ? dish.description.substring(0, 60) + '...' : dish.description}</p>
                    </div>
                    <div class="search-result-price">${dish.price}</div>
                `;

                // Add click event to scroll to the dish
                resultItem.addEventListener('click', function() {
                    // Hide search results
                    searchResults.classList.remove('active');

                    // Show the category containing the dish
                    categoryTabs.forEach(tab => tab.classList.remove('active'));
                    document.querySelector(`[data-category="${dish.category}"]`).classList.add('active');

                    menuCategories.forEach(cat => {
                        cat.style.display = 'none';
                    });
                    document.getElementById(dish.category).style.display = 'block';

                    // Scroll to the dish
                    dish.element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Highlight the dish
                    dish.element.classList.add('highlight');
                    setTimeout(() => {
                        dish.element.classList.remove('highlight');
                    }, 2000);
                });

                searchResults.appendChild(resultItem);
            });
        } else {
            // No results found
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'Không tìm thấy món ăn nào phù hợp';
            searchResults.appendChild(noResults);
        }

        // Show search results
        searchResults.classList.add('active');
    }

    // Search on button click
    searchButton.addEventListener('click', performSearch);

    // Search on Enter key press
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    // Hide search results when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) &&
            !searchButton.contains(event.target) &&
            !searchResults.contains(event.target)) {
            searchResults.classList.remove('active');
        }
    });

    // Live search as user types (with debounce)
    let debounceTimer;
    searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(performSearch, 300);
    });
});
