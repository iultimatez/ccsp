(function(){
	
var tmpl = '<li><span></span></li>',
	commentInput = $(".comment_input");


commentInput.on("keyup", function(e){
	if(e.which === 13){
		var input = $(this),
			ul = input.parents(".aspect_comment").find(".comment_list"),
			scrollTo;

		$(tmpl).appendTo(ul).find("span").text(input.val());
		input.val("");
		scrollTo = ul.find("li:last");
		ul.scrollTop(scrollTo.offset().top - ul.offset().top + ul.scrollTop());
	}
})


}());