$(document).ready(function(){

  // sticky navigation menu
  var mainNav    = $('#header');
  var topOffset = mainNav.offset().top;
  $(window).scroll(function() {
    var scrolled  = $(window).scrollTop();
    if(scrolled > topOffset) {
       mainNav.addClass('sticky');
    }else{
       mainNav.removeClass('sticky');
    }
  });

  // smooth scrolling to sections
  $(function() {
    $('#header a[href*=#]:not([href=#]), p.scroll a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('#' + target[0].id).scrollintoview({ duration: 2000});
        }
      }
    });
  });

  // mobile menu toggle
  $('#menu-toggle').click(function(e){
    e.preventDefault();
    $('#main-nav').slideToggle();
  });

  // add selected class on main-nav links
  $('#main-nav a').click(function(e){
    e.preventDefault();
    $('#main-nav a').removeClass('active');
    $(e.target).addClass('active');
  });

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
