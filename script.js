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
var locationStart = document.getElementById("locationStart");
var locationFinish = document.getElementById("locationFinish");
var directionsPopupLink = document.getElementById("directionsPopupLink");
var mapPopupLink = document.getElementById("mapPopupLink");
var userLat = 40.76;
var userLong = -73.98;
// Authenticate communication with Here.com backend services
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
		center: {lat: userLat, lng: userLong} // NYC or user
	}
);
// Create the default UI:
var ui = H.ui.UI.createDefault(map, defaultLayers);
// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);
// Instantiate the default behavior, providing the mapEvents object:
var behavior = new H.mapevents.Behavior(mapEvents);



////////////////////////////////////////////////////////////////////
// Procedural Code
////////////////////////////////////////////////////////////////////

// Clear input fields
document.getElementById("locationFind").value = "";
document.getElementById("locationStart").value = "";
document.getElementById("locationFinish").value = "";
// Clean up local storage
localStorage.removeItem('startPoint');
localStorage.removeItem('endPoint');
localStorage.removeItem('mapPointLat');
localStorage.removeItem('mapPointLong');
// Get the user's browser and display custom greeting
browserGreeting();
// Start listeners
tabListener();
mainButtonListener();
linksPopupListener()
popupCloseListener();
startEndSwitchListener();
// If user geolocation can be obtained, update map with user coords
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(function(position) {
		userLat = position.coords.latitude;
		userLong = position.coords.longitude;
		var geoInterval = setInterval(function() {
			if (position.coords != null) {
				map.setCenter({lat: userLat, lng: userLong});
				clearInterval(geoInterval);
			}
		}, 500);
	});
}



////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////

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
	var searchingTitle = document.getElementById("searchingTitle");
	searchingTitle.innerHTML = "Finding Directions...";
	directionsPopupLink.setAttribute("onclick", "window.open('https://www.google.com')"); // CHANGE ME

	popUpBackground.getAttributeNode("class").value = "show";
	searchingPopup.getAttributeNode("class").value = "show";
	
	findDirections();
	// Checks every second until map data is pulled
	var interval = setInterval(function() {
		if (localStorage.getItem('startPoint') != null && localStorage.getItem('endPoint') != null) {
			searchingPopup.getAttributeNode("class").value = "hide";
			directionsPopup.getAttributeNode("class").value = "show";
			clearInterval(interval);
			if (document.getElementById("directionsPopupH3").innerHTML == "No Directions Found") {
				document.getElementById("miniDirections").getAttributeNode("class").value = "hide";
			} else {
				document.getElementById("miniDirections").getAttributeNode("class").value = "show";
				createMiniDirections();
			}
		}
	}, 1000);
}


function mapPopupHandler() {
	var searchingTitle = document.getElementById("searchingTitle");
	searchingTitle.innerHTML = "Finding Maps...";
	mapPopupLink.setAttribute("onclick", "window.open('https://www.google.com')"); // CHANGE ME

	popUpBackground.getAttributeNode("class").value = "show";
	searchingPopup.getAttributeNode("class").value = "show";

	findMap();
	
	var interval = setInterval(function() {
		if (localStorage.getItem('mapPointLat') != null && localStorage.getItem('mapPointLong') != null) {
			searchingPopup.getAttributeNode("class").value = "hide";
			mapPopup.getAttributeNode("class").value = "show";
			clearInterval(interval);
			if (document.getElementById("mapPopupH3").innerHTML == "No Maps Found") {
				document.getElementById("miniMap").getAttributeNode("class").value = "hide";
			} else {
				document.getElementById("miniMap").getAttributeNode("class").value = "show";
				createMiniMap();
			}
		}
	}, 1000);
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
	document.getElementById("miniMap").getAttributeNode("class").value = "hide";
	document.getElementById("miniDirections").getAttributeNode("class").value = "hide";
}


function startEndSwitchListener() {
	var rotateDirections = document.getElementById("rotateDirections");
	rotateDirections.onclick = startEndSwitchHandler;
}


