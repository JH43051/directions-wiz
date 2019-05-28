var platform = new H.service.Platform({
	'app_id': 'EtNIgjLba6MC6edi57vR',
	'app_code': 'powLhtVer-MQAOPqWwgwsA',
	'useHTTPS': true
});

var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(
	document.getElementById("resultMap"),
	defaultLayers.normal.map,
	{
		zoom: 10,
		center: {
			lat: localStorage.getItem('mapPointLat'),
			lng: localStorage.getItem('mapPointLong')
		}
	}
);

var ui = H.ui.UI.createDefault(map, defaultLayers);

var mapEvents = new H.mapevents.MapEvents(map);

var behavior = new H.mapevents.Behavior(mapEvents);
// Clean up local storage
localStorage.removeItem('mapPointLat');
localStorage.removeItem('mapPointLong');
