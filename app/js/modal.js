function modal(btnID, modalID){

    $(btnID+".modal_btn").click( function(){
        $(modalID+".modal").css("display", "block");

        $("body").click(function(e){
            if( $(e.target).closest(modalID+".modal .modal__content, "+btnID+".modal_btn").length === 0){
                $(modalID+".modal").css("display", "none");
            }
        });
    });

    $(modalID+".modal .close").click( function(){
        $(modalID+".modal").css("display", "none");
    });
}

$(document).ready(function(){

    //modal("#modal-1_btn", "#modal-1");
    //modal("#modal-2_btn", "#modal-2");

});



/*
* FUTURE REFERENCE
* There's a certain way to construct a fully accessible modal, the short script above, is NOT IT!
* Here's a tutorial by Ire Aderinokun on how to do it the right way: https://bitsofco.de/accessible-modal-dialog/ 
* Once I find more of practical need for modals, I"ll implement it here. 
*/
