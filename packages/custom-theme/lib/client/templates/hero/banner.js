Template.banner.helpers({
  showBanner: function () {
  	FlowRouter.watchPathChange()
  	if(FlowRouter.current().path == "/" || FlowRouter.current().path == "/?view=top" || FlowRouter.current().path == "/?view=new"){
  		return true;
  	}else{
  		return false;
  	}
  }
});

Template.banner.add_my_special_behavior = function () {
  Meteor.defer(function () {
    var map = L.map('map',{ zoomControl: false});
	var NASAGIBS_ViirsEarthAtNight2012 = L.tileLayer('http://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
		attribution: '',
		bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
		minZoom: 1,
		maxZoom: 8,
		format: 'jpg',
		time: '',
		tilematrixset: 'GoogleMapsCompatible_Level'
	});	
	map.addLayer(NASAGIBS_ViirsEarthAtNight2012);
	var pos = new L.LatLng(42.15,24.75);
    map.setView(pos, 3);
    new L.Control.Zoom({ position: 'topright' }).addTo(map);
    map.scrollWheelZoom.disable();

    //Markers

    var whiteMarker = L.icon({
	    iconUrl: '/packages/custom-theme/public/img/marker_w.png',
	    iconSize:     [32, 32], // size of the icon
	    iconAnchor:   [16, 32], // point of the icon which will correspond to marker's location
	    popupAnchor:  [0, -32] // point from which the popup should open relative to the iconAnchor
	});

	L.marker([51.5, -0.09], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=england'>Aнглия</a>");
	L.marker([42.73, 25.48], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=bulgaria'>България</a>");
	L.marker([39.07, 21.82], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=greece'>Гърция</a>");
  });
};