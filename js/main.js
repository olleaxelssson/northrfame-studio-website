const addBtn = document.getElementById("add-to-cart-btn");
const cartBox = document.getElementById("cart");
const clearBtn = document.getElementById("clear-btn");

const productName = "The Eye Poster";
const productAlt = "Poster depicting an eye";
const productPrice = 19.99;
const productImage = "img/poster-01.jpg";
const qtyKey = "cartQuantityPoster01";

function drawCart() {
  if (!cartBox) return;

  const qty = Number(localStorage.getItem(qtyKey) || "0");

  if (qty <= 0) {
    cartBox.textContent = "Your cart is currently empty.";
    if (clearBtn) clearBtn.style.display = "none";
    return;
  }

  const itemTotal = productPrice * qty;

  cartBox.innerHTML = `
    <img src="${productImage}" alt="${productAlt}" style="width: 20%; display: block; margin: 0 auto 10px;">
    ${productName} x ${qty} = $${itemTotal.toFixed(2)}<br>
    <button id="add-one-btn" class="clear-cart">Add one</button>
    <button id="remove-one-btn" class="clear-cart">Remove one</button><br>
    Cart Total: <span style="font-size: 2em;">$${itemTotal.toFixed(2)}</span>
  `;

  if (clearBtn) clearBtn.style.display = "inline-block";

  const removeOneBtn = document.getElementById("remove-one-btn");
  const addOneBtn = document.getElementById("add-one-btn");

  if (addOneBtn) {
    addOneBtn.onclick = function () {
      const currentQty = Number(localStorage.getItem(qtyKey) || "0");
      localStorage.setItem(qtyKey, String(currentQty + 1));
      drawCart();
    };
  }

  if (removeOneBtn) {
    removeOneBtn.onclick = function () {
      const currentQty = Number(localStorage.getItem(qtyKey) || "0");
      const nextQty = currentQty - 1;

      if (nextQty <= 0) {
        localStorage.removeItem(qtyKey);
      } else {
        localStorage.setItem(qtyKey, String(nextQty));
      }

      drawCart();
    };
  }
}

if (addBtn) {
  addBtn.onclick = function () {
    const qty = Number(localStorage.getItem(qtyKey) || "0");
    localStorage.setItem(qtyKey, String(qty + 1));
    console.log("Item added to cart!");
  };
}

if (clearBtn) {
  clearBtn.onclick = function () {
    localStorage.removeItem(qtyKey);
    drawCart();
  };
}

drawCart();
