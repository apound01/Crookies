'use strict';

$(document).ready(function(){

  let cart = {};
  let total = 0;

  if(sessionStorage.getItem("cart")) {
    cart = JSON.parse(sessionStorage.getItem("cart"));
    for (let product in cart) {
      total += cart[product]["quantity"];
    }
    $("#cart-items").text("Cart(" + total + ")");
  }

  $(".btn.btn-default").on("click", function() {
    total += 1;
    const name = $(this).data("item-name");
    const price = parseFloat($(this).data("item-price"));
    const id = $(this).data("item-id");
    if(!cart[id]) {
      cart[id] = {
        "name": name,
        "price": price,
        "quantity": 1
      }
    } else {
      cart[id]["quantity"] += 1;
    }

    let jsonString = JSON.stringify(cart);
    sessionStorage.setItem("cart", jsonString);
    cart = JSON.parse(sessionStorage.getItem("cart"));
    $("#cart-items").text("Cart(" + total + ")");
  })
})
