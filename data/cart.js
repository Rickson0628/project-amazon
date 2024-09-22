export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));

}

export function addToCart(product, select, productButton){

  /*
  productButton.setAttribute('data-product-name', product.name); 
  productButton.setAttribute('data-product-price', (product.priceCents/100).toFixed(2));
  productButton.setAttribute('data-product-quantity', select.value);
  productButton.setAttribute('data-product-id', product.id);
  */
 
  const quantity = parseInt(select.value);
  const productName = product.name;
  const productPrice = (product.priceCents/100).toFixed(2);
  const productId= product.id;

  // Check if it's already an existing product
  let existingProduct = cart.find(cartItem => cartItem.productId === productId);

  if (existingProduct) {
    existingProduct.productQuantity += quantity;
  } else {
    cart.push({
      productId: productId,
      productQuantity: quantity,
      deliveryOptionId: '1'
    });
  }

  // Update Cart Quantity 
  let cartQuantity = 0;
    cart.forEach((cart)=>{
      cartQuantity += cart.productQuantity
      
    });
    document.querySelector('.cart-quantity').textContent = cartQuantity > 0 ? `${cartQuantity}` : '';

    saveToStorage();
}

export function removeProductCart(productId){
  const newCart= [];
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;

    // Save it to local storage after 

    saveToStorage();
}