$(document).ready(function(){var e=$(".m-accordian > .m-accordian__copy").hide();$(".m-accordian > .m-accordian__copy:first-of-type").slideDown(),$(".m-accordian > .m-accordian__copy:first-of-type").attr("aria-expanded","true"),$(".m-accordian > .m-accordian__title > a").click(function(){return e.slideUp(),$(this).parent().next().slideDown(),$(".m-accordian .m-accordian__title.active").removeClass("active"),$(".m-accordian .m-accordian__copy").attr("aria-expanded","false"),$(this).parent().next().attr("aria-expanded","true"),$(this).parent().toggleClass("active"),!1})}),$(document).ready(function(){var e=document.querySelector(".eq-block");eqjs.definePts(e,{Small:300,Medium:400,Large:500});var a=document.querySelector(".eq-block--detail");eqjs.definePts(a,{xxSmall:0,xSmall:150,Small:300,Medium:400,Large:500,xLarge:650,xxLarge:800})}),$(document).ready(function(){var e=$(".b-primaryNav__list"),a=$(".hamburger");a.click(function(){return a.toggleClass("active"),e.toggleClass("active"),!1})});