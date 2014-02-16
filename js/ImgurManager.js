var ImgurManager = (function(){
	var tags = {
		ALL: 1,
		FUNNY: 2,
		properties: {
			1: {name: "All"},
			2: {name: "Funny"}
		}
	};

	var gender = {
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

	var clientID = "9e45d882d3b4055";
	return {
		loadImages : function(searchProps){
			searchProps = searchProps || {};
			searchProps.tags = searchProps.tags || [tags.properties[tags.ALL].name];
			searchProps.ratingActivated = searchProps.ratingActivated || false;
			searchProps.gender = searchProps.gender || gender.properties[gender.ALL].name;

			var links = null;
			var postData = JSON.stringify(searchProps);
			$.post('/php/requestImages.php', {tags : postData}, function(data) {
				if(data == null){
					links = null;
				}else{
					links = $.parseJSON(data);
				}
			});
			return links;
		},
		loadImage : function(id){
			var link = null;
			if(id != null || id != undefined){
				$.post('/php/requestImages.php', {id : id}, function(data) {
					if(data == null){
						links = null;
					}else{
						links = $.parseJSON(data);
					}
				});
			}
			return link;
		},
		uploadImages : function(imgData){
			if(imgData == null || imgData == undefined){
				return false;
			}else{
				return true;
			}
		},
		Tags : tags,
		Gender : gender
	}
}());