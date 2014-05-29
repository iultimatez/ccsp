(function(){

//add new comment
var commentTmpl = '<li><span></span></li>',
	commentInput = $(".comment_input"),
	commentInput2 = $(".comment_input2"),
	commentInput3 = $(".submit_comment");
var topicID = location.search.slice(1);

commentInput.on("keyup", function(e){
	if(e.which === 13){
		var input = $(this),
			ul = input.parents(".aspect_comment").find(".comment_list"),
			scrollTo;
		var expand = input.parents(".aspect_comment").find(".comment_list2");
		var dimensionID = input.parents(".aspect_col").find(".DimensionID").text();

		$(commentTmpl).appendTo(ul).find("span").text(input.val());
		$(commentTmpl).appendTo(expand).find("span").text(input.val());
		var modal = input.parents(".aspect_comment").find(".modal-body").find(".comment_list");
		$(commentTmpl).appendTo(modal).find("span").text(input.val());

		$.post('/opinion/create', {Op: input.val(), TopicID: topicID, DimensionID: dimensionID});

		input.val("");
		scrollTo = ul.find("li:last");
		ul.scrollTop(scrollTo.offset().top - ul.offset().top + ul.scrollTop());
	}
})

commentInput2.on("keyup", function(e){
	if(e.which === 13){
		var input = $(this), ul = input.parents(".aspect_col").find(".aspect_comment").find(".comment_list");
		var expand = input.parents(".modal-content").find(".comment_list2");
		var dimensionID = input.parents(".aspect_col").find(".DimensionID").text();
		
		$(commentTmpl).appendTo(ul).find("span").text(input.val());
		$(commentTmpl).appendTo(expand).find("span").text(input.val());

		$.post('/opinion/create', {Op: input.val(), TopicID: topicID, DimensionID: dimensionID});

		scrollTo = ul.find("li:last");
		ul.scrollTop(scrollTo.offset().top - ul.offset().top + ul.scrollTop());
		input.val("");
	}
})

commentInput3.on("click", function(e){
	var input = $(this), ul = input.parents(".aspect_col").find(".aspect_comment").find(".comment_list");
	var expand = input.parents(".modal-content").find(".comment_list2");
	var inputValue = $(this).siblings(".col-xs-10").find(".comment_input2");
	var dimensionID = input.parents(".aspect_col").find(".DimensionID").text();
	
	$(commentTmpl).appendTo(ul).find("span").text(inputValue.val());
	$(commentTmpl).appendTo(expand).find("span").text(inputValue.val());

	$.post('/opinion/create', {Op: inputValue.val(), TopicID: topicID, DimensionID: dimensionID});
	
	scrollTo = ul.find("li:last");
	ul.scrollTop(scrollTo.offset().top - ul.offset().top + ul.scrollTop());
	inputValue.val("");
})

//load topic
function loadTopic(){
	$.get('/topic/show/?id=' + topicID, function(data){
		$(".topic_title").find("h1").text(data.Title);
		$(".topic_content").text(data.Content);
		$(".topic_image").find("img").attr("src", data.Links);
	})
}
loadTopic();

//load dimension
function loadDimension(){
	$.get('/dimension/getDimensionByTopicId/?id=' + topicID, function(data){
		data.dimensions.forEach(function(dimension){
			var emptyD = $(".isEmpty:first");
			var ul = $(emptyD).find("ul");

			$(emptyD).find("p").text(dimension.Di);
			$(emptyD).find(".modal-title").text(dimension.Di);
			while(dimension.Opinions.length > 0){
				$(commentTmpl).appendTo(ul).find("span").text(dimension.Opinions.pop());
			}
			$(emptyD).find(".DimensionID").text(dimension._id);

			$(emptyD).removeClass("isEmpty");
		})
	})
}

loadDimension();


//add dimension
var more = $(".hexagon");

more.on("click", function(){
	var emptyD = $(".isEmpty:first");
	var aspect = $(emptyD).find(".aspect_col");
	var titleInput = $(aspect).addClass("is-editing").find(".aspect_title input");

	$(emptyD).removeClass("isEmpty");
	$(titleInput).focus();

	titleInput.on("keyup", function(e){
		if(e.which === 13){
			var input = $(this);
			var modal = input.parents(".aspect_col").find(".modal-title");
			$(aspect).find("p").text(input.val());
			$(aspect).removeClass("is-editing");
			modal.text(input.val());
			$.post('/dimension/create', {Di: input.val(), TopicID: topicID});
		}
	})
})

}());