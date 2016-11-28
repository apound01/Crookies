$(document).ready( function() {

  let cart = {};
  let total = 0;

  const renderCart = () => {
    if(localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
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

  $("#paynow").on("click", function() {
    let orderinfo = {};
    let cart = localStorage.getItem("cart");

    orderinfo['total_price'] = cart.total;
    orderinfo['email'] = $('#email').val();
    orderinfo['first_name'] = $('#first_name').val();
    orderinfo['last_name'] = $('#last_name').val();
    orderinfo['address'] = $('#shipping_address').val();
    orderinfo['city'] = $('#shipping_city').val();
    orderinfo['postalcode'] = $('#shipping_postalcode').val();
    orderinfo['province'] = $('#shipping_province option:selected').text().trim();
    orderinfo['country'] = $('#shipping_country option:selected').text().trim();
    orderinfo['note'] = $('#message').val().trim();

    $.ajax({
      method: "POST",
      url: "/checkout",
      data: {"orderinfo": orderinfo,
             "cart": cart},
      success: function(data, textStatus) {
        localStorage.clear();
        window.location.href = "/";
      }
    });
  })

})
