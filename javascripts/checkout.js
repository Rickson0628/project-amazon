import { cart, removeProductCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { moneyConvertion } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOption} from '../data/deliveryOption.js'


let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const matchingProduct = products.find(product => product.id === cartItem.productId);

  if (matchingProduct) {
    cartSummaryHTML += 
    `
      <div class="cart-item-container 
      js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
          ${moneyConvertion(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.productQuantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary" data-product-id = "${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct)}
        </div>
      </div>
    </div>`;
  }
});
function deliveryOptionsHTML(matchingProduct){
  let html = '';

  deliveryOption.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 ? 
     'FREE': `${moneyConvertion(deliveryOption.priceCents)} -`;
    html += 
    `<div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
               ${dateString}
              </div>
              <div class="delivery-option-price">
                ${priceString} Shipping
              </div>
            </div>
          </div>`  
  });

  return html;
}


// Update the header
if (cart.length === 0) {
  document.querySelector('.page-title').textContent = "Your cart is empty.";
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


document.querySelector('.js-order-summary').addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-quantity-link')) {
    const productId = event.target.dataset.productId;
    removeProductCart(productId);

    
    document.querySelector(`.js-cart-item-container-${productId}`).remove();

   
    if (cart.length === 0) {
      document.querySelector('.page-title').textContent = "Your cart is empty.";
    }
  }
});
