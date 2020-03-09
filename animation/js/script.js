$(document).on('ready', function () {
    $(".lazy").slick({
        lazyLoad: 'ondemand',
        infinite: true,
        dots: true,
        arrows: false
    });
});

(function () {

    $(".animation").slick({
        dots: false,
        arrows: false,
        lazyLoad: 'ondemand',
        infinite: true,
        autoplay: false,
        rtl: true,
        cssEase: 'cubic-bezier(0.805, 0, 1.000, 0.240)'
    });

    // $('.animation').on('afterChange', function (event, slick, direction) {
    //     console.log(direction);
    // });

    function main() {
        itm1_1(3000)
            .then(() => movebut_arrow(1000, ".itm-v2"))
            .then(() => movebut_arrow(1000, ".itm-v2"))
            .then(() => movebut_ok(1000, ".itm-v2"))
            .then(() => itm1_2(1000))
            .then(() => movebut_arrow(1000, ".itm-v3"))
            .then(() => movebut_arrow(1000, ".itm-v3"))
            .then(() => movebut_ok(1000, ".itm-v3"))
            .then(() => revolve(1000))
            .then(() => itm2_1(3000))
            .then(() => movebut_arrow(1000, ".itm-v2"))
            .then(() => movebut_arrow(1000, ".itm-v2"))
            .then(() => movebut_ok(1000, ".itm-v2"))
            .then(() => itm2_2(1000))
            .then(() => movebut_arrow(1000, ".itm-v3"))
            .then(() => movebut_arrow(1000, ".itm-v3"))
            .then(() => movebut_ok(1000, ".itm-v3"))
            .then(() => recurs(1000))
    }

    main();

    function revolve(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                $('.animation').slick('slickNext');
            }, ms);
        });
    }

    function recurs(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                $('.animation').slick('slickNext');
                main();
            }, ms);
        });
    }

    function movebut_arrow(ms, v) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                let e = `#headmov ${v} .wrap-itm-buttons-ar`;
                $(e).removeClass("movebut-2");
                $(e).addClass("movebut-1");
                setTimeout(() => {
                    $(e).removeClass("movebut-1");
                    $(e).addClass("movebut-2");
                }, 500);
            }, ms);
        });
    }

    function movebut_ok(ms, v) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                let e = `#headmov ${v} .itm-buttons-ok`;
                $(e).removeClass("movebut-4");
                $(e).addClass("movebut-3");
                setTimeout(() => {
                    $(e).removeClass("movebut-3");
                    $(e).addClass("movebut-4");
                }, 500);
            }, ms);
        });
    }

    function def_1() {
        $("#headmov .itm1 .itm-v1").css("display", "block");
        $("#headmov .itm1 .itm-v2").css("display", "none");
        $("#headmov .itm1 .itm-v3").css("display", "none");
    }

    function def_2() {
        $("#headmov .itm2 .itm-v1").css("display", "block");
        $("#headmov .itm2 .itm-v2").css("display", "none");
        $("#headmov .itm2 .itm-v3").css("display", "none");
    }

    function itm1_1(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                def_2();
                $("#headmov .itm1 .itm-v1").css("display", "none");
                $("#headmov .itm1 .itm-v2").css("display", "block");
                $("#headmov .itm1 .itm-v3").css("display", "none");
            }, ms);
        });
    }

    function itm1_2(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                $("#headmov .itm1 .itm-v1").css("display", "none");
                $("#headmov .itm1 .itm-v2").css("display", "none");
                $("#headmov .itm1 .itm-v3").css("display", "block");
            }, ms);
        });
    }

    function itm2_1(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                def_1();
                $("#headmov .itm2 .itm-v1").css("display", "none");
                $("#headmov .itm2 .itm-v2").css("display", "block");
                $("#headmov .itm2 .itm-v3").css("display", "none");
            }, ms);
        });
    }

    function itm2_2(ms) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                $("#headmov .itm2 .itm-v1").css("display", "none");
                $("#headmov .itm2 .itm-v2").css("display", "none");
                $("#headmov .itm2 .itm-v3").css("display", "block");
            }, ms);
        });
    }

}());


