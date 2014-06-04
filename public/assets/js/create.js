(function(){
//Check login
if(sessionStorage.userStatus == ""){
	$("#layout").html('<br><br><br><br><center><font size="6">請先登入</font></center>');
}
	
$(document).ready(function() {

    var aspect = 1;
    function validateForm()
	{
		var x=document.forms["event_form"]["title"].value;
		if (x==null || x=="")
		{
			alert("議題名稱不能為空白");
			return false;
		}
		else{
			x=document.forms["event_form"]["content"].value;
			if (x==null || x=="")
			{
				alert("議題內容不能為空白");
				return false;
			}
		}
	}

	$("#add").on('click', function(){
		aspect++;
		$(this).before('<div class="form-group"><label for="topic_aspect" name="aspect[]">議題面向'+aspect+'</label><input type="text" class="form-control" id="topic_aspect" placeholder="議題面向"></div>');
	})
})

$("#userStatus").attr("value", sessionStorage.userStatus);
}());
