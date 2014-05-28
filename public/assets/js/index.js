(function(){

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

function loadTopic(){
	$.get('/topic/list', function(data){
		data.topics.forEach(function(topic){
			var emptyD = $(".isEmpty:first");

			$(emptyD).find("h3").text(topic.Title);
			$(emptyD).find("img").attr("src", topic.Links);
			console.log(topic.Links);
			$(emptyD).find("a").attr("href", "event.html?topicID=" + topic._id);

			$(emptyD).removeClass("isEmpty");
		})
	})
}

loadTopic();

}());