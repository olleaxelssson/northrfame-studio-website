document.addEventListener("DOMContentLoaded", () => {
  const cartContainer = document.getElementById("cart-items");
  const totalElement = document.getElementById("cart-total-price");
  const clearBtn = document.getElementById("clear-cart");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function renderCart() {
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

  cartContainer.addEventListener("click", (e) => {
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

    saveCart();
    renderCart();
  });

  clearBtn.addEventListener("click", () => {
    cart = [];
    saveCart();
    renderCart();
  });

  renderCart();
});
