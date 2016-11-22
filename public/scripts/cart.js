$(document).ready(function(){

  let cart = {};

  const items_in_cart = () =>{

    if(sessionStorage.getItem("cart")) {

      cart = JSON.parse(sessionStorage.getItem("cart"));

    }
  }

  
}
