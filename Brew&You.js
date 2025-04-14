const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
  hamburger.classList.toggle("active"); 
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

// My Codes to ensure both cart and notification icons toggle correctly
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
const featuredSection = document.querySelector("#featured");

window.addEventListener("scroll", () => {
  if (window.scrollY >= featuredSection.offsetTop - 100) {
    navbar.classList.add("scrolled");
    navbar.classList.add("transition");
  } else {
    navbar.classList.remove("scrolled");
    navbar.classList.remove("transition");
  }
});


const priceFilter = document.getElementById('price-filter');
const ratingFilter = document.getElementById('rating-filter');
const productCards = document.querySelectorAll('.product-card');

priceFilter.addEventListener('change', filterProducts);
ratingFilter.addEventListener('change', filterProducts);

function filterProducts() {
  const priceValue = priceFilter.value;
  const ratingValue = ratingFilter.value;

  productCards.forEach(card => {
    const cardPrice = parseInt(card.getAttribute('data-price'));
    const cardRating = parseInt(card.getAttribute('data-rating'));

    let priceMatch = true;
    let ratingMatch = true;

    if (ratingValue === '4-and-above' && cardRating < 4) {
      ratingMatch = false;
    } else if (ratingValue === '5-stars' && cardRating !== 5) {
      ratingMatch = false;
    } else if (ratingValue === '4-stars' && cardRating !== 4) {
      ratingMatch = false;
    }
    

    if (priceValue === 'low-to-high') {
      // Don't filter, just sort later
    } else if (priceValue === 'high-to-low') {
      // Don't filter, just sort later
    } else if (priceValue === 'under-3000') {
      if (cardPrice >= 3000) priceMatch = false;
    } else if (priceValue === '3000-4000') {
      if (cardPrice < 3000 || cardPrice > 4000) priceMatch = false;
    } else if (priceValue === 'above-4000') {
      if (cardPrice <= 4000) priceMatch = false;
    }

    if (priceMatch && ratingMatch) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });

  // Sort products
  if (priceValue === 'low-to-high') {
    sortProducts('price', 'asc');
  } else if (priceValue === 'high-to-low') {
    sortProducts('price', 'desc');
  }
}

function sortProducts(attribute, order) {
  const productContainer = document.getElementById('product-cards');
  const products = Array.from(productContainer.children);

  products.sort((a, b) => {
    if (attribute === 'price') {
      const priceA = parseInt(a.getAttribute('data-price'));
      const priceB = parseInt(b.getAttribute('data-price'));

      if (order === 'asc') {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    }
  });

  productContainer.innerHTML = '';
  products.forEach(product => productContainer.appendChild(product));
}




// Clear all notifications
function clearAllNotifications() {
    notifications.length = 0; 
    updateNotificationUI();
    addNotification("Notifications Cleared", "All notifications have been cleared.");
  }
  
  // Clear only read notifications
  function clearReadNotifications() {
    
    const unreadNotifications = notifications.filter(n => !n.read);
    notifications.length = 0; 
    notifications.push(...unreadNotifications); 
    updateNotificationUI();
    addNotification("Read Notifications Cleared", "All read notifications have been cleared.");
  }


