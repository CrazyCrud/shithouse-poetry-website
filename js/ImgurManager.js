var ImgurManager = {};

ImgurManager.Tags = {
	ALL: 1,
	FUNNY: 2,
	properties: {
		1: {name: "All"},
		2: {name: "Funny"}
	}
};

ImgurManager.Gender = {
	ALL: 1,
	MEN: 2,
	WOMEN: 3,
	NONE: 4,
	properties: {
		1: {name: "All"},
		2: {name: "Men"},
		3: {name: "Women"},
		4: {name: "Unisex"}
	}
};

ImgurManager.ClientID = "9e45d882d3b4055";

ImgurManager.prototype.loadImages = function(searchProps){
	searchProps = searchProps || {};
	searchProps.tags = searchProps.tags || [this.Tags.properties[this.Tags.ALL].name];
	searchProps.ratingActivated = searchProps.ratingActivated || false;
	searchProps.gender = searchProps.gender || this.Gender.properties[this.Gender.ALL].name;

	var links = null;
	var postData = JSON.stringify(searchProps);

	$.post('/php/requestImages.php', tags: postData, function(data) {
		if(data == null){
			links = null;
		}else{
			links = $.parseJSON(data);
		}
	});

	return links;
};

ImgurManager.prototype.loadImage = function(id){
	var link = null;
	if(id != null id != undefined){
		$.post('/php/requestImages.php', id: id, function(data) {
			if(data == null){
				links = null;
			}else{
				links = $.parseJSON(data);
			}
		});
	}
	return link;
}

ImgurManager.prototype.uploadImages = function(imgData){
	if(imgData == null || imgData == undefined){
		return false;
	}else{
		return true;
	}
}