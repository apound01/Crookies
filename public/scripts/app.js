'use strict';

$(document).ready(function(){

  let cart = {};
  let total = 0;
  if(localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    for(let product in cart) {
      total += Number(cart[product]["quantity"]);
    }
    $("#cart-items").text("Cart(" + total + ")");
  }

  $(".btn.add-cart").on("click", function() {
    total += 1;
    const name = $(this).data("item-name");
    const price = parseFloat($(this).data("item-price"));
    const id = $(this).data("item-id");
    const description = $(this).data("item-description");
    const image = $(this).data("item-image");
    if(!cart[id]) {
      cart[id] = {
        "name": name,
        "price": price,
        "quantity": 1,
        "description": description,
        "image": image
      }
    } else {
      cart[id]["quantity"] += 1;
    }

    let jsonString = JSON.stringify(cart);
    localStorage.setItem("cart", jsonString);
    $("#cart-items").text("Cart(" + total + ")");
  })
})
