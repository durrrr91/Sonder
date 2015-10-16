var parseString = Npm.require('xml2js').parseString;
var request = Npm.require('request');
var getFirstAdminUser = function() {
  return Users.adminUsers({sort: {createdAt: 1}, limit: 1})[0];
};
fetchRiobg = function() {
	request('http://rio.bg/Static/xml/2/sonder.bg/bg.sonder.bg.0.ole.bg.xml', Meteor.bindEnvironment(function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var xml = body; 
    	parseString(xml, function (err, result) {
    		var now = new Date();
	    	var offers = result.offers.offer;
	    	for(var i=0; i < offers.length;i++){
	    		var tempPost = Posts.findOne({title: offers[i].title[0]});
  				if (tempPost) {
  					//console.log("Offer already in our database");
  				}else{
			        var post = {
			          title: offers[i].title[0],
			          url: offers[i].link[0],
			          userId: getFirstAdminUser()._id,
			          rioId: offers[i].id[0],
			          slug: Telescope.utils.slugify(offers[i].title[0]),
			          postedAt: now,
			          thumbnailUrl: offers[i].pictures[0].pic[0],
			          price: offers[i].promo_price[0],
			          expire: offers[i].end[0]
			        };
	                try {
			          Posts.submit(post);
			          console.log("Post added: "+post.title);
			        } catch (error) {
			          Telescope.log(error); // catch errors so they don't stop the loop
			        }
			    }
	    	}
		});
	  }
	}))
};

Meteor.methods({
  fetchRiobg: function () {
    fetchRiobg();
  }
});
