'use strict';

$(document).ready(function(){

  let cart = {};
  let total_cart = 0;

  const getTotal = (products) => {
    let total = 0;
    for(let product in products) {
      let subtotal = Math.round((products[product].quantity * products[product].price) * 100) / 100 ;
      total += subtotal;
      total = Math.round(total * 100) / 100;
    }
    return total;
  }

  if(localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
    for(let product in cart['products']) {
      total_cart += Number(cart['products'][product]["quantity"]);
    }
    $("#cart-items").text("Cart " + total_cart);
  }

  $(".btn.add-cart").on("click", function() {
    if(!localStorage.getItem("cart")){
      cart['products'] = {};
    }
    total_cart += 1;
    const name = $(this).data("item-name");
    const price = parseFloat($(this).data("item-price"));
    const id = $(this).data("item-id");
    const description = $(this).data("item-description");
    const image = $(this).data("item-image");
    if(!cart.products[id]) {
      cart['products'][id] = {
        "name": name,
        "price": price,
        "quantity": 1,
        "description": description,
        "image": image
      }
    } else {
      cart['products'][id]["quantity"] += 1;
    }
    cart['total'] = getTotal(cart['products']);
    let jsonString = JSON.stringify(cart);
    localStorage.setItem("cart", jsonString);
    $("#cart-items").text("Cart "+total_cart);
  })
})
