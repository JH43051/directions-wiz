// Wrapper function
window.onload = function() {

/////////////////////////////////////////////////////////////////////
// Global variables
/////////////////////////////////////////////////////////////////////

var tabMap = document.getElementById("tabMap");
var tabDirections = document.getElementById("tabDirections");
var dirMainButton = document.getElementById("dirMainButton");
var mapMainButton = document.getElementById("mapMainButton");
var formMap = document.getElementById("formMap");
var popUpBackground = document.getElementById("popUpBackground");
var searchingPopup = document.getElementById("searchingPopup");
var directionsPopup = document.getElementById("directionsPopup");
var mapPopup = document.getElementById("mapPopup");
var trafficPopup = document.getElementById("trafficPopup");
var planningPopup = document.getElementById("planningPopup");
var providersPopup = document.getElementById("providersPopup");
var benefitsPopup = document.getElementById("benefitsPopup");
var aboutPopup = document.getElementById("aboutPopup");
var contactPopup = document.getElementById("contactPopup");
var privacyPopup = document.getElementById("privacyPopup");
var termsPopup = document.getElementById("termsPopup");
var advertisingPopup = document.getElementById("advertisingPopup");
var disclaimerPopup = document.getElementById("disclaimerPopup");
var requestPopup = document.getElementById("requestPopup");

////////////////////////////////////////////////////////////////////
// Procedural Function Calls
////////////////////////////////////////////////////////////////////

browserGreeting();
tabListener();
mainButtonListener();
linksPopupListener()
popupCloseListener();

////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////

// Tests for user's browser and displays custom greeting
function browserGreeting() {
	var browserText = document.getElementById("browserGreet");
	var greetText = "Get Free Maps and Driving Directions for";

	if (/firefox/i.test(navigator.userAgent) === true) {
		browserText.innerHTML = greetText + " FireFox!";
	} else if (/trident/i.test(navigator.userAgent) === true ||
							/msie/i.test(navigator.userAgent) === true) {
		browserText.innerHTML = greetText + " Internet Explorer!";
	} else if (/edge/i.test(navigator.userAgent) === true) {
		browserText.innerHTML = greetText + " Edge!";
	} else if (/chrome/i.test(navigator.userAgent) === true) {
		browserText.innerHTML = greetText + " Chrome!";
	} else {
		browserText.innerHTML = "Get Free Maps and Driving Directions!";
	}
}

function tabListener() {
	tabMap.onclick = tabMapSwitcher;
	tabDirections.onclick = tabDirectionsSwitcher;
}

function tabMapSwitcher() {
	var tabMapClass = tabMap.getAttributeNode("class").value;

	if (tabMapClass === "inactive") {
		tabMap.getAttributeNode("class").value = "active";
		tabDirections.getAttributeNode("class").value = "inactive";
		formMap.style.zIndex = 115;
	}
}

function tabDirectionsSwitcher() {
	var tabDirClass = tabDirections.getAttributeNode("class").value;

	if (tabDirClass === "inactive") {
		tabDirections.getAttributeNode("class").value = "active";
		tabMap.getAttributeNode("class").value = "inactive";
		formMap.style.zIndex = 105;
	}
}

function mainButtonListener() {
	dirMainButton.onclick = directionsPopupHandler;
	mapMainButton.onclick = mapPopupHandler;
}

function directionsPopupHandler() {
	popUpBackground.getAttributeNode("class").value = "show";
	searchingPopup.getAttributeNode("class").value = "show";
	setTimeout(function() {
		searchingPopup.getAttributeNode("class").value = "hide";
		directionsPopup.getAttributeNode("class").value = "show";
	}, 2000);
	findDirections();
}

function mapPopupHandler() {
	popUpBackground.getAttributeNode("class").value = "show";
	searchingPopup.getAttributeNode("class").value = "show";
	setTimeout(function() {
		searchingPopup.getAttributeNode("class").value = "hide";
		mapPopup.getAttributeNode("class").value = "show";
	}, 2000);
	findMap();
}

function linksPopupListener() {
	var trafficLink = document.getElementById("trafficLink");
	var planningLink = document.getElementById("planningLink");
	var providersLink = document.getElementById("providersLink");
	var benefitsLink = document.getElementById("benefitsLink");
	var aboutLink = document.getElementById("aboutLink");
	var contactLink = document.getElementById("contactLink");
	var privacyLink = document.getElementById("privacyLink");
	var termsLink = document.getElementById("termsLink");
	var advertisingLink = document.getElementById("advertisingLink");
	var disclaimerLink = document.getElementById("disclaimerLink");
	var requestLink = document.getElementById("requestLink");

	trafficLink.onclick = trafficPopupHandler;
	planningLink.onclick = planningPopupHandler;
	providersLink.onclick = providersPopupHandler;
	benefitsLink.onclick = benefitsPopupHandler;
	aboutLink.onclick = aboutPopupHandler;
	contactLink.onclick = contactPopupHandler;
	privacyLink.onclick = privacyPopupHandler;
	termsLink.onclick = termsPopupHandler;
	advertisingLink.onclick = advertisingPopupHandler;
	disclaimerLink.onclick = disclaimerPopupHandler;
	requestLink.onclick = requestPopupHandler;
}


function trafficPopupHandler() {
	popUpBackground.getAttributeNode("class").value = "show";
	trafficPopup.getAttributeNode("class").value = "linksPopups show";
}


function planningPopupHandler() {
	popUpBackground.getAttributeNode("class").value = "show";
	planningPopup.getAttributeNode("class").value = "linksPopups show";
}

function providersPopupHandler() {
	popUpBackground.getAttributeNode("class").value = "show";
	providersPopup.getAttributeNode("class").value = "linksPopups show";
}

function benefitsPopupHandler() {
	popUpBackground.getAttributeNode("class").value = "show";
	benefitsPopup.getAttributeNode("class").value = "linksPopups show";
}

function aboutPopupHandler() {
	popUpBackground.getAttributeNode("class").value = "show";
	aboutPopup.getAttributeNode("class").value = "linksPopups show";
}

function contactPopupHandler() {
	popUpBackground.getAttributeNode("class").value = "show";
	contactPopup.getAttributeNode("class").value = "linksPopups show";
}

function privacyPopupHandler() {
	popUpBackground.getAttributeNode("class").value = "show";
	privacyPopup.getAttributeNode("class").value = "linksPopups show";
}

function termsPopupHandler() {
	popUpBackground.getAttributeNode("class").value = "show";
	termsPopup.getAttributeNode("class").value = "linksPopups show";
}

function advertisingPopupHandler() {
	popUpBackground.getAttributeNode("class").value = "show";
	advertisingPopup.getAttributeNode("class").value = "linksPopups show";
}

function disclaimerPopupHandler() {
	popUpBackground.getAttributeNode("class").value = "show";
	disclaimerPopup.getAttributeNode("class").value = "linksPopups show";
}

function requestPopupHandler() {
	popUpBackground.getAttributeNode("class").value = "show";
	requestPopup.getAttributeNode("class").value = "linksPopups show";
}












function popupCloseListener() {
	var popupCloseIcon = document.getElementsByClassName("popupCloseIcon");

	for (var i = 0; i < popupCloseIcon.length; i++) {
		popupCloseIcon[i].onclick = popupCloseHandler;
	}
}
// Closes all popups when clicking close. Add each new popup to this
function popupCloseHandler() {
	popUpBackground.getAttributeNode("class").value = "hide";
	directionsPopup.getAttributeNode("class").value = "hide";
	mapPopup.getAttributeNode("class").value = "hide";
	trafficPopup.getAttributeNode("class").value = "linksPopups hide";
	planningPopup.getAttributeNode("class").value = "linksPopups hide";
	providersPopup.getAttributeNode("class").value = "linksPopups hide";
	benefitsPopup.getAttributeNode("class").value = "linksPopups hide";
	aboutPopup.getAttributeNode("class").value = "linksPopups hide";
	contactPopup.getAttributeNode("class").value = "linksPopups hide";
	privacyPopup.getAttributeNode("class").value = "linksPopups hide";
	termsPopup.getAttributeNode("class").value = "linksPopups hide";
	advertisingPopup.getAttributeNode("class").value = "linksPopups hide";
	disclaimerPopup.getAttributeNode("class").value = "linksPopups hide";
	requestPopup.getAttributeNode("class").value = "linksPopups hide";
}

////////////////////////////////////////////////////////////////////////
// Mapping Functionality
////////////////////////////////////////////////////////////////////////

// Authenticates communication with Here.com backend services
var platform = new H.service.Platform({
  'app_id': 'EtNIgjLba6MC6edi57vR',
  'app_code': 'powLhtVer-MQAOPqWwgwsA',
	'useHTTPS': true
});

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
var map = new H.Map(
  document.getElementById("map"),
  defaultLayers.normal.map,
  {
    zoom: 10,
    center: { lat: 52.5, lng: 13.4 } // Berlin (change me)
  }
);

// Create the default UI:
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

// Instantiate the default behavior, providing the mapEvents object:
var behavior = new H.mapevents.Behavior(mapEvents);


function findMap() {
	// Grab text from input field
	var input = document.getElementById("locationFind").value;
	// Create the parameters for the geocoding request:
	var geocodingParams = {
			searchText: input
		};
	// Define a callback function to process the geocoding response:
	var onResult = function(result) {
		var locations = result.Response.View[0].Result,
			position,
			marker;
		// Add a marker for each location found
		for (i = 0;  i < locations.length; i++) {
		position = {
			lat: locations[i].Location.DisplayPosition.Latitude,
			lng: locations[i].Location.DisplayPosition.Longitude
		};
		marker = new H.map.Marker(position);
		map.addObject(marker);
		}
		map.setCenter(position, true);
	};
	// Get an instance of the geocoding service:
	var geocoder = platform.getGeocodingService();
	// Call the geocode method with the geocoding parameters,
	// the callback and an error callback function (called if a
	// communication error occurs):
	geocoder.geocode(geocodingParams, onResult, function(e) {
		alert(e);
	});
}


function findDirections() {
	var startPoint = "";
	var locationStart = document.getElementById("locationStart").value;
	var endPoint = "";
	var locationFinish = document.getElementById("locationFinish").value;
	// Grab text from input field
	var geocodingParams = {
			searchText: locationStart
	};
	// Define a callback function to process the geocoding response:
	var onResult = function(result) {
		var locations = result.Response.View[0].Result;
		startPoint = "geo!" + locations[0].Location.DisplayPosition.Latitude + "," + locations[0].Location.DisplayPosition.Longitude;
		localStorage.setItem('startPoint', startPoint);
	};

	var onError = function(e) {
		alert(e);
	}
	// Get an instance of the geocoding service:
	var geocoder = platform.getGeocodingService();
	// Call the geocode method with the geocoding parameters,
	// the callback and an error callback function (called if a
	// communication error occurs):
	geocoder.geocode(geocodingParams, onResult, onError);
	startPoint = localStorage.getItem('startPoint');
	localStorage.removeItem('startPoint');

	geocodingParams = {
			searchText: locationFinish
	};

	onResult = function(result) {
		var locations = result.Response.View[0].Result;
		endPoint = "geo!" + locations[0].Location.DisplayPosition.Latitude + "," + locations[0].Location.DisplayPosition.Longitude;
		localStorage.setItem('endPoint', endPoint);
	};

	// Get an instance of the geocoding service:
	geocoder = platform.getGeocodingService();
	// Call the geocode method with the geocoding parameters,
	// the callback and an error callback function (called if a
	// communication error occurs):
	geocoder.geocode(geocodingParams, onResult, onError);
	endPoint = localStorage.getItem('endPoint');
	localStorage.removeItem('endPoint');

	console.log(startPoint);
	console.log(endPoint);

	// Create the parameters for the routing request:
	var routingParameters = {
		// The routing mode:
		'mode': 'fastest;car',
		// The start point of the route:
		'waypoint0': startPoint,
		// The end point of the route:
		'waypoint1': endPoint,
		// To retrieve the shape of the route we choose the route
		// representation mode 'display'
		'representation': 'display'
	};
	// Define a callback function to process the routing response:
	var onResult = function(result) {
		var route,
			routeShape,
			startPoint,
			endPoint,
			linestring;
		if(result.response.route) {
		// Pick the first route from the response:
		route = result.response.route[0];
		// Pick the route's shape:
		routeShape = route.shape;
		// Create a linestring to use as a point source for the route line
		linestring = new H.geo.LineString();
		// Push all the points in the shape into the linestring:
		routeShape.forEach(function(point) {
			var parts = point.split(',');
			linestring.pushLatLngAlt(parts[0], parts[1]);
		});
		// Retrieve the mapped positions of the requested waypoints:
		startPoint = route.waypoint[0].mappedPosition;
		endPoint = route.waypoint[1].mappedPosition;
		// Create a polyline to display the route:
		var routeLine = new H.map.Polyline(linestring, {
			style: { strokeColor: '#4c97f3', lineWidth: 10 },
			arrows: { fillColor: '#ffffff', frequency: 2, width: 0.8, length: 0.7 }
		});
		// Create a marker for the start point:
		var startMarker = new H.map.Marker({
			lat: startPoint.latitude,
			lng: startPoint.longitude
		});
		// Create a marker for the end point:
		var endMarker = new H.map.Marker({
			lat: endPoint.latitude,
			lng: endPoint.longitude
		});
		// Add the route polyline and the two markers to the map:
		map.addObjects([routeLine, startMarker, endMarker]);
		// Set the map's viewport to make the whole route visible:
		map.setViewBounds(routeLine.getBounds());
		}
	};
	// Get an instance of the routing service:
	var router = platform.getRoutingService();
	// Call calculateRoute() with the routing parameters,
	// the callback and an error callback function (called if a
	// communication error occurs):
	router.calculateRoute(routingParameters, onResult,
		function(error) {
			alert(error.message);
		});
}






}; // window.onload