document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     NAV + SCROLL EFFECT
  ========================== */

  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const nav = document.querySelector(".site-nav");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      hamburger.classList.toggle("open");
    });
  }

  /* =========================
     HIGHLIGHT ANIMATION
  ========================== */

  const highlightWrapper = document.querySelector(".highlight-wrapper");

  /* =========================
     SCROLL LISTENER
  ========================== */

  window.addEventListener("scroll", () => {
    if (nav) {
      if (window.scrollY > 40) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
    }

    if (highlightWrapper) {
      if (window.scrollY > 80) {
        highlightWrapper.classList.add("active");
      } else {
        highlightWrapper.classList.remove("active");
      }
    }
  });

  /* =========================
     PRODUCT PAGE LOGIC
  ========================== */

  const quantityDisplay = document.getElementById("quantity");
  const increaseBtn = document.getElementById("increase");
  const decreaseBtn = document.getElementById("decrease");
  const addToCartBtn = document.getElementById("add-to-cart");

  let quantity = 1;

  if (increaseBtn && quantityDisplay) {
    increaseBtn.addEventListener("click", () => {
      quantity++;
      quantityDisplay.textContent = quantity;
    });
  }

  if (decreaseBtn && quantityDisplay) {
    decreaseBtn.addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
      }
    });
  }

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const product = {
        name: "THE EYE",
        price: 19.99,
        image: "img/poster-01.jpg",
      };

      const existingItem = cart.find((item) => item.name === product.name);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.push({
          ...product,
          quantity: quantity,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      quantity = 1;
      if (quantityDisplay) quantityDisplay.textContent = 1;
    });
  }

  /* =========================
     CART PAGE LOGIC
  ========================== */

  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total-price");
  const clearBtn = document.getElementById("clear-cart");

  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function renderCart() {
    if (!cartContainer || !totalElement) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)}</p>

        <div class="cart-controls">
          <button data-index="${index}" data-action="decrease">-</button>
          <span>${item.quantity}</span>
          <button data-index="${index}" data-action="increase">+</button>
        </div>

        <span class="remove-btn" data-index="${index}">REMOVE</span>
      `;

      cartContainer.appendChild(div);
    });

    totalElement.textContent = `$${total.toFixed(2)}`;
  }

  if (cartContainer) {
    cartContainer.addEventListener("click", (e) => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const index = e.target.dataset.index;
      const action = e.target.dataset.action;

      if (action === "increase") {
        cart[index].quantity++;
      }

      if (action === "decrease") {
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
        }
      }

      if (e.target.classList.contains("remove-btn")) {
        cart.splice(index, 1);
      }

      saveCart(cart);
      renderCart();
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        localStorage.removeItem("cart");
        renderCart();
      });
    }

    renderCart();
  }
});
