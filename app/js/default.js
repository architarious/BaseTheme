$(document).ready(function(){

  //EQ.JS defaults  
  var block = document.querySelector('.eq-block');
  eqjs.definePts(block, {
    Small: 300,
    Medium: 400,
    Large: 500, 
  });
  var blockDet = document.querySelector('.eq-block--detail');
  eqjs.definePts(blockDet, {
    xxSmall: 0,
    xSmall: 150,
    Small: 300,
    Medium: 400,
    Large: 500,
    xLarge: 650,
    xxLarge: 800
  }); 
  
});