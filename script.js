const addButtons = document.querySelectorAll(".add-to-basket");
const basketCount = document.querySelector("#basket-count");
const basketItems = document.querySelector("#basket-items");
const basketStatus = document.querySelector("#basket-status");
const orderForm = document.querySelector("#order-form");
const formMessage = document.querySelector("#form-message");

const basket = [];

function renderBasket() {
  basketCount.textContent = basket.length;

  if (basket.length === 0) {
    basketItems.innerHTML = "<li>No honey selected yet.</li>";
    return;
  }

  const quantities = basket.reduce((summary, product) => {
    summary[product] = (summary[product] || 0) + 1;
    return summary;
  }, {});

  basketItems.replaceChildren();

  Object.entries(quantities).forEach(([product, quantity]) => {
    const item = document.createElement("li");
    item.textContent = `${product} x ${quantity}`;
    basketItems.append(item);
  });
}

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    basket.push(product);
    renderBasket();
    basketStatus.textContent = `${product} added to the basket.`;
  });
});

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  orderForm.reset();
  formMessage.hidden = false;
});
