$(document).ready(function(){

  orderSections();
  $(window).resize(function(){
    orderSections();
  });

  sectionsList = $('section.slide');
  inViewId = sectionsList[0].id;

  targetId = document.location.hash
  if(targetId != ""){
    inViewId = targetId
    scrollToId(inViewId);
  }

  function scrollToId(id) {
    $('html, body').animate({
            scrollLeft: $('#' + id).offset().left
    }, 1000);
  }

  function findNextSection() {
    for (var i = 0; i < sectionsList.length; i++) {
      if (sectionsList[i].id === inViewId) {
        return sectionsList[i+1];
      }
    }
  }

  function findPrevSection() {
    for (var i = 0; i < sectionsList.length; i++) {
      if (sectionsList[i].id === inViewId) {
        return sectionsList[i-1];
      }
    }
  }

  $('a#scroll-left, a#scroll-right').css('position', 'fixed');
  $('a#scroll-left, a#scroll-right').css('z-index', '20');
  $('a#scroll-right').css('left', '50px');
  $('section.slide').css('width', $(window).width());
  $('html').css('overflow-x', 'hidden');

  $('footer').css('position', 'absolute');
  $('footer').css('top', $('#' + inViewId).height());
  $('footer').css('width', $(window).width());

  $('a#scroll-left').on('click', function(e){
    e.preventDefault();
    prevSectionId = findPrevSection().id;
    scrollToId(prevSectionId);
    inViewId = prevSectionId;
    $('footer').css('top', $('#' + inViewId).height());
    $('html, body').css('height', $('#' + inViewId).height());
    $('footer').css('width', $(window).width());
    $('footer').css('left', $('#' + inViewId).offset().left);
  });

  $('a#scroll-right').on('click', function(e){
    e.preventDefault();
    nextSectionId = findNextSection().id;
    console.log(nextSectionId);
    scrollToId(nextSectionId);
    inViewId = nextSectionId;
    $('footer').css('top', $('#' + inViewId).height());
    $('html, body').css('height', $('#' + inViewId).height());
    $('footer').css('width', $(window).width());
    $('footer').css('left', $('#' + inViewId).offset().left);
  });

  function orderSections(){
    slides = $('section.slide');
    slidesCount = slides.length;
    slides.css('position', 'absolute');
    windowWidth = $(window).width();
    for(i=0; i<slidesCount; i++) {
      $(slides[i]).css('left', windowWidth * i);
    }
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
