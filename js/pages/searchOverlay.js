var linkSearch = document.getElementById("link-search");
var searchForms = document.getElementById("searchcontent");
document.getElementById("link-search").onclick = searchOverlay;

function searchOverlay(){
	console.log("function");
	if(document.getElementById("overlay") === null) {
			div = document.createElement("div");
			div.setAttribute('id', 'overlay');
			document.getElementsByTagName("body")[0].appendChild(div);
			document.getElementsByTagName("body")[0].appendChild(searchForms);
			
			console.log(searchForms);
			searchForms.style.display="block";


			


	}


	/**else {
		document.getElementsByTagName("body")[0].removeChild(document.getElementById("overlay"));
	}**/
}


