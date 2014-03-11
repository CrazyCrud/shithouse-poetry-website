$(document).ready(function() {
	if(term != null){
		ImgurManager.search(computeSearch, term, 0);
	}
});

function computeSearch(searchData){
	console.log(searchData);
}