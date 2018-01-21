$(document).ready(function() {

  //$('body').addClass('js');
  var $menu = $('.b-primaryNav__list'),
      $trigger = $('.hamburger');  
   
  $trigger.click(function() {
    $trigger.toggleClass('active');
    $menu.toggleClass('active');
    return false;
  });

  alert("js works");
 
});