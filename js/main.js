/* =================================
------------------------------------
	ProDent - Dentist Template
	Version: 1.0
 ------------------------------------
 ====================================*/


'use strict';


$(window).on('load', function () {
    /*------------------
        Preloder
    --------------------*/
    $(".loader").fadeOut();
    $("#preloder").delay(400).fadeOut("slow");

});


(function ($) {
    /*------------------
        Navigation
    --------------------*/
    $('.nav-switch').on('click', function (event) {
        $(this).toggleClass('active');
        $('.nav-warp').slideToggle(400);
        event.preventDefault();
    });

    $(window).resize(() => {
        let nav = $('.nav-switch')
        if (!nav.is(':visible')) {
            $('.nav-warp').show();
        }
    });


    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });


    /*------------------
        Progress Bar
    --------------------*/
    $('.progress-bar-style').each(function () {
        var progress = $(this).data("progress");
        var bgcolor = $(this).data("bgcolor");
        var prog_width = progress + '%';
        if (progress <= 100) {
            $(this).append('<div class="bar-inner" style="width:' + prog_width + '; background: ' + bgcolor + ';"><span>' + prog_width + '</span></div>');
        } else {
            $(this).append('<div class="bar-inner" style="width:100%; background: ' + bgcolor + ';"><span>100%</span></div>');
        }
    });


    /*------------------
        Testimonials
    --------------------*/
    $('.testimonials-slider').owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        margin: 128,
        center: true,
        items: 1,
        mouseDrag: false,
        animateOut: 'fadeOutRight',
        animateIn: 'fadeInLeft',
        autoplay: true
    });


    /*------------------
        Brands Slider
    --------------------*/
    $('.brands-slider').owlCarousel({
        loop: true,
        nav: false,
        dots: false,
        margin: 40,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 2,
            },
            768: {
                items: 4,
            },
            1200: {
                items: 5,
            }
        }
    });


    /*------------------
        Popular Services
    --------------------*/
    $('.popular-services-slider').owlCarousel({
        loop: true,
        dots: false,
        margin: 40,
        autoplay: true,
        nav: true,
        navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            991: {
                items: 3
            }
        }
    });


    /*------------------
        Accordions
    --------------------*/
    $('.panel-link').on('click', function (e) {
        $('.panel-link').removeClass('active');
        var $this = $(this);
        if (!$this.hasClass('active')) {
            $this.addClass('active');
        }
        e.preventDefault();
    });


    /*------------------
        Circle progress
    --------------------*/
    $('.circle-progress').each(function () {
        var cpvalue = $(this).data("cpvalue");
        var cpcolor = $(this).data("cpcolor");
        var cptitle = $(this).data("cptitle");
        var cpid = $(this).data("cpid");

        $(this).append('<div class="' + cpid + ' loader-circle"></div><div class="progress-info"><h2>' + cpvalue + '%</h2><p>' + cptitle + '</p></div>');

        if (cpvalue < 100) {

            $('.' + cpid).circleProgress({
                value: '0.' + cpvalue,
                size: 110,
                thickness: 7,
                fill: cpcolor,
                emptyFill: "rgba(0, 0, 0, 0)"
            });
        } else {
            $('.' + cpid).circleProgress({
                value: 1,
                size: 110,
                thickness: 7,
                fill: cpcolor,
                emptyFill: "rgba(0, 0, 0, 0)"
            });
        }

    });


})(jQuery);

let pl = document.getElementById("plan");
if (pl) {
    document.getElementById("plan").value = selectPlan();
}


let app = document.getElementById('typewriter');
if (app) {
    const instance = new Typewriter(app, {
        autoStart: true,
        delay: 45,
        loop: true,
    });
    instance.typeString('Influencer Alpha')
        .pauseFor(1500)
        .deleteAll()
        .typeString('The Fastest Way to reach your goals!')
        .pauseFor(1500)
        .deleteChars(17)
        .typeString('get Thousands of Followers!')
        .pauseFor(2500)
        .start();
}

function selectPlan() {
    let urlplan = getAllUrlParams().plan;
    //TODO: Complete the dictionary
    let dict = {
        "1000f": "1000 Followers - $40"
    };

    return dict[urlplan] ? dict[urlplan] : "1000 Followers - $40";

}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateField(field) {
    let a = document.forms["checkForm"][field].value;
    return !(a == null || a === "");
}

function validate() {
    var email = $("#email").val();

    if (validateEmail(email)) {
        const fields = ["fname", "lname", "email", "iguname"];
        let fieldStatus = true;
        let x = 0;
        while (fieldStatus && x < fields.length) {
            fieldStatus = validateField(fields[x]);
            x++;
        }
        if (!fieldStatus) {
            alert("Some required fields are empty");
            document.getElementById(fields[x - 1]).style.border = "1px solid red";
        }
        return fieldStatus;
    } else {
        alert("Email address not correct!");
        return false;
    }
}

function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            paramName = paramName.toLowerCase();
            if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }

    return obj;
}


