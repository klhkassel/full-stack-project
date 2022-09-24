$(document).ready(function($) {
	// Whole Script Strict Mode Syntax
	"use strict";

	// Smooth Scrolling JS Start
	$( '.main-navigation ul li a' ).on( 'click', function(e){		
	  var href = $(this).attr( 'href' );	  
	  $( 'html, body' ).animate({
			scrollTop: $( href ).offset().top
	  }, 800 );
	  e.preventDefault();
	});
	// Smooth Scrolling JS End

	$(window).on('scroll', function() {
		var windscroll = $(window).scrollTop();
		if (windscroll >= 0) {
			$('.common-sec').each(function(i) {
        // The number at the end of the next line is how pany pixels you from the top you want it to activate.
				if ($(this).position().top <= windscroll - (-100)) {
					$('.main-navigation ul li.active').removeClass('active');
					$('.main-navigation ul li').eq(i).addClass('active');
				}
			});

		} else {

			$('.main-navigation ul li.active').removeClass('active');
			$('.main-navigation ul li:first').addClass('active');
		}

		}).scroll();


	// Toogle Menu Mobile JS Start
	$(".toggle-button").on('click', function(){
		$(".main-navigation").toggleClass('toggle-menu');
	});
	$(".main-navigation ul li a").on('click', function(){
		$(".main-navigation").removeClass('toggle-menu');
	});
	// Toogle Menu Mobile JS End

});