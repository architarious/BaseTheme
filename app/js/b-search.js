/**
 * This accessible search script was originally created by Ahmad Shadeed
 * https://www.a11ymatters.com/pattern/accessible-search/
 */

function search(){
    var alert = document.getElementById('error');
    var button = document.querySelector('.b-search__button');
    var input = document.getElementById('search'); 

    button.addEventListener('click', checkInput);

    function checkInput(e) {
        e.preventDefault();

        if(input.value === "") {
            alert.innerHTML = "";
            var span = document.createElement('span');
            span.innerHTML = "You need to enter a search term before pressing submit";
            alert.appendChild(span);
            input.setAttribute('aria-invalid', true);
            input.focus();
        }
    }

}


window.onload = function() {
    //alert.setAttribute('aria-hidden', true);
};