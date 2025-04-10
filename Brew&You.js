const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  hamburger.classList.toggle("active"); // this will animate the hamburger to X
});

const slides = document.querySelectorAll('.slide');
let currentIndex = 0;

// Function to change slides
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

// Automatically change slides every 5 seconds
setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}, 10000);

// Navigation buttons
document.querySelector('.prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
});

document.querySelector('.next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
});

// Initialize the first slide
showSlide(currentIndex);

const cart = [];
const notifications = [];

const cartCounter = document.getElementById("cartCounter");
const notificationCounter = document.getElementById("notificationCounter");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartDropdown = document.getElementById("cartDropdown");
const notificationPage = document.getElementById("notificationPage");
const notificationList = document.getElementById("notificationList");
const cartIcon = document.getElementById("cartIcon");
const notificationIcon = document.getElementById("notificationIcon");

document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".product-card");
    const id = card.dataset.id;
    const title = card.dataset.title;
    const price = parseInt(card.dataset.price);

    cart.push({ id, title, price });
    updateCartUI();
    addNotification("Added to Cart", `${title} was added to your cart.`);
  });
});

function updateCartUI() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.title} - ₦${item.price}
      <span style="color:red; cursor:pointer;" onclick="removeFromCart(${index})">❌</span>
    `;
    cartItems.appendChild(li);
  });

  cartCounter.textContent = cart.length;
  cartTotal.textContent = total;
}

function removeFromCart(index) {
  const removed = cart.splice(index, 1)[0];
  updateCartUI();
  addNotification("Removed from Cart", `${removed.title} was removed from your cart.`);
}

document.getElementById("clearCartBtn").addEventListener("click", () => {
  cart.length = 0;
  updateCartUI();
  addNotification("Cart Cleared", "All items were removed from your cart.");
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    addNotification("Checkout Failed", "Your cart is empty. Please add items first.");
  } else {
    addNotification("Checkout Success", "Thank you for your order! It is being processed.");
    cart.length = 0;
    updateCartUI();
  }
});

function addNotification(title, message) {
  const timestamp = new Date().toLocaleString();
  notifications.unshift({ title, message, timestamp, read: false });
  updateNotificationUI();
}

function updateNotificationUI() {
  notificationList.innerHTML = "";
  notifications.forEach((note, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${note.title}</strong>
      <p>${note.message}</p>
      <small>${note.timestamp}</small>
      <button onclick="toggleRead(${index})">${note.read ? "Mark Unread" : "Mark Read"}</button>
    `;
    notificationList.appendChild(li);
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  notificationCounter.textContent = unreadCount;
}

function toggleRead(index) {
  notifications[index].read = !notifications[index].read;
  updateNotificationUI();
}

function filterNotifications(filter) {
  const filtered = notifications.filter(n => {
    if (filter === "read") return n.read;
    if (filter === "unread") return !n.read;
    return true;
  });

  notificationList.innerHTML = "";
  filtered.forEach((note, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${note.title}</strong>
      <p>${note.message}</p>
      <small>${note.timestamp}</small>
      <button onclick="toggleRead(${index})">${note.read ? "Mark Unread" : "Mark Read"}</button>
    `;
    notificationList.appendChild(li);
  });
}

// Ensure both cart and notification icons toggle correctly
cartIcon.addEventListener("click", () => {
  cartDropdown.style.display = cartDropdown.style.display === "block" ? "none" : "block";
  notificationPage.style.display = "none";
});

notificationIcon.addEventListener("click", () => {
  notificationPage.style.display = notificationPage.style.display === "block" ? "none" : "block";
  cartDropdown.style.display = "none";
});

// Navbar Scroll Effect
const navbar = document.querySelector(".navbar");
const featuredSection = document.querySelector("#featured"); // Assuming this is the ID of the Featured Product Section

window.addEventListener("scroll", () => {
  if (window.scrollY >= featuredSection.offsetTop - 100) {
    navbar.classList.add("scrolled");
    navbar.classList.add("transition");
  } else {
    navbar.classList.remove("scrolled");
    navbar.classList.remove("transition");
  }
});

// Sample product list
const products = [
    { name: "Premium Arabica Coffee", price: 3500, rating: 4 },
    { name: "Espresso Blend", price: 4200, rating: 5 },
    { name: "Decaf Coffee", price: 3000, rating: 4 },
    { name: "Cold Brew Coffee", price: 2800, rating: 4 },
    { name: "Vanilla Latte", price: 3800, rating: 5 },
    { name: "Hazelnut Coffee", price: 4000, rating: 4 },
    { name: "Cappuccino", price: 3200, rating: 4 },
    { name: "Mocha Coffee", price: 4500, rating: 5 },
];

// Add to Cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
  button.addEventListener('click', function () {
    const productName = this.getAttribute('data-product');
    const productPrice = parseInt(this.getAttribute('data-price'));
    
 
  });
});

// Filter products by price and rating
const priceFilter = document.getElementById('price-filter');
const ratingFilter = document.getElementById('rating-filter');

priceFilter.addEventListener('change', filterProducts);
ratingFilter.addEventListener('change', filterProducts);

function filterProducts() {
  const priceValue = priceFilter.value;
  const ratingValue = ratingFilter.value;

  const filteredProducts = products.filter(product => {
    let priceMatch = true;
    let ratingMatch = true;

    if (priceValue === 'low-to-high') {
      products.sort((a, b) => a.price - b.price);
    } else if (priceValue === 'high-to-low') {
      products.sort((a, b) => b.price - a.price);
    }

    if (ratingValue === '4-and-above' && product.rating < 4) {
      ratingMatch = false;
    } else if (ratingValue === '5-stars' && product.rating !== 5) {
      ratingMatch = false;
    }

    return priceMatch && ratingMatch;
  });

  renderProducts(filteredProducts);
}

// Clear all notifications
function clearAllNotifications() {
    notifications.length = 0; // Empty the notifications array
    updateNotificationUI();
    addNotification("Notifications Cleared", "All notifications have been cleared.");
  }
  
  // Clear only read notifications
  function clearReadNotifications() {
    // Remove all read notifications from the array
    const unreadNotifications = notifications.filter(n => !n.read);
    notifications.length = 0; // Reset notifications array
    notifications.push(...unreadNotifications); // Re-add only unread notifications
    updateNotificationUI();
    addNotification("Read Notifications Cleared", "All read notifications have been cleared.");
  }


