let iconCart = document.querySelector('.icon-cart');
let closeCard = document.querySelector('.close');
let chackOut = document.querySelector('.chack-out');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.list-product');
let listCart = document.querySelector('.list-cart');
let iconCartSpan = document.querySelector('.icon-cart span');
let listCartHTML = document.querySelector('.list-cart');

let listProducts = [];
let carts =[] ;

iconCart.addEventListener('click', () => {
    body.classList.toggle('show-cart');
})

closeCard.addEventListener('click', () => {
    body.classList.toggle('show-cart'); 
})

const loadProduct = () => {
    fetch('product.json')
    .then(res => res.json())
    .then(data => {
        listProducts = data;
        addDataToHTML();
    }
    )

    
};
loadProduct();

const addDataToHTML = () => {
   listProductHTML.innnerHTML = '';
   if(listProducts.length > 0 ){
    listProducts.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.dataset.id = product.id;
        newProduct.innerHTML =`
        <img src="${product.image}" alt="">
        <h2>${product.name}</h2>
        <div class="price">৳ ${product.price}</div>
        <button class="add-cart">
            Add To Cart
        </button>
        `;

        listProductHTML.appendChild(newProduct);
    })
   }
}


listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('add-cart')){
        let productId = positionClick.parentElement.dataset.id;
        addToCart(productId);
    }
});

const addToCart = (productId) =>{
    let positionThisProductInCart = carts.findIndex((value) => value.productId == productId);
  if(carts.length <= 0){
    carts = [{
        productId: productId,
        quantity: 1
    }]
  }

  else if(positionThisProductInCart < 0){
    carts.push({
        productId: productId,
        quantity : 1
    })
  }

  else{
    carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity +1;
  }

  addcartToHTML();
}




const addcartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if(carts.length > 0 ){
        carts.forEach(card => {
            totalQuantity = totalQuantity + card.quantity;
            let newCard = document.createElement('div');
            newCard.classList.add('item');
            newCard.dataset.id = card.productId;
            let positionProduct = listProducts.findIndex((value) => value.id == card.productId);
            let info = listProducts[positionProduct];
            newCard.innerHTML = `
            <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalprice">
                    ৳${info.price * card.quantity}
                </div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${card.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
            listCartHTML.appendChild(newCard);
        })
    }

    iconCartSpan.innerText = totalQuantity;
}


listCartHTML.addEventListener('click', (evemt) => {
    const positionClick = evemt.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
     let productId= positionClick.parentElement.dataset.id;
     let type= 'ninus';
     if(positionClick.classList.contains('plus')){
        type = 'plus';  
     }
    }
})


// const changeQuntity = (productId , type) => {
//     let positionItenInCart = carts.findIndex((value) => value.productId = productId);
//     if(positionItenInCart >= 0){
//         switch (type) {
//             case 'plus':
//                 carts[positionItenInCart].quantity = carts[positionItenInCart] +  1;
                
//                 break;
        
//             default:
//                 let valueChange = carts[positionItenInCart] -1;
//                 if(valueChange >0){
//                     carts[positionItenInCart] = valueChange;
//                 }
//                 else{
//                     carts.splice(positionItenInCart ,1);
//                 }
//                 break;
//         }
//     }
//     addcartToHTML();
// }