console.log("loginOverlay");
var linkLogin = document.getElementById("link-login");
var loginContent = document.getElementById("logincontent");
var loginOverlayBackButton = document.getElementById("loginOverlayBackButton");
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




