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
    var map = L.map('map',{ zoomControl: false });
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
  });
};