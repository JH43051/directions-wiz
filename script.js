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
    center: {lat: 40.76, lng: -73.98} // NYC
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
// Listener function calls
browserGreeting();
tabListener();
mainButtonListener();
linksPopupListener()
popupCloseListener();
startEndSwitchListener();


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
	var searchingTitle = document.getElementById("searchingTitle");
	searchingTitle.innerHTML = "Finding Directions...";
	directionsPopupLink.setAttribute("onclick", "window.open('https://www.google.com')"); // CHANGE ME

	popUpBackground.getAttributeNode("class").value = "show";
	searchingPopup.getAttributeNode("class").value = "show";

	/*if (locationStart.value == "") {
			locationStart.value = "xyx" // Giberish to prevent locked searching popup on empty field
	}

	if (locationFinish.value == "") {
			locationFinish.value = "xyx"
	}*/
	
	findDirections();

	setInterval(function() {
		if (localStorage.getItem('startPoint') != null && localStorage.getItem('startPoint') != null) {
			searchingPopup.getAttributeNode("class").value = "hide";
			directionsPopup.getAttributeNode("class").value = "show";
		} else {
			clearInterval();
		}
	}, 1000);
	popupCloseHandler();
}


function mapPopupHandler() {
	var searchingTitle = document.getElementById("searchingTitle");
	searchingTitle.innerHTML = "Finding Map...";
	mapPopupLink.setAttribute("onclick", "window.open('https://www.google.com')"); // CHANGE ME

	popUpBackground.getAttributeNode("class").value = "show";
	searchingPopup.getAttributeNode("class").value = "show";

	findMap();
	
	setInterval(function() {
		if (localStorage.getItem('mapPointLat') != null && localStorage.getItem('mapPointLong') != null) {
			searchingPopup.getAttributeNode("class").value = "hide";
			mapPopup.getAttributeNode("class").value = "show";
		} else {
			clearInterval();
		}
	}, 1000);
	popupCloseHandler();
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
			localStorage.setItem('startPoint', startPoint);
		} else {
			document.getElementById("directionsPopupH3").innerHTML = "Directions Found";
			directionsPopupLink.getAttributeNode("href").value = "./results-directions.html";
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
			localStorage.setItem('endPoint', endPoint);
		} else {
			document.getElementById("directionsPopupH3").innerHTML = "Directions Found";
			directionsPopupLink.getAttributeNode("href").value = "./results-directions.html";
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
			document.getElementById("mapPopupH3").innerHTML = "No Map Found";
			mapPopupLink.getAttributeNode("href").value = "./results-none.html";
			localStorage.setItem('mapPointLat', mapPointLat);
			localStorage.setItem('mapPointLong', mapPointLong);
		} else {
			document.getElementById("mapPopupH3").innerHTML = "Map Found";
			mapPopupLink.getAttributeNode("href").value = "./results-map.html";
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

};
