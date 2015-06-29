$(document).ready(function(){
	/* This code is executed after the DOM has been completely loaded */
	
	var totWidth=0;
	var positions = new Array();
	
	$('#slides .slide').each(function(i){
		
		/* Traverse through all the slides and store their accumulative widths in totWidth */
		
		positions[i]= totWidth;
		totWidth += $(this).width();
		
		/* The positions array contains each slide's commulutative offset from the left part of the container */
		
		if(!$(this).width())
		{
			alert("Please, fill in width & height for all your images!");
			return false;
		}
		
	});
	
	$('#slides').width(totWidth);

	/* Change the cotnainer div's width to the exact width of all the slides combined */

	$('#menu ul li a').click(function(e,keepScroll){

			/* On a thumbnail click */

			$('li.menuItem').removeClass('act').addClass('inact');
			$(this).parent().addClass('act');
			
			var pos = $(this).parent().prevAll('.menuItem').length;
			
			$('#slides').stop().animate({marginLeft:-positions[pos]+'px'},450);
			/* Start the sliding animation */
			
			e.preventDefault();
			/* Prevent the default action of the link */
			
			
			// Stopping the auto-advance if an icon has been clicked:
			if(!keepScroll) clearInterval(itvl);
	});
	
	
	/* For OverviewIcons so that it slides to the correct pages and highlights current page */
	$('.subnav1').click(function(e,keepScroll){

			/* On a thumbnail click */

			$('li.menuItem').removeClass('act').addClass('inact');
			$('#navbut2').addClass('act');
			
			var pos = 2;
			
			$('#slides').stop().animate({marginLeft:-positions[pos]+'px'},450);
			/* Start the sliding animation */
			
			e.preventDefault();
			/* Prevent the default action of the link */
			
			
			// Stopping the auto-advance if an icon has been clicked:
			if(!keepScroll) clearInterval(itvl);
	});

	$('.subnav2').click(function(e,keepScroll){

			/* On a thumbnail click */

			$('li.menuItem').removeClass('act').addClass('inact');
			$('#navbut3').addClass('act');
			
			//var pos = $(this).parent().prevAll('.subnav').length;//
			var pos = 3;
			
			$('#slides').stop().animate({marginLeft:-positions[pos]+'px'},450);
			/* Start the sliding animation */
			
			e.preventDefault();
			/* Prevent the default action of the link */
			
			
			// Stopping the auto-advance if an icon has been clicked:
			if(!keepScroll) clearInterval(itvl);
	});
	
	$('.subnav3').click(function(e,keepScroll){

			/* On a thumbnail click */


			$('li.menuItem').removeClass('act').addClass('inact');
			$('#navbut4').addClass('act');
		
			//var pos = $(this).parent().prevAll('.subnav').length;//
			var pos = 4;
			
			$('#slides').stop().animate({marginLeft:-positions[pos]+'px'},450);
			/* Start the sliding animation */
			
			e.preventDefault();
			/* Prevent the default action of the link */
			
			
			// Stopping the auto-advance if an icon has been clicked:
			if(!keepScroll) clearInterval(itvl);
	});
		
	$('.subnav4').click(function(e,keepScroll){

			/* On a thumbnail click */

			$('li.menuItem').removeClass('act').addClass('inact');
			$('#navbut5').addClass('act');
			
			//var pos = $(this).parent().prevAll('.subnav').length;//
			var pos = 5;
			
			$('#slides').stop().animate({marginLeft:-positions[pos]+'px'},450);
			/* Start the sliding animation */
			
			e.preventDefault();
			/* Prevent the default action of the link */
			
			
			// Stopping the auto-advance if an icon has been clicked:
			if(!keepScroll) clearInterval(itvl);
	});
	
	$('#menu ul li.menuItem:first').addClass('act').siblings().addClass('inact');
	/* On page load, mark the first thumbnail as active */
	
	
	
	/*****
	 *
	 *	Enabling auto-advance.
	 *
	 ****/
	 
	var current=1;
	function autoAdvance()
	{
		if(current==-1) return false;
		
		$('#menu ul li a').eq(current%$('#menu ul li a').length).trigger('click',[true]);	// [true] will be passed as the keepScroll parameter of the click function on line 28
		current++;
	}

	// The number of seconds that the slider will auto-advance in:
	
	var changeEvery = 1000;

	var itvl = setInterval(function(){autoAdvance()},changeEvery*1000);

	/* End of customizations */
});