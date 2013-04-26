
function AJAX(endPoint, apiKey, params) {
	this.endPoint = endPoint;
	this.apiKey = apiKey;
	this.params = params;
}

AJAX.prototype.createRequest = function() {
	var result = null;
	if (window.XMLHttpRequest) { // FireFox, Safari, etc.
		result.overrideMimeType("text/xml");
		//if (typeof )
	}
	
	var result = null;
	  if (window.XMLHttpRequest) {
	    // FireFox, Safari, etc.
	    result = new XMLHttpRequest();
	    if (typeof xmlhttp.overrideMimeType != 'undefined') {
	      result.overrideMimeType('text/xml'); // Or anything else
	    }
	  }
	  else if (window.ActiveXObject) {
	    // MSIE
	    result = new ActiveXObject("Microsoft.XMLHTTP");
	  } 
	  else {
	    // No known mechanism -- consider aborting the application
	  }
	  return result;
}


