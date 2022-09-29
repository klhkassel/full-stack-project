/*==========

Theme Name: Gimnasio - Fitness & Gym Responsive HTML5 Template
Theme Version: 1.0

==========*/

/*==========
----- JS INDEX -----
1.Whole Script Strict Mode Syntax
2.Moving JS
==========*/


$(document).ready(function ($) {

	// Whole Script Strict Mode Syntax
	"use strict";
});

if ($(window).width() >= 992) {
	// Moving JS Start
	var lFollowX = 0,
		lFollowY = 0,
		x = 0,
		y = 0,
		friction = 1 / 30;
	
	function moveBackground() {
		x += (lFollowX - x) * friction;
		y += (lFollowY - y) * friction;
	
		translate = 'translateX(' + x + 'px) translateY(' + y + 'px)';
	
		$('.animate-this').css({
			'-webit-transform': translate,
			'-moz-transform': translate,
			'transform': translate
		});
	
		window.requestAnimationFrame(moveBackground);
	}
	
	$(window).on('mousemove click', function (e) {
	
		var isHovered = $('.animate-this:hover').length > 0;
	
		if (!isHovered) {
			var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX)),
				lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
	
			lFollowX = (20 * lMouseX) / 20;
			lFollowY = (10 * lMouseY) / 20;
		}
	});
	
	moveBackground();
	// Moving JS End
}




