// cart.js

const PRODUCTS = {
  'noise-receptor': {
    id: 'noise-receptor',
    title: 'Noise Receptor Journal Issue No. 13',
    price: 14.8,
    cover: 'images/book1.png',
    description:'Noise Receptor Journal Issue no.13 illuminating the post-industrial underground.\nSound with impact—analysing the abstract…'

  },
  'za-zine': {
    id: 'za-zine',
    title: 'Za Zine: A Collection of Weed Bags Found in New York City',
    price: 25.5,
    cover: 'images/book3.png',
    description:'November 2023 to February 2024 issue documenting NYC weed bags, featuring art, interviews, and underground culture commentary.'
  }
};

function loadCart() {
  const stored = localStorage.getItem('cart');
  return stored ? JSON.parse(stored) : {};
}
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  const main = document.getElementById('cart-main');
  main.innerHTML = '';
  const cart = loadCart();
  let total = 0;

  if (Object.keys(cart).length === 0) {
    main.innerHTML += '<p>Your cart is empty.</p>';
  } else {
    Object.keys(cart).forEach(id => {
      const qty = cart[id], prod = PRODUCTS[id];
      if (!prod) return;
      const subtotal = prod.price * qty;
      total += subtotal;
      const item = document.createElement('div');
      item.className = 'cart-item';
      item.innerHTML = `
        <div class="cover"><img src="${prod.cover}" alt="${prod.title}"></div>
        <div class="details">
          <h2>${prod.title}</h2>
           <p class="description">${prod.description}</p>
          <p class="price">$ ${prod.price} AUD</p>
          <div class="qty-controls">
            <button data-id="${id}" class="decrease">−</button>
            <span>${qty}</span>
            <button data-id="${id}" class="increase">＋</button>
          </div>
          <p class="subtotal">Subtotal: $${subtotal.toFixed(2)} AUD</p>
          <button class="remove-btn" data-id="${id}">Remove</button>
        </div>
      `;
      main.appendChild(item);
    });
  }

  // 运费
  const shipping = document.createElement('div');
  shipping.className = 'cart-shipping';
  shipping.textContent = 'Shipping: Free';
  main.appendChild(shipping);

  // 优惠
  const coupon = document.createElement('div');
  coupon.className = 'cart-coupon';
  coupon.innerHTML = '<label>Coupon code: <input type="text" id="coupon-input"/></label><button id="apply-coupon">Apply</button>';
  main.appendChild(coupon);

  // 备注
  const note = document.createElement('div');
  note.className = 'cart-note';
  note.textContent = 'Free shipping for orders over $50 AUD.';
  main.appendChild(note);

  // 总计 & 支付
  const summary = document.createElement('div');
  summary.className = 'cart-total';
  summary.innerHTML = `<span>Total:</span><span>$ ${total.toFixed(2)} AUD</span>`;
  main.appendChild(summary);

  const pay = document.createElement('button');
  pay.className = 'pay-btn';
  pay.textContent = 'Pay now';
  main.appendChild(pay);

  // 增减数量
  document.querySelectorAll('.increase, .decrease').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id, c = loadCart();
      if (btn.classList.contains('increase')) c[id] = (c[id]||0)+1;
      else {
        c[id] = Math.max(0,(c[id]||0)-1);
        if (c[id]===0) delete c[id];
      }
      saveCart(c); renderCart();
    });
  });

  // 删除
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = loadCart();
      delete c[btn.dataset.id];
      saveCart(c); renderCart();
    });
  });

  // 清空购物车
  document.getElementById('clear-cart').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      localStorage.removeItem('cart');
      renderCart();
    }
  });

  // 应用优惠
  document.getElementById('apply-coupon')?.addEventListener('click', () => {
    alert('Coupon applied (demo)');
  });
}

window.addEventListener('DOMContentLoaded', renderCart);
