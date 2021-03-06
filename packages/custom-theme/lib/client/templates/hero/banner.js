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
	L.marker([46.53, 24.84], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=romania'>Румъния</a>");
	L.marker([38.96, 35.24], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=turkey'>Турция</a>");
	L.marker([44.01, 21.00], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=serbia'>Сърбия</a>");
 	L.marker([43.90, 15.56], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=croatia'>Хърватия</a>");
 	L.marker([46.95, 19.47], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=hungary'>Унгария</a>");
 	L.marker([47.24, 14.33], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=austria'>Австрия</a>");
 	L.marker([50.21, 14.46], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=czech_republic'>Чехия</a>");
 	L.marker([50.35, 10.07], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=germany'>Германия</a>");
 	L.marker([42.79, 12.06], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=italy'>Италия</a>");
 	L.marker([46.50, 2.57], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=france'>Франция</a>");
	L.marker([39.38, -3.36], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=spain'>Испания</a>");
	L.marker([46.57, 7.40], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=switzerland'>Швейцария</a>");
	L.marker([25.20, 55.27], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=uae'>Обединени арабски емирства</a>");
	L.marker([31.04, 34.85], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=israel'>Израел</a>");
	L.marker([21.52, -77.78], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=cuba'>Куба</a>");
	L.marker([20.59, 78.96], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=india'>Индия</a>");
	L.marker([-8.40, 115.18], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=bali'>Бали</a>");
	L.marker([4.21, 101.97], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=malaysia'>Малайзия</a>");
	L.marker([15.87, 100.99], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=thailand'>Тайланд</a>");
	L.marker([-14.23, -51.92], {icon: whiteMarker}).addTo(map).bindPopup("<a href='/?cat%5B0%5D=brasil'>Бразилия</a>");

  });
};