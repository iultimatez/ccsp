(function(){

//add new comment
var commentTmpl = '<li><span></span></li>',
	commentInput = $(".comment_input"),
	commentInput2 = $(".comment_input2"),
	commentInput3 = $(".submit_comment");


commentInput.on("keyup", function(e){
	if(e.which === 13){
		var input = $(this),
			ul = input.parents(".aspect_comment").find(".comment_list"),
			scrollTo;

		$(commentTmpl).appendTo(ul).find("span").text(input.val());
		var modal = input.parents(".aspect_comment").find(".modal-body").find(".comment_list2");
		$(commentTmpl).appendTo(modal).find("span").text(input.val());
		input.val("");
		scrollTo = ul.find("li:last");
		ul.scrollTop(scrollTo.offset().top - ul.offset().top + ul.scrollTop());
		
	}
})

commentInput2.on("keyup", function(e){
	if(e.which === 13){
		var input = $(this), ul = input.parents(".aspect_col").find(".aspect_comment").find(".comment_list");
		var expand = input.parents(".modal-content").find(".comment_list2");
		
		$(commentTmpl).appendTo(ul).find("span").text(input.val());
		$(commentTmpl).appendTo(expand).find("span").text(input.val());
		scrollTo = ul.find("li:last");
		ul.scrollTop(scrollTo.offset().top - ul.offset().top + ul.scrollTop());
		input.val("");
	}
})

commentInput3.on("click", function(e){
	var input = $(this), ul = input.parents(".aspect_col").find(".aspect_comment").find(".comment_list");
	var expand = input.parents(".modal-content").find(".comment_list2");
	var inputValue = $(this).siblings(".col-xs-10").find(".comment_input2");
	
	$(commentTmpl).appendTo(ul).find("span").text(inputValue.val());
	$(commentTmpl).appendTo(expand).find("span").text(inputValue.val());
	scrollTo = ul.find("li:last");
	ul.scrollTop(scrollTo.offset().top - ul.offset().top + ul.scrollTop());
	inputValue.val("");
})

//load dimension
// var dimensions = {"topicId": "", "dimension": []};
// var dimension = {"dimensionId": "", "name": "", "comment": []};

// dimension.dimensionId = "0";
// dimension.name = "TopicName";
// dimension.comment.push("123");
// dimensions.topicId = "0";
// dimensions.dimension.push(dimension);

// var emptyD = $(".isEmpty:first");

// function loadDimension(){
// 	var ul = $(emptyD).find("ul");

// 	$(emptyD).find("p").text(dimension.name);
// 	$(commentTmpl).appendTo(ul).find("span").text(dimension.comment.pop());

// 	$(emptyD).removeClass("isEmpty");
// }

// loadDimension();

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
		}
	})
})

}());