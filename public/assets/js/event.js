(function(){
	
var tmpl = '<li><span></span></li>',
	commentInput = $(".comment_input"),
	commentInput2 = $(".comment_input2"),
	commentInput3 = $(".submit_comment");


commentInput.on("keyup", function(e){
	if(e.which === 13){
		var input = $(this), ul = input.parents(".aspect_comment").find(".comment_list");
		var expand = input.parents(".aspect_col").find(".aspect_title").find(".comment_list");
		$(tmpl).appendTo(ul).find("span").text(input.val());
		$(tmpl).appendTo(expand).find("span").text(input.val());
	}
})

commentInput2.on("keyup", function(e){
	if(e.which === 13){
		var input = $(this), ul = input.parents(".aspect_col").find(".aspect_comment").find(".comment_list");
		var expand = input.parents(".modal-content").find(".comment_list");
		$(tmpl).appendTo(ul).find("span").text(input.val());
		$(tmpl).appendTo(expand).find("span").text(input.val());
	}
})

commentInput3.on("click", function(e){
	var input = $(this), ul = input.parents(".aspect_col").find(".aspect_comment").find(".comment_list");
	var expand = input.parents(".modal-content").find(".comment_list");
	var inputValue = $(this).siblings(".col-xs-10").find(".comment_input2");
	$(tmpl).appendTo(ul).find("span").text(inputValue.val());
	$(tmpl).appendTo(expand).find("span").text(inputValue.val());
})


}());