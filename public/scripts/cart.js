$(document).ready(function(){

  let cart = {};

  const items_in_cart = () =>{

    if(localStorage.getItem("cart")) {

      cart = JSON.parse(localStorage.getItem("cart"));
      cart.forEach( (product) => {

      })
    }
  }
})
