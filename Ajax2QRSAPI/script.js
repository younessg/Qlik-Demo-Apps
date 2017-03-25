/*
 * Author Youness Ghanim
 * 2017-02-12
 */

$(document).ready(function() { 
	$.ajax({ 
		type:"GET", 
		url:"http://qlikserver1.domain.local/mash/qrs/stream/full?Xrfkey=abcdefghijklmnop", 
		headers:{ 
			"X-Qlik-Xrfkey":"abcdefghijklmnop", 
			"hdr-user":"domain\\administrator"
			} 
	}).done(function(data) { 
	console.log(data);
	$("#greeting-content").html(JSON.stringify(data)); 
	}); 
}); 