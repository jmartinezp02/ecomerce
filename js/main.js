// Initialize Swiper
const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Cart Functionality
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCart = document.querySelector('.close-cart');
const cartItems = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.querySelector('.cart-total span');

let cart = [];

// Toggle Cart Sidebar
cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('active');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});

// Add to Cart Function
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }
    
    updateCart();
    cartSidebar.classList.add('active');
}

// Update Cart Display
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
                <button class="remove-item" data-id="${item.id}">&times;</button>
            </div>
        `;
    });
    
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            removeFromCart(id);
        });
    });
}

// Remove from Cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Sample Catalogo Data
const Catalogo = [
    {
        id: 1,
        name: 'iPhone 13 Pro',
        price: 999.99,
        image: 'img/Catalogo/iphone 13.jpg',
        category: 'apple'
    },
    {
        id: 2,
        name: 'PlayStation 5',
        price: 499.99,
        image: 'img/Catalogo/playstation5pro.jpg',
        category: 'consolas'
    },
    {
        id: 3,
        name: 'Gaming PC Pro',
        price: 1499.99,
        image: 'img/Catalogo/hp victus.jpg',
        category: 'pc'
    },
    {
        id: 4,
        name: 'Samsung Galaxy S21',
        price: 799.99,
        image: 'img/Catalogo/galaxy s24 ultra.jpg',
        category: 'moviles'
    }
];

// Load Featured Catalogo
function loadFeaturedCatalogo() {
    const productGrid = document.querySelector('.product-grid');
    
    Catalogo.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">$${product.price}</p>
            <button class="btn add-to-cart" data-id="${product.id}">Añadir al Carrito</button>
        `;
        
        productGrid.appendChild(productCard);
    });
    
    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            const product = Catalogo.find(p => p.id === id);
            addToCart(product);
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedCatalogo();
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;
        // Here you would typically send this to your backend
        alert('¡Gracias por suscribirte!');
        e.target.reset();
    });
}

// Close cart when clicking outside
document.addEventListener('click', (e) => {
    if (!cartSidebar.contains(e.target) && !cartIcon.contains(e.target)) {
        cartSidebar.classList.remove('active');
    }
}); 