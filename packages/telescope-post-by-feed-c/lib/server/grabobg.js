var parseString = Npm.require('xml2js').parseString;
var request = Npm.require('request');
var getFirstAdminUser = function() {
  return Users.adminUsers({sort: {createdAt: 1}, limit: 1})[0];
};
fetchGrabobg = function() {
	request('http://nikolaystoev.co.uk/grabo.xml', Meteor.bindEnvironment(function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    var xml = body; 
    	parseString(xml, function (err, result) {
    		var now = new Date();
	    	var offers = result.grabo.deal;
	    	for(var i=0; i < offers.length;i++){
	    		var tempPost = Posts.findOne({title: offers[i].title[0]});
  				if (offers[i].categories[0].category[0] !== "Туризъм и пътувания" || tempPost) {
  					//console.log("Offer already in our database");
  				}else{
			        var post = {
			          title: offers[i].title[0],
			          url: offers[i].url[0],
			          userId: getFirstAdminUser()._id,
			          slug: Telescope.utils.slugify(offers[i].title[0]),
			          postedAt: now,
			          thumbnailUrl: offers[i].image[0],
			          price: offers[i].price[0],
			          expire: offers[i].expire[0]
			        };
	                try {
			          Posts.submit(post);
			          console.log("Post added: "+post.title);
			        } catch (error) {
			          console.log(error); // catch errors so they don't stop the loop
			        }
			    }
	    	}
		});
	  }
	}))
};

Meteor.methods({
  fetchGrabobg: function () {
    fetchGrabobg();
  }
});
