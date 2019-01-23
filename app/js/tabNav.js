/* This accessible tab navigation script is heavily borrowed from Jeff Smith: https://codepen.io/jeffsmith/pen/mPByya/ */

function tabNav(tabsID){
    var tabs = $(tabsID);

    // For each individual tab DIV, set class and aria-hidden attribute, and hide it
    $(tabs).find("> div").attr({
        "class": "tabNav__panel",
        "aria-hidden": "true"
    }).hide();

    // Get the list of tab links
    var tabNav__list = tabs.find("ul:first").attr({
        "class": "tabNav__tabs"
    });

    // For each item in the tabs list...
    $(tabNav__list).find("li > a").each(
        function(a){
            var tab = $(this);

            // Create a unique id using the tab link's href
            var tabId = "tab-" + tab.attr("href").slice(0);
            console.log(tabId);

            // Assign tab id and aria-selected attribute to the tab control, but do not remove the href
            tab.attr({
                "id": tabId,
                "aria-selected": "false",
            }).parent().attr("role", "presentation");

            // Assign aria attribute to the relevant tab panel
            $(tabs).find(".tabNav__panel").eq(a).attr("aria-labelledby", tabId);

            // Set the click event for each tab link
            tab.click(
                function(e){
                    var tabNav__panel;

                    // Prevent default click event
                    e.preventDefault();

                    // Change state of previously selected tabNav__list item and tabNav__panel 
                    $(tabNav__list).find("> li.active").removeClass("active").find("> a").attr("aria-selected", "false");
                    $(tabs).find(".tabNav__panel.active").removeClass("active");

                    // Hide previously selected tabNav__panel
                    $(tabs).find(".tabNav__panel:visible").attr("aria-hidden", "true").hide();

                    // Show newly selected tabNav__panel
                    tabNav__panel = $(tabs).find(".tabNav__panel").eq(tab.parent().index());
                    tabNav__panel.attr("aria-hidden", "false").addClass("active").show();

                    // Set state of newly selected tab list item
                    tab.attr("aria-selected", "true").parent().addClass("active");


                    // Set focus to the first heading in the newly revealed tab content
                    tabNav__panel.children("h2").attr("tabindex", -1).focus();
                }
            );
        }
    );

    // Set keydown events on tabList item for navigating tabs
    $(tabNav__list).delegate("a", "keydown",
        function (e) {
            var tab = $(this);
            switch (e.which) {
                case 37: case 38:
                    if (tab.parent().prev().length!=0) {
                        tab.parent().prev().find("> a").click();
                    } else {
                        $(tabNav__list).find("li:last > a").click();
                    }
                    break;
                case 39: case 40:
                    if (tab.parent().next().length!=0) {
                        tab.parent().next().find("> a").click();
                    } else {
                        $(tabNav__list).find("li:first > a").click();
                    }
                    break;
            }
        }
    );

    // Show the first tabNav__panel
    $(tabs).find(".tabNav__panel:first").attr("aria-hidden", "false").show();
    $(tabs).find(".tabNav__panel:first").addClass("active");

    // Set state for the first tabNav__list li
    $(tabNav__list).find("li:first").addClass("active").find(" > a").attr({
        "aria-selected": "true",
        "tabindex": "0"
    });

}

$(document).ready(function(){
   
});