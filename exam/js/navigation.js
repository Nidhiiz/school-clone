if (window.matchMedia('(max-width: 768px)').matches) {
    var cols = document.getElementsByClassName('this_show');
    for (i = 0; i < cols.length; i++) {
        cols[i].style.display = 'block';
    }

    $(document).on('click', '.exam_dropdown_left', function() {
        $(".exam_dropdown_left").removeClass("menu_border_active");
        console.log('hello')
        $(this).addClass("menu_border_active");
        $(".menu_level_three").css('display', 'none');
        var div_to_show = $(this).attr("data-div-id");
        console.log(div_to_show);
        $("#" + div_to_show).css({
            "display": "block",
            "transform": " translateX(0%)"
        });
    })
}

if (window.matchMedia('(min-width: 768px)').matches) {
    var cols = document.getElementsByClassName('this_show');
    for (i = 0; i < cols.length; i++) {
        cols[i].style.display = 'none';
    }

    $(document).on('click', '.exam_dropdown_left', function() {
        $(".exam_dropdown_left").removeClass("menu_border_active");
        console.log('hello')
        $(this).addClass("menu_border_active");
        $(".menu_level_three").css('display', 'none');
        var div_to_show = $(this).attr("data-div-id");
        console.log(div_to_show);
        $("#" + div_to_show).css({
            "display": "block",
            "transform": " translateX(0%)"
        });
    });

}




$(".toggle_for_mobile").click(function() {
    $(".collapse_new").toggleClass("collapse_show");
    $(".overlay_mobile").css('display', 'block');
    $(".close_menu_overlay").css('display', 'block');
});

$(".overlay_mobile").click(function() {
    $(".collapse_new").removeClass("collapse_show");
    $(this).css('display', 'none');
    $(".this_show").css('display', 'none');
});

$(".toggle_for_mobile").click(function() {
    $("body").css('overflow', 'hidden');
});

$(".overlay_mobile").click(function() {
    $("body").css('overflow', "visible");
});

$(document).on('click', '.mobile_back', function() {
    $(".this_show").css('transform', 'translateX(-100%)');
});


$(".nav-link").click(function() {

    var id = $(this).attr("id");
    $(".dm-hover").removeClass("show");
    $("#" + id).removeClass("active_toggle");


    if ($(this).attr('aria-expanded') == 'true') {

        $(this).attr('aria-expanded', "false");
        $("#" + id + "_open").removeClass("show");

    } else {


        if ($("#" + id + "_open").hasClass("show") == true && $(this).attr('aria-expanded') == 'true') {
            $(this).attr('aria-expanded', "false");
            $("#" + id + "_open").removeClass("show");
        } else {
            $("#" + id).addClass("active_toggle");
            $("#" + id + "_open").addClass("show");
            $(this).attr('aria-expanded', "true");
        }

    }


});



$('li.dropdown.mega-dropdown a').on('click', function(event) {
    $(this).parent().toggleClass('open');
});



$(".dropdown-menu").mouseover(function() {
    $(this).parent('li').addClass('menu-hover-class');
    $(this).prev('a').addClass('menu-hover-class-a');

});

$(".dropdown-menu").mouseout(function() {
    $(this).parent('li').removeClass('menu-hover-class');
    $(this).prev('a').removeClass('menu-hover-class-a');
});


$(".dropdown-account").click(function() {
    var has_this = $(".dropdown-account").hasClass('open');
    if (has_this == false) {
        $(".custon-after").css('display', 'block');
    } else {
        $(".custon-after").css('display', 'none');
    }


});