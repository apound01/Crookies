$(document).ready( function() {

  $("#textarea").keyup( (data) => {

    $("#on-image").val($("#textarea").val())
  })

  const getTotal = (products) => {
    let total = 0;
    for(let product in products) {
      let subtotal = Math.round((products[product].quantity * products[product].price) * 100) / 100 ;
      total += subtotal;
      total = Math.round(total * 100) / 100;
    }
    return total;
  }

  $("#alert").hide();

  let cart = {};
  let total_cart = 0;

  if(localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    for(let product in cart['products']) {
      total_cart += Number(cart['products'][product]["quantity"]);
    }
    $("#cart-items").text("Cart(" + total_cart + ")");
  }

  $(".btn.btn-primary").on("click", function(){
    if(!localStorage.getItem("cart")) {
      cart['products'] = {};
    }
    let quantity = 1;
    if($("#quantity-selected option:selected").text().trim() === "Choose Quantity") {
      total_cart += 1;
    } else {
      total_cart += Number($("#quantity-selected option:selected").text().trim());
      quantity = Number($("#quantity-selected option:selected").text().trim());
    }
    const name = $("#item-title").data("item-name");
    const price = parseFloat($("#price").data("item-price"));
    const id = $("#item-title").data("item-id");
    const description = $("#description").data("item-description");
    const image = $("#image").data("item-image");
    const crookie_note= $("#textarea").val();

    if(!cart.products[id]) {
      cart['products'][id] = {
        "name": name,
        "price": price,
        "quantity": quantity,
        "description": description,
        "image": image,
        "crookie_note": crookie_note
      }
    } else {
      cart['products'][id]["quantity"] += quantity;
    }
    cart['total'] = getTotal(cart['products']);
    let jsonString = JSON.stringify(cart);
    localStorage.setItem("cart", jsonString);
    $("#cart-items").text("Cart(" + total_cart + ")");
    $("#alert").show();
  })
})
