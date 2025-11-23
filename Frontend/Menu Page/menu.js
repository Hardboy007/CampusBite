// Menu Data For DEMO
const menuItems = [
    { id: "1", name: "Aloo Paratha", description: "Crispy whole wheat flatbread stuffed with spiced potato filling", price: 40, image: "https://media.istockphoto.com/id/1951940755/photo/close-up-image-of-indian-breakfast-dish-buffet-triangular-slices-of-aloo-parathas-on-white.webp?a=1&b=1&s=612x612&w=0&k=20&c=potsL3cD35yKkfndnt4aelUWlOTczCvNCBCRrReyru4=", category: "Breakfast", isVeg: true, isAvailable: true },
    { id: "2", name: "Idli (2 pcs)", description: "a soft, spongy, steamed cake made, traditionally served as a breakfast or snack in South India", price: 50, image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500&q=80", category: "Breakfast", isVeg: true, isAvailable: true },
    { id: "3", name: "Samosa (2 pcs)", description: "Crispy golden pastry filled with spiced potatoes and peas", price: 20, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80", category: "Breakfast", isVeg: true, isAvailable: true },
    { id: "4", name: "Chole Bhature", description: "Spicy chickpea curry served with fluffy fried bread", price: 60, image: "https://cdn.pixabay.com/photo/2022/12/28/17/44/bowl-7683485_1280.jpg", category: "Lunch", isVeg: true, isAvailable: true },
    { id: "5", name: "Rajma Rice", description: "Red kidney beans curry served with steamed basmati rice", price: 70, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&q=80", category: "Lunch", isVeg: true, isAvailable: true },
    { id: "6", name: "Paneer Butter Masala + 2 Roti", description: "Cottage cheese in creamy tomato gravy with 2 wheat flatbreads", price: 80, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500&q=80", category: "Lunch", isVeg: true, isAvailable: true },
    { id: "7", name: "White Sauce Pasta", description: " a creamy, rich dish made by combining cooked pasta with a smooth béchamel sauce, typically prepared using butter, flour, and milk.", price: 40, image: "https://media.istockphoto.com/id/664878332/photo/fettuchini-alfredo-with-garlic-bread-dinner.jpg?s=612x612&w=0&k=20&c=aYOwsF-UcMtlxS4rt0mefug80Xbz1VjwpjQnnubZiOQ=", category: "Snacks", isVeg: true, isAvailable: true },
    { id: "8", name: "Sandwich", description: "Grilled sandwich with vegetables, cheese and chutney", price: 35, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80", category: "Snacks", isVeg: true, isAvailable: true },
    { id: "9", name: "Vada Pav", description: "Mumbai's iconic potato fritter in a soft bun with chutneys", price: 25, image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500&q=80", category: "Snacks", isVeg: true, isAvailable: true },
    { id: "10", name: "Chai", description: "Hot Indian tea brewed with spices and milk", price: 10, image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=500&q=80", category: "Beverages", isVeg: true, isAvailable: true },
    { id: "11", name: "Coffee", description: "Fresh brewed coffee with milk and sugar", price: 20, image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80", category: "Beverages", isVeg: true, isAvailable: true },
    { id: "12", name: "Cold Drink", description: "Chilled carbonated soft drink", price: 20, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=500&q=80", category: "Beverages", isVeg: true, isAvailable: true },
    { id: "13", name: "Masala Dosa", description: "crispy South Indian crepe made from batter, traditionally stuffed with a spiced potato filling.", price: 70, image: "https://images.unsplash.com/photo-1708146464361-5c5ce4f9abb6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFzYWxhJTIwZG9zYXxlbnwwfHwwfHx8MA%3D%3D", category: "Lunch", isVeg: true, isAvailable: true },
    { id: "14", name: "Ice Cream", description: "Creamy vanilla ice cream served in a cup", price: 40, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80", category: "Desserts", isVeg: true, isAvailable: true },
    { id: "15", name: "Omelete", description: "beaten eggs or an egg mixture cooked until just set may be folded around", price: 50, image: "https://media.istockphoto.com/id/1048121658/photo/scrambled-eggs-or-omelette-made-from-eggs-and-cheese-with-herbs.webp?a=1&b=1&s=612x612&w=0&k=20&c=xhnGisEErH4pOLsX_tUhflZhHqIYYtl9bovhrdklkWs=", category: "Breakfast", isVeg: false, isAvailable: true }
]

let cart = {};
let currentCategory = 'All';
let searchQuery = '';
let recentlyAdded = [];   // Recently added items track karne ke liye
let isLoading = true;  // Loading state track karne ke liye
let priceRange = 'all';

// ============ DARK MODE INITIALIZATION ============
function initDarkMode() {
    const darkMode = localStorage.getItem('darkMode');
    const html = document.documentElement;

    if (darkMode === 'on') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
}
// ============ DARK MODE TOGGLE ============
function toggleDarkMode() {
    const html = document.documentElement;
    html.classList.toggle('dark');

    // Save state to localStorage
    if (html.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'on');
    } else {
        localStorage.setItem('darkMode', 'off');
    }

    // Force reflow to apply changes immediately
    void html.offsetHeight;
}
// IMPORTANT: Initialize dark mode IMMEDIATELY before page loads
(function () {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'on') {
        document.documentElement.classList.add('dark');
    }
})();

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    initDarkMode();
    initUserProfile();
    showSkeletonLoading();

    // Simulate loading delay (remove in production if data loads instantly)
    setTimeout(() => {
        hideSkeletonLoading();
        renderMenuItems();
        updateCartUI();
    }, 800);
});

// Show skeleton loading
function showSkeletonLoading() {
    const grid = document.getElementById('menuGrid');
    const skeletonHTML = Array(8).fill(0).map(() => `
        <div class="skeleton-card">
            <div class="skeleton-image"></div>
            <div class="p-4 space-y-3">
                <div class="skeleton h-5 w-3/4"></div>
                <div class="skeleton h-4 w-full"></div>
                <div class="skeleton h-4 w-5/6"></div>
                <div class="flex justify-between items-center mt-4">
                    <div class="skeleton h-6 w-16"></div>
                    <div class="skeleton h-9 w-24 rounded-lg"></div>
                </div>
            </div>
        </div>
    `).join('');
    grid.innerHTML = skeletonHTML;
}

// Hide skeleton loading
function hideSkeletonLoading() {
    const grid = document.getElementById('menuGrid');
    grid.classList.add('animate-fade-in');
}
renderMenuItems();
updateCartUI();


//=========== RENDER MENU ITEMS =============
function renderMenuItems() {
    const grid = document.getElementById('menuGrid');
    const noResults = document.getElementById('noResults');
    let filtered = menuItems.filter(item => {
        const matchesCategory = currentCategory === 'All' || item.category === currentCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery) || item.description.toLowerCase().includes(searchQuery);

        //Price Range Filter
        let matchesPrice = true;
        if(priceRange === 'budget'){
            matchesPrice = item.price <= 30;
        }else if(priceRange === 'medium'){
            matchesPrice = item.price >=30 && item.price <= 60;
        }else if(priceRange === 'premium'){
            matchesPrice = item.price > 60;
        }
        return matchesCategory && matchesSearch && matchesPrice;
    });
    if (filtered.length === 0) {
        grid.innerHTML = '';
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
        grid.innerHTML = filtered.map(item => createMenuItemCard(item)).join('');
    }
}

//============== FILTER BY PRICE RANGE =================
function filterByPrice(range, btn) {
    // Pehle button update karo (DOM directly)
    const allButtons = document.querySelectorAll('.price-filter-btn');
    allButtons.forEach(button => {
        if (button === btn) {
            // Active button
            button.className = 'price-filter-btn active px-4 py-1.5 text-sm rounded-full bg-orange-500 text-white font-medium whitespace-nowrap transition-all';
        } else {
            // Inactive buttons
            button.className = 'price-filter-btn px-4 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap hover:bg-orange-100 dark:hover:bg-gray-700 transition-all';
        }
    });
    
    // Ab filter apply karo
    priceRange = range;
    
    // Debounced render (300ms delay)
    clearTimeout(window.priceFilterTimeout);
    window.priceFilterTimeout = setTimeout(() => {
        renderMenuItems();
    }, 300);
}
//Search functionality
document.getElementById('searchDesktop').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    showSearchSuggestions(searchQuery, 'Desktop');
    renderMenuItems();
});
document.getElementById('searchMobile').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    showSearchSuggestions(searchQuery, 'Mobile');
    renderMenuItems();
});

//========== SHOW SEARCH SUGGESTIONS ==============
function showSearchSuggestions(query, device){
    const suggestionsContainer = document.getElementById(`searchSuggestions${device}`);

    if(!query || query.length < 2){
        suggestionsContainer.classList.add('hidden');
        return;
    }
    //Filters item matching query
    const matches = menuItems.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    ).slice(0, 5);  //show max 5 suggestions

    if(matches.length == 0){
        suggestionsContainer.classList.add('hidden');
        return;
    }
    //Highlighting matching text
    function highlightMatch(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="suggestion-highlight">$1</span>');
    }
    // Generate suggestions HTML
    suggestionsContainer.innerHTML = matches.map(item => `
        <div class="suggestion-item" onclick="selectSuggestion('${item.id}', '${device}')">
            <img src="${item.image}" alt="${item.name}">
            <div class="flex-1">
                <h4 class="font-semibold text-sm dark:text-white">${highlightMatch(item.name, query)}</h4>
                <p class="text-xs text-gray-500 dark:text-gray-400">${item.category} • ₹${item.price}</p>
            </div>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
        </div>
    `).join('');
    
    suggestionsContainer.classList.remove('hidden');
}

