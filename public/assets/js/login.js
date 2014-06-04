(function(){

var loginStatus = $('.navbar-right');
var loginButton = '<li><a href="http://discussion-polygon.herokuapp.com/auth/facebook">Login</a></li>';
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