Date.isLeapYear = function (year) { 
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
};

Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () { 
    return Date.isLeapYear(this.getFullYear()); 
};

Date.prototype.getDaysInMonth = function () { 
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};

deleteInactiveOffers = function() {
  	Posts.find({}).forEach(function(post){
	  	var dateString = post.expire;
	  	var dateSplit = dateString.split("-");
	  	var year = dateSplit[0];
	  	var month = dateSplit[1]-1;
	  	var dayString = dateSplit[2];
	  	var daySplit = dayString.split(" ");
	  	var day = daySplit[0];
	  	var expireTime = new Date(year,month,day,23,59,59);
	  	var expirePlus = expireTime.addMonths(3);
	  	var currentTime = new Date();
	  	if(expirePlus < currentTime){
	  		console.log("Post "+post.url+" is expired and needs to be deleted");
	      	Users.update({_id: post.userId}, {$inc: {"telescope.postCount": -1}});
	      	Posts.remove(post._id);
	      	Telescope.callbacks.runAsync("postDeleteAsync", post);
	  	}
    });
};

Meteor.methods({
  deleteInactiveOffers: function () {
    deleteInactiveOffers();
  }
});
