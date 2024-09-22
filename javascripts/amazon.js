import{cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';

products.forEach((product) => {
  displayProducts(product);
});




function displayProducts(product){
  // Product Container
  const productContainer = document.createElement('div');
  productContainer.classList.add('product-container');
  
  
  // Image Container
  const imgDiv = document.createElement('div');
  imgDiv.classList.add('product-image-container')  

  // Product Image
  const image = document.createElement('img');
  image.classList.add('product-image-container');
  image.src = product.image;
  imgDiv.appendChild(image);

  // Product Name
  const name = document.createElement('div');
  name.classList.add('product-name');
  name.innerHTML= product.name;

  // Product Rating Container
  const divRating= document.createElement('div');
  divRating.classList.add('product-rating-container')

  // Product Stars Rating Image
  const starsRating= document.createElement('img');
  starsRating.classList.add('product-rating-stars');
  starsRating.src = product.rating.stars;
  divRating.appendChild(starsRating);


  // Product Number Rating
  const starsCount= document.createElement('div');
  starsCount.classList.add('product-rating-count');
  starsCount.classList.add('link-primary');
  starsCount.innerHTML = product.rating.count;
  divRating.appendChild(starsCount);

  // Product Price
  const price = document.createElement('div');
  price.classList.add('product-price');
  price.innerHTML = `$${(product.priceCents / 100).toFixed(2)}`;

  // Dropdown Container
  const selectDiv = document.createElement('div');
  selectDiv.classList.add('product-quantity-container');

  // Select 
  const select= document.createElement('select');
  selectDiv.appendChild(select);

  // Option
  for(let i = 1; i <= 10; i++){
    const option = document.createElement('option');
    option.value = i;
    option.innerHTML = `${i}`;
    
    select.appendChild(option);

  }

  // Spacer
  const spacer = document.createElement('div');
  spacer.classList.add('product-spacer');


  // Add to Cart Container
  const imageDiv  = document.createElement('div');
  imageDiv.classList.add('added-to-cart');

  // Image Check Mark
  const cartImage= document.createElement('img');
  cartImage.src= "images/icons/checkmark.png";
  imageDiv.appendChild(cartImage);

  // Add to Cart Button
  const productButton = document.createElement('button');
  productButton.classList.add('add-to-cart-button');
  productButton.classList.add('button-primary');
  productButton.innerHTML = 'Add to Cart';
  

  // Adding to Cart function
  productButton.addEventListener('click', ()=>{
    addToCart(product, select, productButton);
  });

  // Appending
  productContainer.appendChild(imgDiv);
  productContainer.appendChild(name);
  productContainer.appendChild(divRating);
  productContainer.appendChild(price);  
  productContainer.appendChild(selectDiv);  
  productContainer.appendChild(spacer);
  productContainer.appendChild(imageDiv);
  productContainer.appendChild(productButton);
  document.querySelector('.products-grid').appendChild(productContainer);


}