//============== SELECT SUGGESTION ================
function selectSuggestion(itemId, device) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;
    
    // Set search value
    document.getElementById(`search${device}`).value = '';
    searchQuery = '';
    
    // Hide suggestions
    document.getElementById(`searchSuggestions${device}`).classList.add('hidden');
    
    // Filter to item's category
    const categoryBtn = Array.from(document.querySelectorAll('.category-tab'))
        .find(btn => btn.textContent.trim() === item.category);
    if (categoryBtn) {
        filterCategory(item.category, categoryBtn);
    }
    
    // Scroll to item
    setTimeout(() => {
        const itemCard = document.querySelector(`[data-item-id="${itemId}"]`);
        if (itemCard) {
            itemCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            itemCard.classList.add('highlight-pulse');
            setTimeout(() => itemCard.classList.remove('highlight-pulse'), 2000);
        }
    }, 300);
}

// ==============HIDE SUGGESTIONS ON OUTSIDE CLICK==================
document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
        document.getElementById('searchSuggestionsDesktop')?.classList.add('hidden');
        document.getElementById('searchSuggestionsMobile')?.classList.add('hidden');
    }
});


// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('hidden');

            // Change icon: hamburger ↔ close
            const icon = this.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                icon.innerHTML = `<line x1="4" x2="20" y1="12" y2="12"></line>
                                  <line x1="4" x2="20" y1="6" y2="6"></line>
                                  <line x1="4" x2="20" y1="18" y2="18"></line>`;
            } else {
                icon.innerHTML = `<line x1="18" x2="6" y1="6" y2="18"></line>
                                  <line x1="6" x2="18" y1="6" y2="18"></line>`;
            }
        });
    }
});
//Filter by category
function filterCategory(category, btn) {
    currentCategory = category;
    document.getElementById('categoryTitle').textContent = category === 'All' ? "BBC's Menu" : category;

    // Reset all buttons
    document.querySelectorAll('.category-tab').forEach(tab => {
        tab.classList.remove('gradient-secondary', 'text-white', 'shadow-md');
        tab.classList.add('bg-orange-100', 'text-gray-800');

        const textSpan = tab.querySelector('.relative.z-10');
        if (textSpan) {
            textSpan.classList.remove('text-white');
            textSpan.classList.add('text-gray-800');
        }
    });

    // Activate clicked button
    btn.classList.remove('bg-orange-100', 'text-gray-800');
    btn.classList.add('gradient-secondary', 'text-white', 'shadow-md');

    const activeTextSpan = btn.querySelector('.relative.z-10');
    if (activeTextSpan) {
        activeTextSpan.classList.remove('text-gray-800');
        activeTextSpan.classList.add('text-white');
    }

    renderMenuItems();
}


