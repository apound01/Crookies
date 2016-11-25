$(document).ready( function() {

  let cart = {};
  let total = 0;

  const renderCart = () => {
    if(localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      for(let product in cart ) {

        let subtotal = Math.round((cart[product].quantity * cart[product].price) * 100) / 100 ;
        total += subtotal;
        total = Math.round(total * 100) / 100;
        new Promise( function(response, reject) {
          $(".panel-body.products").append(`<tr>
                             <td data-th="Product">
                             <div class="row">
                             <div class="col-sm-2 hidden-xs"><img src="${cart[product].image}" alt="..." class="img-responsive"/></div>
                             <div class="col-sm-10">
                             <h4 class="nomargin">${cart[product].name}</h4>
                             </div>
                             </div>
                             <br>
                             </td>
                             <td data-th="Price">$${cart[product].price}</td>
                             <td data-th="Quantity">${product}
                             </td>
                             <td data-th="Subtotal" class="text-center">$${subtotal}</td>
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

  $("#total").append(`<strong>${total}</strong>`)

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
