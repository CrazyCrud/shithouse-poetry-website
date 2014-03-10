var Helper = (function(){
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
		},
		debounce: function (func, threshold, execAsap) {
		    var timeout;
		    return function debounced () {
		        var obj = this, args = arguments;
		        function delayed () {
		            if (!execAsap)
		                func.apply(obj, args);
		            timeout = null; 
		        };
		 
		        if (timeout)
		            clearTimeout(timeout);
		        else if (execAsap)
		            func.apply(obj, args);
		 
		        timeout = setTimeout(delayed, threshold || 100); 
		    };
		}
	};
}());