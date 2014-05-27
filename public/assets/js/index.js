$(document).ready(function() {
    var $container = $('div#event_table');
	var base_url = window.location.origin;
	var $events = new Array();

    $container.imagesLoaded(function() {
        $container.masonry({
	        itemSelector: '.item'
	    });
    });
})