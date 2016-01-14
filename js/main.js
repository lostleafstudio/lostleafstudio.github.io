---
layout: null
exclude: true
---
$(document).ready(function (e) {
    $('.post img').addClass('img-responsive')
  
    $('a').on('click', function() {
      var id = $(this).attr('href');
      $('html, body').animate({scrollTop: $(id).offset().top - $('nav').height});
  });
})
