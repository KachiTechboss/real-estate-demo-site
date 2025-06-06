const properties = [
    {
        id: 1,
        price: 350000,
        beds: 3,
        baths: 3,
        sqft: 2000,
        address: "18 W Arcana St, Detroit, MI 48203",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=250&fit=crop",
        type: "house",
        status: "sale"
    },
    {
        id: 2,
        price: 450000,
        beds: 3,
        baths: 4,
        sqft: 1250,
        address: "18 W Arcana St, Detroit, MI 48203",
        image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=250&fit=crop",
        type: "apartment",
        status: "sale"
    },
    {
        id: 3,
        price: 300000,
        beds: 4,
        baths: 3,
        sqft: 1690,
        address: "18 W Arcana St, Detroit, MI 48203",
        image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=400&h=250&fit=crop",
        type: "apartment",
        status: "sale"
    },
    {
        id: 4,
        price: 250000,
        beds: 3,
        baths: 3,
        sqft: 1000,
        address: "18 W Arcana St, Detroit, MI 48203",
        image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=400&h=250&fit=crop",
        type: "house",
        status: "sale"
    },
    {
        id: 5,
        price: 555000,
        beds: 3,
        baths: 3,
        sqft: 1090,
        address: "18 W Arcana St, Detroit, MI 48203",
        image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=400&h=250&fit=crop",
        type: "house",
        status: "sale"
    },
    {
        id: 6,
        price: 500000,
        beds: 3,
        baths: 3,
        sqft: 1080,
        address: "18 W Arcana St, Detroit, MI 48203",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=250&fit=crop",
        type: "house",
        status: "sale"
    },
    {
        id: 7,
        price: 150000,
        beds: 3,
        baths: 3,
        sqft: 1080,
        address: "18 W Arcana St, Detroit, MI 48203",
        image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=250&fit=crop",
        type: "condo",
        status: "sale"
    },
    {
        id: 8,
        price: 310000,
        beds: 3,
        baths: 3,
        sqft: 1080,
        address: "18 W Arcana St, Detroit, MI 48203",
        image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=400&h=250&fit=crop",
        type: "house",
        status: "sale"
    },
    {
        id: 9,
        price: 110000,
        beds: 3,
        baths: 3,
        sqft: 1080,
        address: "18 W Arcana St, Detroit, MI 48203",
        image: "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?w=400&h=250&fit=crop",
        type: "townhouse",
        status: "sale"
    },
    {
        id: 10,
        price: 350000,
        beds: 3,
        baths: 3,
        sqft: 1080,
        address: "18 W Arcana St, Detroit, MI 48203",
        image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=400&h=250&fit=crop",
        type: "house",
        status: "rent"
    },
    {
        id: 11,
        price: 550000,
        beds: 3,
        baths: 3,
        sqft: 1080,
        address: "18 W Arcana St, Detroit, MI 48203",
        image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=400&h=250&fit=crop",
        type: "house",
        status: "sold"
    },
    {
        id: 12,
        price: 250000,
        beds: 3,
        baths: 3,
        sqft: 1080,
        address: "18 W Arcana St, Detroit, MI 48203",
        image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=250&fit=crop",
        type: "condo",
        status: "sale"
    }
];

// DOM Elements
const propertiesGrid = document.getElementById('propertiesGrid');
const resultsCount = document.getElementById('resultsCount');
const locationInput = document.getElementById('locationInput');
const clearLocation = document.getElementById('clearLocation');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const viewBtns = document.querySelectorAll('.view-btn');
const pageBtns = document.querySelectorAll('.page-btn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');

// Filter elements
const forSaleFilter = document.getElementById('forSaleFilter');
const priceFilter = document.getElementById('priceFilter');
const bedsFilter = document.getElementById('bedsFilter');
const homeTypeFilter = document.getElementById('homeTypeFilter');
const moreFilter = document.getElementById('moreFilter');

