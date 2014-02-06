$(document).ready(function(){

  // projects scrolling
  $(document).on('click', '#next-slide, #previous-slide', function(e){
    e.preventDefault();
    link = $(e.target).parent()[0].href;
    targetId = $(e.target).parent()[0].id;
    if(targetId == 'next-slide'){
      scrollProjectPage("-9999", "9999");
    }else{
      scrollProjectPage("9999", "-9999");
    }
    $('#slide-nav').load(link + ' #slide-nav a');
    $('#mini-nav').load(link + ' #mini-nav');
  });

  function scrollProjectPage(animateLeft, positionLeft){
    $('section.case .wrapper').animate({ left: animateLeft }, 800, function(){
      $('section.case').load(link + ' section.case .wrapper', function(){
        $('section.case .wrapper').css("left", positionLeft + "px");
        $('section.case .wrapper').animate({left: "0"}, 600);
      });
    });
  }

  // sticky navigation menu
  stickyNav('#header');

  // smooth scrolling
  smoothScroll('js-smooth');

  // scroll spy (highlight link as scrolling through the page)
  scrollSpy('#main-nav', '#spaced');

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

  // team photos click event
  $('#team li').click(function(e){
    listItem = $(e.target).parents('li');
    txtWrapper = $(listItem).children('.txtWrapper');
    $(txtWrapper).children('p').slideToggle();
    $(listItem).toggleClass('active');
  });
  // close flash notice
  $('a.close').click(function(e){
    x = e.target;
    $(x).parents('#flashes').slideToggle();
  });

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
    responsive : true,
    speed: { //this property could also be just speed: value for both fadeIn and fadeOut
      fadeIn: 200, // 200ms for fadeIn animations
      fadeOut: 800 // 800ms for fadeOut animations
    }
  });
});
