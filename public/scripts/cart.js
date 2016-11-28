$(document).ready( function() {

  let cart = {};
  let total = 0;

  const renderCart = () => {
    if(localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      for(let product in cart['products'] ) {

        let subtotal = Math.round((cart['products'][product].quantity * cart['products'][product].price) * 100) / 100 ;
        // total += subtotal;
        // total = Math.round(total * 100) / 100;
        new Promise( function(response, reject) {
          $("tbody").append(`<tr>
                             <td data-th="Product">
                             <div class="row">
                             <div class="col-sm-2 hidden-xs"><img src="${cart['products'][product].image}" alt="..." class="img-responsive"/></div>
                             <div class="col-sm-10">
                             <h4 class="nomargin">${cart['products'][product].name}</h4>
                             <p>${cart['products'][product].description}</p>
                             </div>
                             </div>
                             </td>
                             <td data-th="Price">$${cart['products'][product].price}</td>
                             <td data-th="Quantity">
                             <input type="number" id="item-quantity-${product}" class="form-control text-center" value="${cart['products'][product].quantity}">
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

  cart = JSON.parse(localStorage.getItem("cart"));

  $("#total").append(`<strong>${cart.total}</strong>`)

  $(".refresh").on("click", function() {
    cart = JSON.parse(localStorage.getItem("cart"));
    for(let product in cart['products']){
      if( $(`#item-quantity-${product}`).val() !== cart['products'][product].quantity){
        cart['products'][product]['quantity'] = $(`#item-quantity-${product}`).val();
        if(cart['products'][product]['quantity'] < 1){
          delete cart['products'][product];
        }
      }
    }
    if( Object.keys(cart['products']).length === 0 && cart['products'].constructor === Object ) { // Make into function
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
    for(let product in cart['products']){
      if( $(this).data("item-id") === Number(product)) {
        delete cart['products'][product];
      }
    }
    if( Object.keys(cart['products']).length === 0 && cart['products'].constructor === Object ) { // Make into function
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