// State
let currentProperties = [...properties];
let currentPage = 1;
const propertiesPerPage = 6;
let favoriteProperties = new Set();
let mobileMenuOpen = false;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderProperties();
    setupEventListeners();
    animateOnScroll();
    lazyLoadImages();

    // Add subtle entrance animations
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Setup event listeners
function setupEventListeners() {
    // Location input
    locationInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            clearLocation.style.display = 'block';
        } else {
            clearLocation.style.display = 'none';
        }
    });

    clearLocation.addEventListener('click', function() {
        locationInput.value = '';
        this.style.display = 'none';
        locationInput.focus();
    });

    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    
    // Filter changes
    [forSaleFilter, priceFilter, bedsFilter, homeTypeFilter, moreFilter].forEach(filter => {
        filter.addEventListener('change', applyFilters);
    });

    // Sort functionality
    sortSelect.addEventListener('change', handleSort);

    // View options
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            changeView(view);
        });
    });

    // Pagination
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const page = this.dataset.page;
            if (page === 'prev') {
                if (currentPage > 1) currentPage--;
            } else if (page === 'next') {
                const maxPages = Math.ceil(currentProperties.length / propertiesPerPage);
                if (currentPage < maxPages) currentPage++;
            } else {
                currentPage = parseInt(page);
            }
            renderProperties();
            updatePagination();
        });
    });

    // Mobile menu functionality
    mobileMenuBtn.addEventListener('click', function() {
        toggleMobileMenu();
    });
}

// Toggle mobile menu (overlay version only, no login/signup)
function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
    mobileMenuBtn.classList.toggle('active');
    
    // Remove existing mobile menu if it exists
    const existingMenu = document.querySelector('.mobile-menu-overlay');
    if (existingMenu) {
        existingMenu.remove();
    }
    
    if (mobileMenuOpen) {
        // Create mobile menu overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.innerHTML = `
            <div class="mobile-menu-content">
                <div class="mobile-menu-header">
                    <div class="brand-icon">🏠</div>
                    <span class="brand-text">Landlords</span>
                    <button class="mobile-close-btn">×</button>
                </div>
                <nav class="mobile-nav">
                    <a href="#" class="mobile-nav-link">Find a Home</a>
                    <a href="#" class="mobile-nav-link">Sell a Home</a>
                    <a href="#" class="mobile-nav-link">Mortgage</a>
                    <a href="#" class="mobile-nav-link">Join</a>
                    <a href="#" class="mobile-nav-link">Save</a>
                </nav>
                <div class="mobile-actions">
                   <button class="btn-secondary mobile-btn">Login</button>
                  <button class="btn-primary mobile-btn">Sign Up</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Add close functionality
        const closeBtn = overlay.querySelector('.mobile-close-btn');
        closeBtn.addEventListener('click', closeMobileMenu);
        
        // Close when clicking overlay
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeMobileMenu();
            }
        });
        
        // Close when clicking nav links
        const navLinks = overlay.querySelectorAll('.mobile-nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        // Animate in
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
    }
}

// Close mobile menu
function closeMobileMenu() {
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 300);
    }
    mobileMenuOpen = false;
    mobileMenuBtn.classList.remove('active');
}

// Render properties
function renderProperties() {
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    const pageProperties = currentProperties.slice(startIndex, endIndex);

    propertiesGrid.innerHTML = '';
    
    if (pageProperties.length === 0) {
        propertiesGrid.innerHTML = '<div class="no-results">No properties found matching your criteria.</div>';
        return;
    }

    pageProperties.forEach((property, index) => {
        const propertyCard = createPropertyCard(property);
        propertiesGrid.appendChild(propertyCard);
        
        // Animate cards as they appear
        setTimeout(() => {
            propertyCard.style.opacity = '1';
            propertyCard.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Update results count
    resultsCount.textContent = currentProperties.length.toLocaleString();
}

// Create property card
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.className = 'property-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';

    const isFavorite = favoriteProperties.has(property.id);

    card.innerHTML = `
        <div class="property-image">
            <img src="${property.image}" alt="Property ${property.id}" loading="lazy">
            <div class="property-badge">For ${property.status}</div>
            <button class="property-favorite ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${property.id})">
                ${isFavorite ? '❤️' : '🤍'}
            </button>
        </div>
        <div class="property-content">
            <div class="property-price">$${property.price.toLocaleString()}</div>
            <div class="property-details">
                <span class="property-detail">🛏️ ${property.beds} Beds</span>
                <span class="property-detail">🚿 ${property.baths} Bath</span>
                <span class="property-detail">📐 ${property.sqft} Sqft</span>
            </div>
            <div class="property-address">${property.address}</div>
        </div>
    `;

    // Add click handler for property details
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('property-favorite')) {
            showPropertyDetails(property);
        }
    });

    return card;
}