// Create menu item card
function createMenuItemCard(item) {
    const quantity = cart[item.id] ? cart[item.id].quantity : 0;
    const vegBadge = item.isVeg ?
        '<span class="bg-green-500 text-white text-xs px-2 py-1 rounded">🟢 Veg</span>' :
        '<span class="bg-red-500 text-white text-xs px-2 py-1 rounded">🔴 Non-Veg</span>';
    return `
        <div class="glass-card rounded-lg overflow-hidden group hover-lift">
            <div class="relative h-48 overflow-hidden">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute top-2 left-2">${vegBadge}</div>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-lg text-gray-800 dark:text-white line-clamp-1">${item.name}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mt-1">${item.description}</p>
                <div class="flex items-center justify-between mt-3">
                    <span class="text-xl font-bold text-orange-500">₹${item.price}</span>
                    ${quantity > 0 ? `
                        <div class="flex items-center gap-2 glass-card px-2 py-1 rounded-full">
                            <button onclick="removeFromCart('${item.id}')" class="ripple h-7 w-7 rounded-full hover:bg-orange-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors">
                                <svg class="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                                </svg>
                            </button>
                            <span class="font-semibold min-w-[20px] text-center dark:text-white">${quantity}</span>
                            <button onclick="addToCart('${item.id}')" class="ripple h-7 w-7 rounded-full hover:bg-orange-100 dark:hover:bg-gray-700 flex items-center justify-center transition-colors">
                                <svg class="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    ` : `
                        <button 
                            onclick="addToCart('${item.id}')" 
                            ${!item.isAvailable ? 'disabled' : ''}
                                class="ripple px-4 py-2 rounded-lg gradient-secondary text-white font-medium text-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                            ${item.isAvailable ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    `}
                </div>
            </div>
        </div>
    `;
}


//Cart functions
function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    console.log('Adding item:', item);

    if (!item || !item.isAvailable) return;

    if (cart[itemId]) {
        cart[itemId].quantity++;
    } else {
        cart[itemId] = { ...item, quantity: 1 };

        // ← NAYE LINES START
        // Track recently added items
        recentlyAdded = recentlyAdded.filter(id => id !== itemId); // Duplicate remove
        recentlyAdded.unshift(itemId); // Beginning mein add
        if (recentlyAdded.length > 3) {
            recentlyAdded.pop(); // Keep only 3
        }
        // ← NAYE LINES END
    }

    console.log('Cart after add:', cart);
    console.log('Item quantity:', cart[itemId].quantity);

    // Animate cart badge
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        cartBadge.classList.add('badge-pulse');
        setTimeout(() => cartBadge.classList.remove('badge-pulse'), 400);
    }

    updateCartUI();
    renderMenuItems();
    showToast(`${item.name} added to cart!`);
}

function removeFromCart(itemId) {
    if (cart[itemId]) {
        const item = menuItems.find(i => i.id === itemId);
        cart[itemId].quantity--;
        if (cart[itemId].quantity === 0) {
            delete cart[itemId];
            showToast(`${item.name} removed from cart`);
        }
    }
    updateCartUI();
    renderMenuItems();
}
function clearCart() {
    cart = {};
    updateCartUI();
    renderMenuItems();
    showToast('Cart cleared');
}

function updateCartUI() {
    const cartItems = Object.values(cart);  //object.values() se array ban jaata h toh objects ko array me convert kiya
    // reduce() method array ke elements ko combine karta hai Starting value = 0 Har item ki quantity add karte jao
    // sum = 0, item = {quantity: 2} → sum = 0 + 2 = 2 ; sum = 2, item = {quantity: 1} → sum = 2 + 1 = 3 ; Final: itemCount = 3
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;     //10% tax
    const total = subtotal + tax;

    // Update Header Cart Badge
    const cartBadge = document.getElementById('cartBadge');
    if (itemCount > 0) {
        cartBadge.textContent = itemCount;
        cartBadge.classList.remove('hidden');               //┌──────────────────────────────┐
    } else {                                                  //│  CampusBite          🛒(3)   │  ← Ye badge                        
        cartBadge.classList.add('hidden');                  //└──────────────────────────────┘
    }

    // Update Floating Cart Button
    const floatingCart = document.getElementById('floatingCart');
    if (itemCount > 0) {
        floatingCart.classList.remove('hidden');
        floatingCart.classList.add('has-items');
        document.getElementById('floatingCartCount').textContent = `${itemCount} items`;        //┌─────────────┐
        document.getElementById('floatingCartTotal').textContent = `₹${Math.round(subtotal)}`;  //│  🛒 3 items │  ← Floating button
    } else {                                                                                    //│     ₹88     │
        floatingCart.classList.add('hidden');                                                   //└─────────────┘
        floatingCart.classList.remove('has-items');                                               
    }

    // Update Cart Sidebar
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartSummary = document.getElementById('cartSummary');
    const clearCartBtn = document.getElementById('clearCartBtn');

    if (itemCount === 0) {
        if (emptyCart) emptyCart.classList.remove('hidden');
        if (cartSummary) cartSummary.classList.add('hidden');
        if (clearCartBtn) clearCartBtn.classList.add('hidden');

        // ← YE NAYA CODE PASTE KARO
        let suggestions = [];

        if (recentlyAdded.length > 0) {
            suggestions = recentlyAdded
                .map(id => menuItems.find(item => item.id === id))
                .filter(item => item)
                .slice(0, 3);
        }

        if (suggestions.length === 0) {
            suggestions = menuItems.slice(0, 3);
        }

        cartItemsContainer.innerHTML = `
        <div class="mt-6 space-y-4">
            <div class="flex items-center justify-between">
                <h3 class="text-sm font-bold text-gray-700 dark:text-gray-300">💡 Quick Add</h3>
                <span class="text-xs text-gray-400">For you</span>
            </div>
            
            <div class="space-y-3">
                ${suggestions.map(item => `
                    <div class="rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-400 transition-all hover:shadow-md">
                        <div class="flex gap-3 p-3">
                            <img src="${item.image}" alt="${item.name}" class="w-20 h-20 rounded-lg object-cover">
                            <div class="flex-1 min-w-0">
                                <h4 class="font-semibold text-sm line-clamp-1 dark:text-white">${item.name}</h4>
                                <span class="text-xs ${recentlyAdded.includes(item.id) ? 'text-gray-500 dark:text-gray-400 font-semibold' : 'text-gray-500 dark:text-gray-400 font-semibold'}">
                                    ${recentlyAdded.includes(item.id) ? '🔥 You added this before' : '⭐ Recommended'}
                                </span>
                                <div class="flex items-center justify-between mt-2">
                                    <span class="text-orange-500 font-bold">₹${item.price}</span>
                                    <button onclick="addToCart('${item.id}')" 
                                        class="ripple px-4 py-1.5 text-xs font-semibold bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full hover:shadow-lg transition-all">
                                        + Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <button onclick="browseFullMenu()" 
                class="w-full mt-4 py-3 text-sm font-medium text-orange-500 border-2 border-orange-200 dark:border-orange-700 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <span>Browse Full Menu</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    `;
    } else {
        emptyCart.classList.add('hidden');
        cartSummary.classList.remove('hidden');
        clearCartBtn.classList.remove('hidden');

        cartItemsContainer.innerHTML = cartItems.map(item => `   
            <div class="glass-card p-4 rounded-lg">
                <div class="flex gap-3">
                    <img src="${item.image}" alt="${item.name}" class="w-20 h-20 rounded-md object-cover">
                    <div class="flex-1 min-w-0">
                        <h4 class="font-semibold text-sm line-clamp-1 dark:text-white">${item.name}</h4>
                        <p class="text-orange-500 font-bold text-sm mt-1">₹${item.price}</p>
                        <div class="flex items-center gap-2 mt-2">
                            <button onclick="removeFromCart('${item.id}')" class="h-7 w-7 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center transition-colors">
                                <svg class="w-3 h-3 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                                </svg>
                            </button>
                            <span class="font-semibold min-w-[30px] text-center dark:text-white">${item.quantity}</span>
                            <button onclick="addToCart('${item.id}')" class="h-7 w-7 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center transition-colors">
                                <svg class="w-3 h-3 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-bold dark:text-white">₹${item.price * item.quantity}</p>
                    </div>
                </div>
            </div>
        `).join('');
        document.getElementById('subtotal').textContent = `₹${Math.round(subtotal)}`;
        document.getElementById('tax').textContent = `₹${Math.round(tax)}`;
        document.getElementById('total').textContent = `₹${Math.round(total)}`;
    }
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
}

function browseFullMenu() {
    //first close the cart
    toggleCart();
    //then switch to 'All' category
    const allBtn = document.querySelector('.category-tab');
    if (allBtn) {
        filterCategory('All', allBtn);
    }
    //scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-24 right-6 glass-card text-gray-800 dark:text-white px-6 py-3 rounded-lg shadow-2xl font-medium';
    toast.style.cssText = 'z-index: 9999; opacity: 0; transform: translateY(20px); transition: all 0.2s ease-in-out;';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// // ============ USER PROFILE MANAGEMENT ============

// // Initialize user profile on page load
// function initUserProfile(){
//     //DEMO user data
//     const dummyUser = {
//         userName: 'Hardik',
//         phone: '+91 95484 15772',
//         name: 'Hardik Srivastava',
//         email: 'hardik77.aman@gmail.com'
//     };
//     updateUserProfile(dummyUser);   // ← Ye function SAME rahega BACKEND ke time
// }
// // // Update profile UI with user data
// // function updateUserProfile(userData){   // ← NO CHANGE for BACKEND
// //     const initial = userData.name.charAt(0).toUpperCase();

// //     //Desktop Profile
// //     document.getElementById('userInitial').textContent = initial;
// //     document.getElementById('userName').textContent = userData.userName;
// //     document.getElementById('dropdownUserName').textContent = userData.name;
// //     document.getElementById('dropdownUserPhone').textContent = userData.phone;

// //     //Mobile Profile
// //     const mobileInitial = document.getElementById('userInitialMobile');
// //     const mobileName = document.getElementById('userNameMobile');
// //     const mobilePhone = document.getElementById('userPhoneMobile');
// //     if (mobileInitial) mobileInitial.textContent = initial;
// //     if (mobileName) mobileName.textContent = userData.name;
// //     if (mobilePhone) mobilePhone.textContent = userData.phone;
// // }
// // // Handle logout    (when BACKEND small update - API call add)