function startEndSwitchHandler() {
	var startIcon = document.getElementById("startIcon");
	var finishIcon = document.getElementById("finishIcon");

	if (locationStart == document.getElementById("locationStart")) {
		locationStart = document.getElementById("locationFinish");
		locationFinish = document.getElementById("locationStart");
		startIcon.style.color = "#ee3432";
		finishIcon.style.color = "#95c93d";
	} else if (locationStart == document.getElementById("locationFinish")) {
		locationStart = document.getElementById("locationStart");
		locationFinish = document.getElementById("locationFinish");
		startIcon.style.color = "#95c93d";
		finishIcon.style.color = "#ee3432";
	}
}


function findDirections() {
	var startPoint = "";
	var endPoint = "";
	var geocoder = platform.getGeocodingService();
	var input = locationStart.value;
	var geocodingParams = {
		searchText: input
	};
	if (input == "") {
		geocodingParams.searchText = "xyz"; // Gibberish to prevent stuck search on empty field
	}
	// Set callback function to grab and format lat and long of start location
	// and store them in local storage
	var onResult = function(result) {
		if (result.Response.View[0] == undefined) {
			document.getElementById("directionsPopupH3").innerHTML = "No Directions Found";
			directionsPopupLink.getAttributeNode("href").value = "./results-none.html";
			directionsPopup.style.height = "380px";
			document.getElementById("miniDirections").style.height = "0px";
			localStorage.setItem('startPoint', startPoint);
		} else {
			document.getElementById("directionsPopupH3").innerHTML = "Directions Found";
			directionsPopupLink.getAttributeNode("href").value = "./results-directions.html";
			directionsPopup.style.height = "600px";
			document.getElementById("miniDirections").style.height = "200px";
			var locations = result.Response.View[0].Result;
			startPoint = "geo!" + locations[0].Location.DisplayPosition.Latitude + "," + locations[0].Location.DisplayPosition.Longitude;
			localStorage.setItem('startPoint', startPoint);
		}
	};
	// Geocode error handler
	var onError = function(e) {
		alert(e);
	}
	// Call geocode
	geocoder.geocode(geocodingParams, onResult, onError);
	// Change geocode parameters to the ending location input field
	input = locationFinish.value
	geocodingParams = {
		searchText: input
	};
	if (input == "") {
		geocodingParams.searchText = "xyz";
	}
	// Change callback function to grab end location
	onResult = function(result) {
		if (result.Response.View[0] == undefined) {
			document.getElementById("directionsPopupH3").innerHTML = "No Directions Found";
			directionsPopupLink.getAttributeNode("href").value = "./results-none.html";
			directionsPopup.style.height = "380px";
			document.getElementById("miniDirections").style.height = "0px";
			localStorage.setItem('endPoint', endPoint);
		} else {
			document.getElementById("directionsPopupH3").innerHTML = "Directions Found";
			directionsPopupLink.getAttributeNode("href").value = "./results-directions.html";
			directionsPopup.style.height = "600px";
			document.getElementById("miniDirections").style.height = "200px";
			var locations = result.Response.View[0].Result;
			endPoint = "geo!" + locations[0].Location.DisplayPosition.Latitude + "," + locations[0].Location.DisplayPosition.Longitude;
			localStorage.setItem('endPoint', endPoint);
		}
	};
	// Call geocode again
	geocoder.geocode(geocodingParams, onResult, onError);
}


function findMap() {
	var input = document.getElementById("locationFind").value;
	// Create the parameters for the geocoding request:
	var geocodingParams = {
			searchText: input
		};
	if (input == "") {
		geocodingParams.searchText = "xyz";
	}
	// Define a callback function to process the geocoding response:
	var onResult = function(result) {
		if (result.Response.View[0] == undefined) {
			document.getElementById("mapPopupH3").innerHTML = "No Maps Found";
			mapPopupLink.getAttributeNode("href").value = "./results-none.html";
			mapPopup.style.height = "380px";
			document.getElementById("miniMap").style.height = "0px";
			localStorage.setItem('mapPointLat', mapPointLat);
			localStorage.setItem('mapPointLong', mapPointLong);
		} else {
			document.getElementById("mapPopupH3").innerHTML = "Maps Found";
			mapPopupLink.getAttributeNode("href").value = "./results-map.html";
			mapPopup.style.height = "600px";
			document.getElementById("miniMap").style.height = "200px";
			var locations = result.Response.View[0].Result;
			var mapPointLat = locations[0].Location.DisplayPosition.Latitude;
			var mapPointLong =	locations[0].Location.DisplayPosition.Longitude;
			localStorage.setItem('mapPointLat', mapPointLat);
			localStorage.setItem('mapPointLong', mapPointLong);
		}
	}
	// Get an instance of the geocoding service:
	var geocoder = platform.getGeocodingService();
	// Call the geocode method with the geocoding parameters,
	// the callback and an error callback function (called if a
	// communication error occurs):
	geocoder.geocode(geocodingParams, onResult, function(e) {
		alert(e);
	});
}


