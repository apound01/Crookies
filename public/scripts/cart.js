$(document).ready( function() {

  let cart = {};

  const getCart = () => {
    if(localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
      return cart;
    } else {
      return 0;
    }
  }
})
