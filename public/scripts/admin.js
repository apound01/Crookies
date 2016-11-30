$(document).ready( function() {

  let shipped;
  $(".checkbox").change( function() {
    let id = $(this).attr('id');
    if($(`#${id}`).data("shipped") === true){
      shipped = false;
    } else {
      shipped = true;
    }
    $(`#${id}`).data("shipped")
    $.ajax({
      method:"POST",
      url:"/admin",
      data: {order_id: id,
            shipped: shipped}
    }).done( function(){
      location.reload();
    })
  })
})
