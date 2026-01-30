// CART FUNCTIONALITY
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const updateCartCount = () => {
  document.querySelectorAll("#cart-count").forEach(span => {
    span.textContent = cart.length;
  });
};

const saveCart = () => localStorage.setItem("cart", JSON.stringify(cart));

const renderCartItems = () => {
  const cartItemsContainer = document.querySelector(".cart-items");
  if(!cartItemsContainer) return;

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name} - $${item.price.toFixed(2)}</span>
      <button data-index="${index}">Remove</button>
    `;
    cartItemsContainer.appendChild(div);
    total += item.price;
  });

  document.getElementById("total").textContent = total.toFixed(2);

  document.querySelectorAll(".cart-item button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const i = e.target.dataset.index;
      cart.splice(i, 1);
      saveCart();
      updateCartCount();
      renderCartItems();
    });
  });
};

document.getElementById("clear-cart")?.addEventListener("click", () => {
  cart = [];
  saveCart();
  updateCartCount();
  renderCartItems();
});

document.querySelectorAll(".add-cart").forEach(btn => {
  btn.addEventListener("click", e => {
    const product = e.target.closest(".product");
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);
    cart.push({name, price});
    saveCart();
    updateCartCount();
  });
});

updateCartCount();
renderCartItems();
