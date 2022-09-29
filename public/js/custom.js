/*==========

Theme Name: Gimnasio - Fitness & Gym Responsive HTML5 Template
Theme Version: 1.0

==========*/

/*==========
----- JS INDEX -----
1.Whole Script Strict Mode Syntax
2.Loader JS
3.Wow Animation JS
4.Smooth Scrolling JS
5.Scroll To Top JS
6.Sticky Header JS
7.Toogle Menu Mobile JS
8.Our Classes Slider JS
9.Trainer Slider JS
10.Gallery Slider JS
11.Testimonial Slider JS
12.FAQ Accordian JS
13.Submenu For Mobile JS
==========*/

$(document).ready(function($) {

    // Whole Script Strict Mode Syntax
    "use strict";


    $(window).ready(function() {
        // Loader JS Start
        $('.loader-box').fadeOut();
        // Loader JS End
        $('body').removeClass('fixed');
        // Wow Animation JS Start
        new WOW().init();
        // Wow Animation JS Start
    });

    // Smooth Scrolling JS Start
	if(window.location.hash){
		// smooth scroll to the anchor id
		$('html,body').animate({
			scrollTop:$(window.location.hash).offset().top - 100
			},1000,'swing');
		} else {
			setTimeout( function() { scroll(0,0); }, 1);
		}
	// Smooth Scrolling JS End

    // Scroll To Top JS Start
	$('#scroll-to-top').on('click', function() {
        $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
    });
	$(window).on( 'scroll', function() {
	  if ($(window).scrollTop() > 300) {
	    $("#scroll-to-top").fadeIn(500);
	  } else {
	    $("#scroll-to-top").fadeOut(500);
	  }
	});
	// Scroll To Top JS End

    // Sticky Header JS Start
    $(window).on('scroll', function() {
        if ($(window).scrollTop() >= 100) {
            $('.site-header').addClass('sticky-header');
        } else {
            $('.site-header').removeClass('sticky-header');
        }
    });
    // Sticky Header JS End

    // Toogle Menu Mobile JS Start
    $(".toggle-button").on('click', function() {
        $(".main-navigation").toggleClass('toggle-menu');
        $(".header-menu .black-shadow").fadeToggle();
    });
    $(".main-navigation ul li a").on('click', function() {
        $(".main-navigation").removeClass('toggle-menu');
        $(".header-menu .black-shadow").fadeOut();
    });
    $(".main-navigation ul li.sub-items>a").on('click', function() {
        $(".main-navigation").addClass('toggle-menu');
        $(".header-menu .black-shadow").stop();
    });
    $(".header-menu .black-shadow").on('click', function() {
        $(this).fadeOut();
        $(".main-navigation").removeClass('toggle-menu');
    });
    // Toogle Menu Mobile JS End

    // Our Classes Slider JS Start
    const our_classes_lider = new Swiper('.our-classes-lider', {
        direction: 'vertical',
        mousewheelControl: true,
        slidesPerView: 2,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        spaceBetween: 30,
        speed: 1500,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                direction: 'horizontal',
            },
            992: {
                slidesPerView: 2,
                direction: 'vertical',
            }
        },
    });
    $('.our-classes-lider').hover(function() {
        our_classes_lider.autoplay .stop();
    }, function() {
        our_classes_lider.autoplay.start();
    });
    // Our Classes Slider JS End

    // Trainer Slider JS Start
    const trainer_slider = new Swiper('.trainer-slider', {
        slidesPerView: 3,
        loop: true,
        parallax: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 1500,
        direction: 'horizontal',
        effect: 'slide',
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            }
        },
    });
    $('.trainer-slider').hover(function() {
        trainer_slider.autoplay.stop();
    }, function() {
        trainer_slider.autoplay.start();
    });
    // Trainer Slider JS End

    // Gallery Slider JS Start
    const gallery_slider = new Swiper('.gallery-slider', {
        slidesPerView: 5,
        loop: true,
        parallax: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 1500,
        direction: 'horizontal',
        effect: 'slide',
        spaceBetween: 20,
        navigation: false,
        pagination: false,
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            576: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1200: {
                slidesPerView: 4,
            },
            1500: {
                slidesPerView: 5,
            }
        },
    });
    $('.gallery-slider').hover(function() {
        gallery_slider.autoplay.stop();
    }, function() {
        gallery_slider.autoplay.start();
    });
    // Gallery Slider JS End

	// Testimonial Slider JS Start
    const testimonial_slider = new Swiper('.testimonial-slider', {
        slidesPerView: 3,
        loop: true,
        parallax: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        speed: 1500,
        direction: 'horizontal',
        effect: 'slide',
        spaceBetween: 30,
        navigation: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 2,
            },
            1200: {
                slidesPerView: 3,
            }
        },
    });
    $('.testimonial-slider').hover(function() {
        testimonial_slider.autoplay.stop();
    }, function() {
        testimonial_slider.autoplay.start();
    });
    // Testimonial Slider JS End

    // FAQ Accordian JS Start
    jQuery('.faq-accordian .faq-accordian-content').hide();
    jQuery('.faq-accordian-title').click(function(j) {
        var dropDown = jQuery(this).closest('.faq-accordian-box').find('.faq-accordian-content');
        jQuery(this).closest('.faq-accordian').find('.faq-accordian-content').not(dropDown).slideUp();
        if (jQuery(this).hasClass('active-faq')) {
            jQuery(this).removeClass('active-faq');
        } else {
            jQuery(this).closest('.faq-accordian').find('.faq-accordian-title.active-faq').removeClass('active-faq');
            jQuery(this).addClass('active-faq');
        }
        dropDown.stop(false, true).slideToggle();
        j.preventDefault();
    });
    // FAQ Accordian JS End

    if ($(window).width() < 992) {
        // Submenu For Mobile JS Start
		$('body').on('click', '.main-navigation ul li.sub-items>a', function() {
            if (($(this).parent().hasClass('active-sub-menu'))) {
            $(this).parent().removeClass('active-sub-menu');
            $(this).parent().find('ul').slideUp();
            } else {
                $(this).parent().addClass('active-sub-menu');
                $(this).parent().find('ul').slideDown();
            }
        });
		// Submenu For Mobile JS End
    }
});