// Toggle favorite
function toggleFavorite(propertyId) {
    if (favoriteProperties.has(propertyId)) {
        favoriteProperties.delete(propertyId);
    } else {
        favoriteProperties.add(propertyId);
    }
    renderProperties();
    
    // Show toast notification
    showToast(favoriteProperties.has(propertyId) ? 'Added to favorites' : 'Removed from favorites');
}

// Apply filters
function applyFilters() {
    currentProperties = properties.filter(property => {
        // Status filter
        if (forSaleFilter.value && property.status !== forSaleFilter.value) {
            return false;
        }

        // Price filter
        if (priceFilter.value) {
            const [min, max] = priceFilter.value.split('-').map(v => parseInt(v) || Infinity);
            if (property.price < min || (max !== Infinity && property.price > max)) {
                return false;
            }
        }

        // Beds filter
        if (bedsFilter.value && property.beds < parseInt(bedsFilter.value)) {
            return false;
        }

        // Home type filter
        if (homeTypeFilter.value && property.type !== homeTypeFilter.value) {
            return false;
        }

        return true;
    });

    currentPage = 1;
    renderProperties();
    updatePagination();
}

// Handle sort
function handleSort() {
    const sortBy = sortSelect.value;
    
    currentProperties.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'sqft':
                return b.sqft - a.sqft;
            case 'newest':
                return b.id - a.id;
            default:
                return 0;
        }
    });

    renderProperties();
}

// Handle search
function handleSearch() {
    const location = locationInput.value.toLowerCase();
    
    if (location) {
        currentProperties = properties.filter(property => 
            property.address.toLowerCase().includes(location)
        );
    } else {
        currentProperties = [...properties];
    }

    applyFilters();
    showToast('Search completed');
}

// Change view
function changeView(view) {
    const grid = document.getElementById('propertiesGrid');
    
    switch (view) {
        case 'grid':
            grid.style.display = 'grid';
            break;
        case 'list':
            grid.style.display = 'flex';
            grid.style.flexDirection = 'column';
            break;
        case 'map':
            showToast('Map view coming soon!');
            break;
    }
}

// Update pagination
function updatePagination() {
    const maxPages = Math.ceil(currentProperties.length / propertiesPerPage);
    
    pageBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === currentPage.toString()) {
            btn.classList.add('active');
        }
    });
}

// Show property details (placeholder)
function showPropertyDetails(property) {
    showToast(`Viewing details for $${property.price.toLocaleString()} property`);
}

// Show toast notification
function showToast(message) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #2c5a2c;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 1001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    `;

    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Animate elements on scroll
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.footer-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states
function showLoading() {
    propertiesGrid.innerHTML = '<div class="loading"></div>';
}

// Simulate API calls with loading states
function simulateApiCall(callback, delay = 1000) {
    showLoading();
    setTimeout(callback, delay);
}

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.transition = 'opacity 0.3s ease';
                img.onload = () => {
                    img.style.opacity = '1';
                };
                // img.style.opacity = '0'; // REMOVE THIS LINE!
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals or menus
        closeMobileMenu();
    }
});

// Set initial body opacity for entrance animation
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';