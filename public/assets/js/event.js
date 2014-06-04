(function(){
//Check login
if(sessionStorage.userStatus == ""){
	$("#layout").html('<br><br><br><br><center><font size="6">請先登入</font></center>');
}

//add new comment
var commentTmpl = '<li><span class="opName"></span><span class="opContent"></span></li>',
	commentInput = $(".comment_input"),
	commentInput2 = $(".comment_input2"),
	commentInput3 = $(".submit_comment");
var topicID = location.search.slice(1);

commentInput.on("keyup", function(e){
	if(e.which === 13){
		var input = $(this);
		// 	ul = input.parents(".aspect_comment").find(".comment_list"),
		// 	scrollTo;
		// var expand = input.parents(".aspect_comment").find(".comment_list2");
		var dimensionID = input.parents(".aspect_col").find(".DimensionID").text();

		// $(commentTmpl).appendTo(ul).find("span").text(input.val());
		// $(commentTmpl).appendTo(expand).find("span").text(input.val());
		// var modal = input.parents(".aspect_comment").find(".modal-body").find(".comment_list");
		// $(commentTmpl).appendTo(modal).find("span").text(input.val());

		$.post('/opinion/create', {Op: input.val(), CreatedBy: sessionStorage.userStatus, TopicID: topicID, DimensionID: dimensionID});

		input.val("");
		// scrollTo = ul.find("li:last");
		// ul.scrollTop(scrollTo.offset().top - ul.offset().top + ul.scrollTop());

		reloadDimension();
	}
})

commentInput2.on("keyup", function(e){
	if(e.which === 13){
		var input = $(this);
		    // ul = input.parents(".aspect_col").find(".aspect_comment").find(".comment_list");
		// var expand = input.parents(".modal-content").find(".comment_list2");
		var dimensionID = input.parents(".aspect_col").find(".DimensionID").text();
		
		// $(commentTmpl).appendTo(ul).find("span").text(input.val());
		// $(commentTmpl).appendTo(expand).find("span").text(input.val());

		$.post('/opinion/create', {Op: input.val(), TopicID: topicID, CreatedBy: sessionStorage.userStatus, DimensionID: dimensionID});

		// scrollTo = ul.find("li:last");
		// ul.scrollTop(scrollTo.offset().top - ul.offset().top + ul.scrollTop());
		input.val("");

		reloadDimension();
	}
})

commentInput3.on("click", function(e){
	var input = $(this);
	    // ul = input.parents(".aspect_col").find(".aspect_comment").find(".comment_list");
	// var expand = input.parents(".modal-content").find(".comment_list2");
	// var inputValue = $(this).siblings(".col-xs-10").find(".comment_input2");
	var dimensionID = input.parents(".aspect_col").find(".DimensionID").text();
	
	// $(commentTmpl).appendTo(ul).find("span").text(inputValue.val());
	// $(commentTmpl).appendTo(expand).find("span").text(inputValue.val());

	$.post('/opinion/create', {Op: inputValue.val(), TopicID: topicID, CreatedBy: sessionStorage.userStatus, DimensionID: dimensionID});
	
	// scrollTo = ul.find("li:last");
	// ul.scrollTop(scrollTo.offset().top - ul.offset().top + ul.scrollTop());
	inputValue.val("");

	reloadDimension();
})

//load topic
function loadTopic(){
	$.get('/topic/show/?id=' + topicID, function(data){
		$(".topic_title").find("h1").text(data.Title);
		$(".topic_content").text(data.Content.replace("char(13)","<br>"));
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

			$(emptyD).find(".DimensionTitle").text(dimension.Di);
			$(emptyD).find(".modal-title").text(dimension.Di);
			for(i = 0; dimension.Opinions.length > 0; i++){
				Dop = dimension.Opinions.pop();
				$(commentTmpl).appendTo(ul).addClass(Dop.CreatedBy).find(".opContent").text(Dop.Op);

				$.get("/user/show/?id="+Dop.CreatedBy, function(user){
					$("."+user._id).removeClass(user._id).find(".opName").text(user.displayName+": ");
				})
			}
			$(emptyD).find(".DimensionID").text(dimension._id);

			$(emptyD).removeClass("isEmpty").addClass("notEmpty");

		})
	})
}

loadDimension();

//erase ul
function reloadDimension(){
	$(".notEmpty").removeClass("notEmpty").addClass("isEmpty");
	$(".DimensionTitle").text("");
	$(".modal-title").text("");
	$(".DimensionID").text("");
	$(".comment_list").text("");
	$(".comment_list2").text("");

	loadDimension();
}

//add dimension
var more = $(".hexagon");

more.on("click", function(){
	var emptyD = $(".isEmpty:first");
	var aspect = $(emptyD).find(".aspect_col");
	var titleInput = $(aspect).addClass("is-editing").find(".aspect_title input");

	$(emptyD).removeClass("isEmpty").addClass("notEmpty");
	$(titleInput).focus();

	titleInput.on("keyup", function(e){
		if(e.which === 13){
			var input = $(this);
			var modal = input.parents(".aspect_col").find(".modal-title");
			$(aspect).find(".DimensionTitle").text(input.val());
			$(aspect).removeClass("is-editing");
			modal.text(input.val());
			$.post('/dimension/create', {Di: input.val(), TopicID: topicID, CreatedBy: sessionStorage.userStatus});
		}
	})
})

}());