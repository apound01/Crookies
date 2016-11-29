$(document).ready( function() {

  let cart = {};
  let total = 0;

  const renderCart = () => {
    if(localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      $("#invisible-cart").val(localStorage.getItem("cart"));
      for(let product in cart['products'] ) {

        let subtotal = Math.round((cart['products'][product].quantity * cart['products'][product].price) * 100) / 100 ;
        new Promise( function(response, reject) {
          $(".panel-body.products")
          .append(`<tr>
                    <td data-th="Product">
                      <div class="row">
                      <div class="col-sm-2 hidden-xs"><img src="${cart['products'][product].image}" alt="..." class="img-responsive"/></div>
                        <div class="col-sm-10">
                          <h4 class="nomargin">${cart['products'][product].name}</h4>
                        </div>
                      </div>
                    <br>
                    </td>
                    <td data-th="Price">$${cart['products'][product].price}</td>
                      <td data-th="Quantity">${cart['products'][product].quantity}
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

  let myToken;

  cart = JSON.parse(localStorage.getItem("cart"));

  $("#total").append(`<strong>${cart['total']}</strong>`)

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

  let handler = StripeCheckout.configure({
    key: "pk_test_nA2ImgLsFYl7lUGcafpZnbVN",
    locale: "auto",
    token: function(token){
      console.log(token);
      myToken = token.id;
      $("#invisible-token").val(myToken);
      $("#payment-form").submit();
    }
  })

  $("#stripe-button").on("click", function(event){
    handler.open({
      amount: JSON.parse(localStorage.cart).total * 100,
      email: $("#email").val(),
      name: "Christmas Crookies",
      description: "Input card information here:",
      currency: "cad"
    })
    event.preventDefault();
  })

  window.addEventListener('popstate', function() {
    handler.close();
  });

})
