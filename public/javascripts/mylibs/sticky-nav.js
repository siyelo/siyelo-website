function stickyNav(element) {
  var mainNav    = $(element);
  var topOffset = mainNav.offset().top;
  $(window).scroll(function() {
    var scrolled  = $(window).scrollTop();
    if(scrolled > topOffset) {
       mainNav.addClass('sticky');
    }else{
       mainNav.removeClass('sticky');
    }
  });
}
