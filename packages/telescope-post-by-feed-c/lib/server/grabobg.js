var parseString = Npm.require('xml2js').parseString;
var request = Npm.require('request');
var getFirstAdminUser = function() {
  return Users.adminUsers({sort: {createdAt: 1}, limit: 1})[0];
};
var getItemCategories = function(title) {
    var itemCategories = [];
    var towns = [
	    ["Банско","bansko","bulgaria"],
	    ["Велинград","velingrad","bulgaria"],
	    ["Пампорово","pamporovo","bulgaria"],
	    ["Трявна","triavna","bulgaria"],
	    ["Разлог","razlog","bulgaria"],
	    ["Девин","devin","bulgaria"],
	    ["Елена","elena","bulgaria"],
	    ["Дряново","drianovo","bulgaria"],
	    ["Боровец","borovec","bulgaria"],
	    ["Цигов чарк","tsigov_chark","bulgaria"],
	    ["Говедарци","govedartsi","bulgaria"],
	    ["Арбанаси","arbanasi","bulgaria"]
    ];
    if (title) {
    	for(var i=0; i<towns.length; i++){
    		if(title.indexOf(towns[i][0]) > -1){
    			var parent_category = Categories.findOne({slug: towns[i][2]});
    			if(parent_category){
    				itemCategories.push(parent_category._id);
					var category = Categories.findOne({slug: towns[i][1]});
				    if (category) {
				      itemCategories.push(category._id);
				    }else{
				    	Categories.insert({
				    		name: towns[i][0], 
				    		slug: towns[i][1], 
				    		parentId: parent_category._id
				    	});
				    	var c = Categories.findOne({slug: towns[i][1]});
				    	if(c){
					    	itemCategories.push(c._id);
					    }
				    }
				}
    		}
    	}
	}
	return itemCategories;
}
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
			          expire: offers[i].expire[0],
			          categories: getItemCategories(offers[i].title[0])
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
