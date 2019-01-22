$(document).ready(function(){

$('#modalButton').click( function(){
  $('#modal-1').css("display", "block" );
});

$('#modal-1 .close').click( function(){ 
  $("#modal-1").css("display", "none");
});

$('body').click(function(e){
  if( $(e.target).closest('#modal-1 .modal__content, #modalButton').length === 0){
    $("#modal-1").css("display", "none");
  }
});

});