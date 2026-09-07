(function ($) {
  $(function () {

    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $(".dropdown-trigger").dropdown();
    $('.slider').slider();
    $('.sidenav').sidenav();
    $('.tabs').tabs({
      swipeable: false
    });
    $('.scrollspy').scrollSpy();
    $('.modal').modal();
    $('.materialboxed').materialbox();
  }); // end of document ready
})(jQuery); // end of jQuery name space
