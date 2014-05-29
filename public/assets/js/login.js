(function(){

var loginStatus = $('.navbar-right');
var loginButton = '<li><a href="http://127.0.0.1.xip.io:5000/auth/facebook">Login</a></li>';
var logoutButton = '<li><a href="/logout">Logout</a></li>';
$.get('/isAuthenticated', function(data){
	console.log("isAuthenticated: " + data);
		if (data === "") {
			$(loginButton).appendTo(loginStatus);
			sessionStorage.userStatus = "";
		}else{
			$(logoutButton).appendTo(loginStatus);
			var user = JSON.parse(data);
			sessionStorage.userStatus = user._id;
		}
	})


}());