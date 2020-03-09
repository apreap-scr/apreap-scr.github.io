$(function () {

    $("#range1").ionRangeSlider({
        hide_min_max: true,
        min: 0,
        max: 100,
        from: 90,
        step: 1,
        postfix: "%"
    });
    $("#range2").ionRangeSlider({
        hide_min_max: true,
        min: 0,
        max: 100,
        from: 80,
        step: 1,
        postfix: "%"
    });
    $("#range3").ionRangeSlider({
        hide_min_max: true,
        min: 0,
        max: 100,
        from: 95,
        step: 1,
        postfix: "%"
    });
    $("#range4").ionRangeSlider({
        hide_min_max: true,
        min: 0,
        max: 100,
        from: 65,
        step: 1,
        postfix: "%"
    });
    $("#range5").ionRangeSlider({
        hide_min_max: true,
        min: 0,
        max: 100,
        from: 73,
        step: 1,
        postfix: "%"
    });

});

// tabs
$(function () {

    $("#reviews_tabs").tabs();

// buttons
    let countClick = 0;
    $("#reviews_button_left").click(function () {
        countClick++;
        let e = $("#reviews_tabs ul").find("li");
        if (countClick >= e.length) {
            countClick = 0;
        }
        let a = $(e[countClick]).find("a");
        $(a).trigger("click");
    });
    $("#reviews_button_right").click(function () {
        countClick--;
        let e = $("#reviews_tabs ul").find("li");
        if (countClick < 0) {
            countClick = e.length - 1;
        }
        let a = $(e[countClick]).find("a");
        $(a).trigger("click");
    });

});

$(function () {

    $("#reviews_tabssort").tabs();

});

$(document).on('ready', function () {
    $(".lazy").slick({
        lazyLoad: 'ondemand',
        infinite: true
    });
});
//--------------------------------------
// --------------- select
function tabssort_selectSort() {
    let valueSelect = document.getElementById("tabssort_selectSort").value;
    // console.log(valueSelect);
    sort1(valueSelect);
}

function sort1(nameData) {
    //---------------- sort
    let a = document.querySelectorAll("#reviews_tabssort .ui-tabs-panel.ui-corner-bottom.ui-widget-content");

    function sort(ob, name) {
        let i, j, c;
        for (i = 0; i < ob.length; i++) {
            for (j = i + 1; j < ob.length; j++) {
                if (Number(ob[i][name]) > Number(ob[j][name])) {  // от меньшего до большего
                    // console.log(ob[i][name] ," > ",  ob[j][name]);
                    c = ob[i];
                    ob[i] = ob[j];
                    ob[j] = c;
                }
            }
        }
    }

    let newOb = [];

    function NewOb(ob, data) {
        this.ob = ob;
        this.data = data;
    }

    for (let i = 0; i < a.length; i++) {

        let elemHiddenFalse = a[i];

        if (elemHiddenFalse.getAttribute("aria-hidden") == "false") {

            // find visible elem
            let e = elemHiddenFalse.querySelectorAll(".col .img");

            for (let j = 0; j < e.length; j++) {
                newOb[j] = new NewOb(e[j], e[j].getAttribute(nameData));
                // newOb[j] = new NewOb(e[j], e[j].getAttribute("data-size"));
            }
            sort(newOb, "data");

            // console.log("----------------");
            // ---- remove Child elem ------------
            for (let j = 0; j < e.length; j++) {
                e[j].parentNode.removeChild(e[j]);
            }
            // ------ append Child elem -----------
            let col = elemHiddenFalse.querySelectorAll(".col");
            for (let j = 0; j < col.length; j++) {
                col[j].append(newOb[j].ob);
            }
        }
    }
}
//---------------< menu nav >------------------------------//

$( document ).ready(function(){
    $("#lay_navmenu_button").click(function(){

        $("#lay_navmenu_nav").toggleClass('lay_navmenu_button-active');
    });
});























