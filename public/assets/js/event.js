(function(){
	
var tmpl = '<li><span></span></li>',
	commentInput = $(".comment_input");


commentInput.on("keyup", function(e){
	if(e.which === 13){
		var input = $(this), ul = input.parents(".aspect_comment").find(".comment_list");

		$(tmpl).appendTo(ul).find("span").text(input.val());
	}
})


}());