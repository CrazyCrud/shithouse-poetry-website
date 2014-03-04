console.log("loginOverlay");
var linkLogin = document.getElementById("link-login");
var loginContent = document.getElementById("logincontent");
var loginOverlayBackButton = document.getElementById("loginOverlayBackButton");
var registerButton = document.getElementById("registerButton");

registerButton.onclick = openRegisterPage;
linkLogin.onclick = showLoginOverlay;
loginOverlayBackButton.onclick = hideLoginOverlay;



function showLoginOverlay(){
	if(!document.getElementById("overlay")) {
			div = document.createElement("div");
			div.setAttribute('id', 'overlay');
			document.getElementsByTagName("body")[0].appendChild(div);
			document.getElementsByTagName("body")[0].appendChild(loginContent);
			loginContent.style.display="block";				
	}
}

function hideLoginOverlay(){
	if(document.getElementById("overlay")) 
		{
		document.getElementsByTagName("body")[0].removeChild(loginContent);
		document.getElementsByTagName("body")[0].removeChild(document.getElementById("overlay"));
	}
}

function openRegisterPage(){
	hideLoginOverlay;
	document.loginForm.action = "register.php";		
	document.loginForm.submit();
}




