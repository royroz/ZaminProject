(function($) {

/* Superfish
	================================================== */
	$('#navigation ul.menu')
	.find('li.current_page_item,li.current_page_parent,li.current_page_ancestor,li.current-cat,li.current-cat-parent,li.current-menu-item')
		.addClass('active')
		.end()
		.superfish({autoArrows	: true});
	$("#toggle").click(function() { 
		// hides matched elements if shown, shows if hidden
		$("#login-form").slideToggle();
	});

	// Style Tags
	$('p.tags a').wrap('<span class="st_tag" />');
	

	// Toggle Slides
	
	$(".toggle_container").hide(); 
	//Switch the "Open" and "Close" state per click then slide up/down (depending on open/close state)
	$("p.trigger").click(function(){
		$(this).toggleClass("active").next().slideToggle("normal");
		return false; //Prevent the browser jump to the link anchor
	});

	$('a[rel*=external]').click( function() {
		window.open(this.href);
		return false;
	});


	/* Tabs Activiation
	================================================== */
	var tabs = $('ul.tabs');
	tabs.each(function(i) {
		//Get all tabs
		var tab = $(this).find('> li > a');
		$("ul.tabs li:first").addClass("active").fadeIn('fast'); //Activate first tab
		$("ul.tabs li:first a").addClass("active").fadeIn('fast'); //Activate first tab
		$("ul.tabs-content li:first").addClass("active").fadeIn('fast'); //Activate first tab
		
		tab.click(function(e) {
			
			//Get Location of tab's content
			var contentLocation = $(this).attr('href') + "Tab";
			
			//Let go if not a hashed one
			if(contentLocation.charAt(0)=="#") {
			
				e.preventDefault();
			
				//Make Tab Active
				tab.removeClass('active');
				$(this).addClass('active');
				
				//Show Tab Content & add active class
				$(contentLocation).show().addClass('active').siblings().hide().removeClass('active');
				
			} 
		});
	});
	
	$(".carousel-posts").jCarouselLite({
		scroll: 1,
		auto: 8000,
		btnNext: ".CarNext",
		btnPrev: ".CarPrev"
	});	
	
	function portfolio_quicksand() {
		
		// Setting Up Our Variables
		var $filter;
		var $container;
		var $containerClone;
		var $filterLink;
		var $filteredItems
		
		// Set Our Filter
		$filter = $('.filter li.active a').attr('class');
		
		// Set Our Filter Link
		$filterLink = $('.filter li a');
		
		// Set Our Container
		$container = $('ul.filterable-grid');
		
		// Clone Our Container
		$containerClone = $container.clone();
		
		// Apply our Quicksand to work on a click function
		// for each for the filter li link elements
		$filterLink.click(function(e) 
		{
			// Remove the active class
			$('.filter li').removeClass('active');
			
			// Split each of the filter elements and override our filter
			$filter = $(this).attr('class').split(' ');
			
			// Apply the 'active' class to the clicked link
			$(this).parent().addClass('active');
			
			// If 'all' is selected, display all elements
			// else output all items referenced to the data-type
			if ($filter == 'all') {
				$filteredItems = $containerClone.find('li'); 
			}
			else {
				$filteredItems = $containerClone.find('li[data-type~=' + $filter + ']'); 
			}
			
			// Finally call the Quicksand function
			$container.quicksand($filteredItems, 
			{
				// The Duration for animation
				duration: 750,
				// the easing effect when animation
				easing: 'easeInOutCirc',
				// height adjustment becomes dynamic
				adjustHeight: 'dynamic' 
			});
			
			//Initalize our PrettyPhoto Script When Filtered
			$container.quicksand($filteredItems, 
				function () { lightbox(); }
			);			
		});
	}
		
	function lightbox() {
		// Apply PrettyPhoto to find the relation with our portfolio item
		$("a[rel^='prettyPhoto']").prettyPhoto({
			// Parameters for PrettyPhoto styling
			animationSpeed:'fast',
			slideshow:5000,
			theme:'pp_default',
			show_title:false,
			overlay_gallery: false,
			social_tools: false
		});
	}
	
	if($().prettyPhoto) {
		lightbox();
	}
		
	if($().quicksand) {
		portfolio_quicksand();	
	}
		
	 // add class to anchor eg. .post a
	 $('.carousel-post a, .portfolio a').has('img').addClass('prettyPhoto');
	 $("a[class^='prettyPhoto']").prettyPhoto();
	 $('.carousel-post a, .portfolio a').has('img').attr('rel', '[gallery]'); //make sure gallery is wrapped in square brackets

	// add title from anchor to image description, add gallery for multiple images

	 $('.carousel-post a, .portfolio a').click(function () {
	 var desc = $(this).attr('title');
	 $('.carousel-post a, .portfolio a').has('img').attr('title', desc, 'rel', '[gallery]' ); //make sure gallery is wrapped&nbsp;&nbsp;square brackets

	}); 
  
	//=============== MENU FIXED POSITION ===============//
	$(window).scroll(function() {
		if($(this).scrollTop() != 0) {
			$('#header').addClass('headfixed');
		} else {
			$('#header').removeClass('headfixed');
		}
	});
  
	$(window).load(function() {
        $('#nivo-slider').nivoSlider({
			effect:'random',
			slices:15, // For slice animations
			boxCols: 8, // For box animations
			boxRows: 4, // For box animations
			animSpeed:500, // Slide transition speed
			pauseTime:9000, // How long each slide will show
			startSlide:0, // Set starting Slide (0 index)
			directionNav:true, //Next & Prev
			controlNav:true, // 1,2,3... navigation
			controlNavThumbs:false, // Use thumbnails for Control Nav
			pauseOnHover:true, //Stop animation while hovering
			manualAdvance:false, //Force manual transitions
			prevText:"Prev", // Prev directionNav text
			nextText:"Next", // Next directionNav text
			randomStart:false,
			beforeChange: function(){}, // Triggers before a slide transition
			afterChange: function(){}, // Triggers after a slide transition
			slideshowEnd: function(){}, // Triggers after all slides have been shown
			lastSlide: function(){}, // Triggers when last slide is shown
			afterLoad: function(){} // Triggers when slider has loaded
		});
	}); 
	
	
	
	$( '#your-login a' ).click(function(e) {
	  $( '.your-login' ).fadeToggle( 'fast', 'linear' );
	});
	
	$( '#menubut' ).click(function(e) {
	  $( '#navigation' ).slideToggle( 'fast', 'linear' );
	  e.preventDefault();
	});
	
	var $window = $(window);
	$window.resize(function() {
		// if ($('body').width() > 768) {
			// (function(){
				// $( '#navigation' ).css({'display':'block'});
			// })();
		// } else {
			// (function(){
				// $( '#navigation' ).css({'display':'none'});
			// })();
		// }
	});

/***********************************************************************************************************************
DOCUMENT: includes/javascript.js
DEVELOPED BY: Ryan Stemkoski
COMPANY: Zipline Interactive
EMAIL: ryan@gozipline.com
PHONE: 509-321-2849
DATE: 3/26/2009
UPDATED: 3/25/2010
DESCRIPTION: This is the JavaScript required to create the acc style menu.  Requires jQuery library
NOTE: Because of a bug in jQuery with IE8 we had to add an IE stylesheet hack to get the system to work in all browsers. I hate hacks but had no choice :(.
************************************************************************************************************************/
	//acc BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.accButton').click(function() {

		//REMOVE THE ON CLASS FROM ALL BUTTONS
		$('.accButton').removeClass('on');
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
		$('.accContent').slideUp('slow');
   
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($(this).next().is(':hidden') == true) {
			
			//ADD THE ON CLASS TO THE BUTTON
			$(this).addClass('on');
			  
			//OPEN THE SLIDE
			$(this).next().slideDown('slow');
		 } 
		  
	 });
	  
	
	/*** REMOVE IF MOUSEOVER IS NOT REQUIRED ***/
	
	//ADDS THE .OVER CLASS FROM THE STYLESHEET ON MOUSEOVER 
	$('.accButton').mouseover(function() {
		$(this).addClass('over');
		
	//ON MOUSEOUT REMOVE THE OVER CLASS
	}).mouseout(function() {
		$(this).removeClass('over');										
	});
	
	/*** END REMOVE IF MOUSEOVER IS NOT REQUIRED ***/
	
	
	/********************************************************************************************************************
	CLOSES ALL S ON PAGE LOAD
	********************************************************************************************************************/	
	$('.accContent').hide();
	
})(jQuery)