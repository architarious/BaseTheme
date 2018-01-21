$(document).ready(function() {

  //$('body').addClass('js');
  var $menu = $('#primaryNav'),
      $trigger = $('.b-primaryNav__trigger'); 
  
  $trigger.click(function() {
    $trigger.toggleClass('active');
    $menu.toggleClass('active');
    return false;
  });
 
});