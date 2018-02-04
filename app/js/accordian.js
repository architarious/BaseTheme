$(document).ready(function() {
    var allPanels = $('.m-accordian > .m-accordian__copy').hide();
    $('.m-accordian > .m-accordian__copy:first-of-type').slideDown();
    $('.m-accordian > .m-accordian__copy:first-of-type').attr('aria-expanded', 'true');

    $('.m-accordian > .m-accordian__title > a').click(function(){
        allPanels.slideUp();
        $(this).parent().next().slideDown();
        $('.m-accordian .m-accordian__title.active').removeClass('active');
        $('.m-accordian .m-accordian__copy').attr('aria-expanded', 'false' );
        $(this).parent().next().attr('aria-expanded', 'true');        
        $(this).parent().toggleClass('active');
        return false;
    });    

});