function miniDirectionsResetter() {
	document.getElementById("miniDirections").innerHTML = "";
}


function miniMapResetter() {
	document.getElementById("miniMap").innerHTML = "";
}


function createMiniDirections() {
	miniDirectionsResetter();

	var startPoint = localStorage.getItem('startPoint');
	var endPoint = localStorage.getItem('endPoint');
	var routeInstructionsContainer = document.getElementById('miniDirections');

	function calculateRouteFromAtoB(platform) {
		var router = platform.getRoutingService(),
			routeRequestParams = {
				mode: 'fastest;car',
				representation: 'display',
				routeattributes : 'waypoints,summary,shape,legs',
				maneuverattributes: 'direction,action',
				waypoint0: startPoint,
				waypoint1: endPoint
			};


		router.calculateRoute(
			routeRequestParams,
			onSuccess,
			onError
		);
	}

	function onSuccess(result) {
		var route = result.response.route[0];

		addWaypointsToPanel(route.waypoint);
		addManueversToPanel(route);
		addSummaryToPanel(route.summary);
	}

	function onError(error) {
		alert('Ooops!');
	}

	function addWaypointsToPanel(waypoints) {
		var nodeH4 = document.createElement('h4'),
			waypointLabels = [],
			i;

		for (i = 0;  i < waypoints.length; i += 1) {
			waypointLabels.push(waypoints[i].label)
		}

		nodeH4.textContent = waypointLabels.join(' - ');

		routeInstructionsContainer.innerHTML = '';
		routeInstructionsContainer.appendChild(nodeH4);
	}

	function addSummaryToPanel(summary) {
		var summaryDiv = document.createElement('div'),
		content = '';
		content += '<b>Total distance</b>: ' + summary.distance  + 'm. <br/>';
		content += '<b>Travel Time</b>: ' + summary.travelTime.toMMSS() + ' (in current traffic)';

		summaryDiv.style.fontSize = 'small';
		summaryDiv.style.marginLeft ='5%';
		summaryDiv.style.marginRight ='5%';
		summaryDiv.innerHTML = content;
		routeInstructionsContainer.appendChild(summaryDiv);
	}

	function addManueversToPanel(route) {
		var nodeOL = document.createElement('ol'),
			i,
			j;

		nodeOL.style.fontSize = 'small';
		nodeOL.style.marginLeft ='5%';
		nodeOL.style.marginRight ='5%';
		nodeOL.className = 'directions';
			// Add a marker for each maneuver
		for (i = 0;  i < route.leg.length; i += 1) {
			for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
				// Get the next maneuver.
				maneuver = route.leg[i].maneuver[j];

				var li = document.createElement('li'),
					spanArrow = document.createElement('span'),
					spanInstruction = document.createElement('span');

				spanArrow.className = 'arrow '  + maneuver.action;
				spanInstruction.innerHTML = maneuver.instruction;
				li.appendChild(spanArrow);
				li.appendChild(spanInstruction);

				nodeOL.appendChild(li);
			}
		}
		routeInstructionsContainer.appendChild(nodeOL);
	}

	Number.prototype.toMMSS = function() {
		return  Math.floor(this / 60)  +' minutes '+ (this % 60)  + ' seconds.';
	}

	calculateRouteFromAtoB(platform);
}


function createMiniMap() {
	miniMapResetter();
	
	var miniMap = new H.Map(
		document.getElementById("miniMap"),
		defaultLayers.normal.map,
		{
			zoom: 10,
			center: {
				lat: localStorage.getItem('mapPointLat'),
				lng: localStorage.getItem('mapPointLong')
			}
		}
	);

	var ui = H.ui.UI.createDefault(miniMap, defaultLayers);
	// Add marker
	var	marker = new H.map.Marker({
			lat: localStorage.getItem('mapPointLat'),
			lng: localStorage.getItem('mapPointLong')
		});
  miniMap.addObject(marker);
}
};
