function accordian(accordianID){    
    var allPanels = $(accordianID+".accordian > .accordian__copy").hide();
    $(accordianID+".accordian > .accordian__copy:first-of-type").slideDown();
    $(accordianID+".accordian > .accordian__copy:first-of-type").attr("aria-expanded", "true");

    $(accordianID+".accordian > .accordian__title > a").click(function(){
        allPanels.slideUp();
        $(this).parent().next().slideDown();
        $(accordianID+".accordian .accordian__title.active").removeClass("active");
        $(accordianID+".accordian .accordian__copy").attr("aria-expanded", "false" );
        $(this).parent().next().attr("aria-expanded", "true");        
        $(this).parent().toggleClass("active");
        return false;
    });   

}

$(document).ready(function() {
  //accordian("#accordian-1");   
  //accordian("#accordian-2");   
});