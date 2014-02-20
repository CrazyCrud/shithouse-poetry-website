ar linkSearch = document.getElementById("link-search");
var searchContent = document.getElementById("searchcontent");
var linkLogin = document.getElementById("link-login");
var loginContent = document.getElementById("logincontent");
var backButton = document.getElementById("overlayBackButton");
 	
linkSearch.onclick = showSearchOverlay;
linkLogin.onclick = showLoginOverlay;
backButton.onclick = hideOverlay;



function showSearchOverlay(){
	if(!document.getElementById("overlay")) {
			div = document.createElement("div");
			div.setAttribute('id', 'overlay');
			document.getElementsByTagName("body")[0].appendChild(div);
			document.getElementsByTagName("body")[0].appendChild(searchContent);
			searchContent.style.display="block";	
	}
}
/*function hideSearchOverlay(){
	if(document.getElementById("overlay")) 
	{
		document.getElementsByTagName("body")[0].removeChild(searchContent);
		document.getElementsByTagName("body")[0].removeChild(document.getElementById("overlay"));
	}
}*/

//////////////////////////////////////////////////////////////////
console.log("loginOverlay");


function showLoginOverlay(){
	if(!document.getElementById("overlay")) {
			div = document.createElement("div");
			div.setAttribute('id', 'overlay');
			document.getElementsByTagName("body")[0].appendChild(div);
			document.getElementsByTagName("body")[0].appendChild(loginContent);
			loginContent.style.display="block";			
	}
}

function hideOverlay(){
	console.log("hideOverlay");
	if(document.getElementById("overlay")) 
		{ 
			
			if(document.getElementById("logincontent")){
				document.getElementsByTagName("body")[0].removeChild(loginContent);
			}	
			if(document.getElementById("searchcontent")){
				document.getElementsByTagName("body")[0].removeChild(searchContent);
			}	
		document.getElementsByTagName("body")[0].removeChild(document.getElementById("overlay"));
	}
}




