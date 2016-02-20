jQuery.noConflict()(function($){
var onanimate = false;

jQuery(function($){
	// Scroll to top button
	var scrollTimeout;
	
	$('a.scroll-top').click(function(){
		$('html,body').animate({scrollTop:0},500);
		return false;
	});

	$(window).scroll(function(){
		clearTimeout(scrollTimeout);
		if($(window).scrollTop()>400){
			scrollTimeout = setTimeout(function(){$('a.scroll-top:hidden').fadeIn()},100);
		}
		else{
			scrollTimeout = setTimeout(function(){$('a.scroll-top:visible').fadeOut()},100);	
	}
	});
	
	//Initial ScrollSpy, Carousel, Images grayscale
	$('.nav-collapse').scrollspy();
	$('.carousel').carousel({interval:false});
	
	// Scroll to section onclick to menu
	
	$('#nav .nav a ').click(function(e){
		e.preventDefault();
		var des = $(this).attr('href');
		goToSectionID(des);
	})

	$('#thecircles .circle a').click(function(e){
		e.preventDefault();
		var des = $(this).attr('href');
		goToSectionID(des);
	})
	//Fix dropdown bootstrap
	$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); })
				.on('touchstart.dropdown', '.dropdown-submenu', function (e) {e.preventDefault();});
	if( 'ontouchstart' in document.documentElement ) {
		var clickable = null;
		$('#access .menu-item').each(function(){
			var $this = $(this);

			if( $this.find('ul.sub-menu').length > 0 ) {

				$this.find('a:first').unbind('click').bind('touchstart',function(event){
					if( clickable != this ) {
						clickable = this;
						event.preventDefault();
					} else {
						clickable = null;
					}
				});
			}
		});
	}
	//Trigger change url on scroll
	$('.nav-collapse').on('activate',function(e){
		if(onanimate) return;
		
		if(history.pushState) {
		    history.pushState(null, null, $('.nav-collapse .active a').attr('href'));
		}
		else {
			//var currenttop = $(window).scrollTop();
		  //  location.hash = $('.nav-collapse .active a').attr('href');
		  //$(window).scrollTop(currenttop);
		}
		
	})
});
/**
 * Scroll to section
 * @param  string des HTML identity of section block
 * @return void
 */
function goToSectionID(des){
	var os = (history.pushState)?51:0;
	os = (jQuery(window).width()>800)?os:0;

	var pos = (jQuery(des).length>0 )?jQuery(des).offset().top-os:0;
	onanimate = true;
	jQuery('html,body').animate({scrollTop:pos},1000,function(){
		if(history.pushState){
			history.pushState(null,null,des);
		}else		window.location.hash = des;
		jQuery(window).scrollTop(pos);
		onanimate=false
	});
}

    });


