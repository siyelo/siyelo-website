$(document).ready(function(){

  // sticky navigation menu
  stickyNav('#header');

  // SMOOTH SCROLLING
  $('a.js-smooth[href*=#]:not([href=#])').click(function(e) {
    e.preventDefault();
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('section#' + target[0].id).scrollintoview({ duration: 2000});
      }
    }
  });

  // smooth scroll logo link only if menu is sticky
  $('#logo a').click(function(e) {
    if($(e.target).parents('header').hasClass('sticky')) {
      e.preventDefault();
      $('section#spaced').scrollintoview({ duration: 2000});
    }
  });

  // mobile menu toggle
  $('#menu-toggle').click(function(e){
    e.preventDefault();
    $('#main-nav').slideToggle();
  });

  /// SCROLL SPY
  scrollItems = $('#main-nav a').map(function(){
    var item = $($(this).attr("href"));
      if (item.length) { return item; }
  });
  headerSectionHeight = $('#spaced').height();

  topSectionHeight = $('#spaced').outerHeight()+15;
  menuItems = $('#main-nav').find("a");

  $(window).scroll(function(){
    var fromTop = $(this).scrollTop()+topSectionHeight;

    var cur = scrollItems.map(function(){
         if ($(this).offset().top < fromTop)
           return this;
     });
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";
    menuItems.removeClass("active");
    if(fromTop > topSectionHeight){
      menuItems.end().find("a[href=#"+id+"]").addClass("active");
    }
  });
  /// END

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

  function highlightNavLink(href) {
    $('#main-nav a').removeClass('active');
    $("#main-nav a[href='" + href + "']").addClass('active');
  }

  // Parallax
  // $(window).scroll(function(){
  //   $("#space").css({
  //     top: $(window).scrollTop()*.1*-1
  //   });
  //   $("#engine").css({
  //     top: $(window).scrollTop()*.3*-1
  //   });
  //   $("#stars-1").css({
  //     top: $(window).scrollTop()*.3*-1
  //   });
  //   $("#stars-2").css({
  //     top: $(window).scrollTop()*.2*-1
  //   });
  //   $("#stars-3").css({
  //     top: $(window).scrollTop()*.1*-1
  //   });
  // });
});

$(window).load(function(){
  $('.bwWrapper').BlackAndWhite({
    hoverEffect : true, // default true
    // set the path to BnWWorker.js for a superfast implementation
    webworkerPath : false,
    // for the images with a fluid width and height
    responsive:true,
    speed: { //this property could also be just speed: value for both fadeIn and fadeOut
      fadeIn: 200, // 200ms for fadeIn animations
      fadeOut: 800 // 800ms for fadeOut animations
    }
  });
});
