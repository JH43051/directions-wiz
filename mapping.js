window.onload = function() {

// Authenticates communication with Here.com backend services
var platform = new H.service.Platform({
  'app_id': 'EtNIgjLba6MC6edi57vR',
  'app_code': 'powLhtVer-MQAOPqWwgwsA'
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
  });

// Create the default UI:
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

// Map event listener:
map.addEventListener('tap', function(evt) {
  // Log 'tap' and 'mouse' events:
  console.log(evt.type, evt.currentPointer.type); 
});

// Instantiate the default behavior, providing the mapEvents object:
var behavior = new H.mapevents.Behavior(mapEvents);

}