/* ---------- @ Circle Hover -----------*/
jQuery.noConflict()(function($){
  $(document).ready(function ()
  {

  $('.circle').hover(
    function() {
      $(this).stop().animate({'margin-top': '-10px'}, 'normal');
    },
    function() {
      $(this).stop().animate({'margin-top': '0'}, 'fast');
  });
  });
});

/* ---------- @ Top Toggle -----------*/
jQuery.noConflict()(function($){
    var Speed = 300;
    var EaseMethod = 'easeInOutCirc';
    var sliderAnimation = 'slide';
    var topH = jQuery('.top-section .span12').height();
    jQuery('.top-section .span12').height('2px').css({
        padding: '0px'
    }).addClass('hidden');
    jQuery('.top-section a.toggle').addClass('toggleDown');
    jQuery('.top-section a.toggle').live('click', function () {
        var c = jQuery(this).parent().find('.span12');
        if (c.hasClass('hidden')) {
            c.stop().animate({
                height: topH,
                padding: "0px 0px"
            }, {
                duration: Speed
            }).removeClass('hidden');
            jQuery(this).removeClass('toggleDown');
        } else {
            c.stop().animate({
                height: "2px",
                padding: "0px"
            }, {
                duration: Speed
            }).addClass('hidden');
            jQuery(this).addClass('toggleDown');
        }
    });
  });

/* ---------- @ Loding -----------*/
jQuery.noConflict()(function($){
    $(window).load(function() {
        $(".loading").fadeOut(1000);    
    });
});
