var linkSearch = document.getElementById("link-search");
var searchContent = document.getElementById("searchcontent");
document.getElementById("link-search").onclick = showSearchOverlay;
document.getElementById("searchOverlayBackButton").onclick = hideSearchOverlay;

function showSearchOverlay(){
	if(!document.getElementById("overlay")) {
			div = document.createElement("div");
			div.setAttribute('id', 'overlay');
			document.getElementsByTagName("body")[0].appendChild(div);
			document.getElementsByTagName("body")[0].appendChild(searchContent);
			searchContent.style.display="block";				
	}
}

function hideSearchOverlay(){
	if(document.getElementById("overlay")) 
	{
		document.getElementsByTagName("body")[0].removeChild(searchContent);
		document.getElementsByTagName("body")[0].removeChild(document.getElementById("overlay"));
	}
}




