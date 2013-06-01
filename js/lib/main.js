$(document).ready(function() {
  $('a').smoothScroll();
  if ( $(window).width() < 768) {
    $('li.col').removeClass("active");
  }
  window.addEventListener("load",function(){setTimeout(function(){window.scrollTo(0,1)},0)});
});
