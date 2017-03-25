/**
 * @file 	Working with ajax, mashup and python
 * @author 	Youness Ghanim <yha@qlik.com>
 * @version 1.0
 * @Date 	2017-03-14
 */

/*
 * You may change the config object to reflect your own setup for Qlik Sense Server
 */
var config = {
	host: "10.76.198.57",
	prefix: "/py/",
	port: "443",
	isSecure: true,
	origin: 'localhost'
};

require.config( {
	baseUrl: (config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources"
} );

require( ["js/qlik"], function ( qlik ) {
	qlik.setOnError( function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );

	//open apps, you may change it to refelect your own setup
	var app = qlik.openApp('59201a52-2319-4f7a-a21b-0ae0307cd70e', config);

	// We are testing with one KPI as a proof of concept only
	app.getObject('QV01','VfuGmtA');
	//create cubes and lists -- inserted here --
	
	// This is the button if pressed, we invoke the call towards the Python file
	$("#myButton").click(function(){
		runTheTest();
    }); 

	// Make an AJAX call towards Python and handle the response
	function runTheTest(){	
		$.ajax({
			type: "POST",			
			/* headers: {"Access-Control-Allow-Origin:" : "https://selun-yha"}, NOTE, Access-Control-Allow-Origin
			   might be needed if your Python file is sitting on an other web site.
			*/
			url: "PythonApp.py", // Pointer to the Python file that is supposed to consume the AJAX call
			data: {'Dim 1':'Value 1','Dim 2':'Value 2'}, // Dummy data passed to Python, this could be pulled from your app instead
			success: function (PythonResponse) {
				displayResponse(PythonResponse);
            },
			error: function (xhr, status) {
                console.log(xhr + " " + status);
            }			
		});
	};
	
	// Display the result once we get it from Python
	function displayResponse(data){
		var items = [];
		$("#myDiv").html("<b>Python response:</b><br><br>");
		$.each(data, function(index, elem) {
			items.push("<li id='" + index + "'>" + '<b>' + index + ' = </b>' + elem + ".</li>" );
		});
			
		items.push("<li><b>Full Python response</b> = " + JSON.stringify(data) + ".</li>");

		$("<ul/>", {
			"class": "myList",
			html: items.join( "|" )
		}).appendTo( "#myDiv" );
	};

});
