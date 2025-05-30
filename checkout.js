// checkout.js
function renderOrderSummary() {
  const cart = loadCart();
  let subtotal = 0;
  const ul = document.getElementById('summary-list');
  ul.innerHTML = '';
// Rendering Order Summary
  for (let id in cart) {
    const qty  = cart[id];
    const prod = PRODUCTS[id];
    if (!prod) continue;
    const lineTotal = prod.price * qty;
    subtotal += lineTotal;

    const li = document.createElement('li');
    li.innerHTML = `
      <span>${prod.title} × ${qty}</span>
      <span>$ ${lineTotal.toFixed(2)} AUD</span>
    `;
    ul.appendChild(li);
  }
// Payment Method Switching
  document.getElementById('summary-subtotal')
    .textContent = `$ ${subtotal.toFixed(2)} AUD`;
  document.getElementById('summary-total')
    .textContent = `$ ${subtotal.toFixed(2)} AUD`;
}

function setupPaymentToggle() {
  const radios   = document.querySelectorAll('input[name="pm"]');
  const ccFields = document.querySelector('.cc-fields');

  function updateCCVisibility() {
    const choice = document.querySelector('input[name="pm"]:checked').value;
    ccFields.style.display = (choice === 'credit') ? 'block' : 'none';
  }

  radios.forEach(r => r.addEventListener('change', updateCCVisibility));
  updateCCVisibility();
}
// Intercept form submission and jump and remove cart
function setupFormSubmit() {
  const form = document.getElementById('payment-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    localStorage.removeItem('cart');
    window.location.href = 'success.html';
  });
}
// Initialization after page load
window.addEventListener('DOMContentLoaded', () => {
  renderOrderSummary();
  setupPaymentToggle();
  setupFormSubmit();
});
