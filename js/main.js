const addToCartButton = document.getElementById("add-to-cart-btn");
const cartElement = document.getElementById("cart");
const ITEM_NAME = "THE EYE";
const ITEM_PRICE = 19.99;
const ITEM_IMAGE = "img/poster-01.jpg";
const clearButton = document.getElementById("clear-btn");
const POSTER_01_QUANTITY_KEY = "cartQuantityPoster01";

function renderCart() {
  if (!cartElement) {
    return;
  }

  const poster01Quantity = Number(
    localStorage.getItem(POSTER_01_QUANTITY_KEY) || "0",
  );

  const poster01Total = ITEM_PRICE * poster01Quantity;
  const cartTotal = poster01Total;

  if (poster01Quantity > 0) {
    cartElement.innerHTML = `<img src="${ITEM_IMAGE}" alt="${ITEM_NAME}" style="width: 20%; display: block; margin: 0 auto 10px;">
${ITEM_NAME} x ${poster01Quantity} = $${poster01Total.toFixed(2)}<br>
Cart Total: <span style="font-size: 2em;">$${cartTotal.toFixed(2)}</span>`;
  } else {
    cartElement.textContent = "Your cart is currently empty.";
    clearButton.remove(clearButton);
  }
}

if (addToCartButton) {
  addToCartButton.addEventListener("click", function () {
    const currentQuantity = Number(
      localStorage.getItem(POSTER_01_QUANTITY_KEY) || "0",
    );
    const newQuantity = currentQuantity + 1;
    localStorage.setItem(POSTER_01_QUANTITY_KEY, String(newQuantity));
    alert("Item added to cart!");
  });
}

if (clearButton) {
  clearButton.addEventListener("click", function () {
    localStorage.removeItem(POSTER_01_QUANTITY_KEY);
    renderCart();
    this.remove(clearButton);
  });
}

renderCart();
