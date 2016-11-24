$(document).ready( function() {

  let cart = {};

  const renderCart = () => {
    if(localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      for(let product in cart ) {

        let subtotal = Math.round((cart[product].quantity * cart[product].price) * 100) / 100 ;

        new Promise( function(response, reject) {
          $("tbody").append(`<tr>
                             <td data-th="Product">
                             <div class="row">
                             <div class="col-sm-2 hidden-xs"><img src="${cart[product].image}" alt="..." class="img-responsive"/></div>
                             <div class="col-sm-10">
                             <h4 class="nomargin">${cart[product].name}</h4>
                             <p>${cart[product].description}</p>
                             </div>
                             </div>
                             </td>
                             <td data-th="Price">$${cart[product].price}</td>
                             <td data-th="Quantity">
                             <input type="number" id="item-quantity-${product}" class="form-control text-center" value="${cart[product].quantity}">
                             </td>
                             <td data-th="Subtotal" class="text-center">$${subtotal}</td>
                             <td class="actions" data-th="">
                             <button class="btn btn-info btn-sm refresh"><i class="fa fa-refresh"></i></button>
                             <button id="item-${product}" data-item-id="${product}" class="btn btn-danger btn-sm delete"><i class="fa fa-trash-o"></i></button>
                             </td>
                             </tr>`)
        })
      }
    } else {
      $("thead").hide();
      $("tbody").hide();
      $(".visible-xs").hide();
      $(".text-center").hide();
      $(".btn-block").hide();
      $(".products-class").append("<h3>There are no items in the cart!</h3>");
    }
  }

  renderCart();


  $(".refresh").on("click", function() {
    cart = JSON.parse(localStorage.getItem("cart"));
    for(let product in cart){
      if( $(`#item-quantity-${product}`).val() !== cart[product].quantity){
        cart[product]['quantity'] = $(`#item-quantity-${product}`).val();
        if(cart[product]['quantity'] < 1){
          delete cart[product];
        }
      }
    }
    if( Object.keys(cart).length === 0 && cart.constructor === Object ) { // Make into function
      localStorage.removeItem("cart");
      location.reload();
    } else {
      let jsonString = JSON.stringify(cart);
      if(localStorage.getItem("cart") !== jsonString) {
        localStorage.setItem("cart", jsonString);
        location.reload();
      }
    }
  })

  $(".delete").on("click", function() {
    cart = JSON.parse(localStorage.getItem("cart"));
    for(let product in cart){
      if( $(this).data("item-id") === Number(product)) {
        delete cart[product];
      }
    }
    if( Object.keys(cart).length === 0 && cart.constructor === Object ) { // Make into function
      localStorage.removeItem("cart");
      renderCart();
    } else {
      let jsonString = JSON.stringify(cart);
      if(localStorage.getItem("cart") !== jsonString) {
        localStorage.setItem("cart", jsonString);
        location.reload();
      }
    }
  })

})
