var Helper = (function(){
	var regex = /\s/;
	var defaultFontSize = 14;
	var defaultLetterWidth = 7;

	return {
		// use: index = indexOf.call(myArray, needle);
		indexOf: function(value){
			if(typeof Array.prototype.indexOf === 'function') {
		        indexOf = Array.prototype.indexOf;
		    } else {
		        indexOf = function(needle) {
		            var i = -1, index = -1;

		            for(i = 0; i < this.length; i++) {
		                if(this[i] === value) {
		                    index = i;
		                    break;
		                }
		            }
		            return index;
		        };
		    }
		    return indexOf.call(this, value);
		},
		hasIndex: function(obj, index){
			return index in obj;
		}
	};
}());