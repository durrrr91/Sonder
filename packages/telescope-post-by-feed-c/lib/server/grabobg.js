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
	    ["Арбанаси","arbanasi","bulgaria"],
	    ["Правец","pravets","bulgaria"],
	    ["Бургас","burgas","bulgaria"],
	    ["Несебър","neseber","bulgaria"],
	    ["Стара Загора","stara_zagora","bulgaria"],
	    ["Златоград","zlatograd","bulgaria"],
	    ["Варна","varna","bulgaria"],
	    ["Поморие","pomorie","bulgaria"],
	    ["Балчик","balchik","bulgaria"],
	    ["Златни пясъци","zlatni_piasaci","bulgaria"],
	    ["Обзор","obzor","bulgaria"],
	    ["Слънчев бряг","sunny_beach","bulgaria"],
	    ["Равда","ravda","bulgaria"],
	    ["Езерец","ezerec","bulgaria"],
	    ["Равадиново","ravadinovo","bulgaria"],
	    ["Мелник","melnik","bulgaria"],
	    ["Сандански","sandanski","bulgaria"],
	    ["Баня","banya","bulgaria"],
	    ["Годлево","godlevo","bulgaria"],
	    ["Самоков","samokov","bulgaria"],
	    ["Костенец","kostenec","bulgaria"],
	    ["Брацигово","bracigovo","bulgaria"],
	    ["Кърджали","kardzhali","bulgaria"],
	    ["Смолян","smolyan","bulgaria"],
	    ["Априлци","aprilci","bulgaria"],
	    ["Габрово","gabrovo","bulgaria"],
	    ["Чифлик","chiflik","bulgaria"],
	    ["Панагюрище","panagurishte","bulgaria"],
	    ["Мирково","mirkovo","bulgaria"],
	    ["Копривщица","koprivshtica","bulgaria"],
	    ["Рибарица","ribaritsa","bulgaria"],
	    ["Тетевен","teteven","bulgaria"],
	    ["Троян","troyan","bulgaria"],
	    ["Пловдив","plovdiv","bulgaria"],
	    ["Пазарджик","pazardzhik","bulgaria"],
	    ["София","sofia","bulgaria"],
	    ["Перник","pernik","bulgaria"],
	    ["Кюстендил","Kyustendil","bulgaria"],
	    ["Русе","ruse","bulgaria"],
	    ["Свищов","svishtov","bulgaria"],
	    ["Плевен","pleven","bulgaria"],
	    ["Враца","vratsa","bulgaria"],
	    ["Монтана","montana","bulgaria"],
	    ["Добринище","dobrinishte","bulgaria"],
	    ["Шумен","shumen","bulgaria"],
	    ["Цари Мали град","cari_mali_grad","bulgaria"],
	    ["Етрополе","etropole","bulgaria"],
	    ["Пещера","peshtera","bulgaria"],
	    ["Младежко","mladejko","bulgaria"],
	    ["Карлово","karlovo","bulgaria"],
	    ["Ягодина","yagodina","bulgaria"],
	    ["Иракли","irakli","bulgaria"],
	    ["Хасково","haskovo","bulgaria"],
	    ["Триград","trigrad","bulgaria"],
	    ["Лещен","leshten","bulgaria"],
	    ["Гоце Делчев","goce_delchev","bulgaria"],
	    ["Чепеларе","chepelare","bulgaria"],
	    ["Калофер","kalofer","bulgaria"],
	    ["Велико Търново","veliko_turnovo","bulgaria"],
	    ["Хисаря","hisarya","bulgaria"],
	    ["Царево","tsarevo","bulgaria"],
	    ["Вършец","vurshec","bulgaria"],
	    ["Халкидики","chalkidiki","greece"],
	    ["Тасос","thasos","greece"],
	    ["Солун","thessaloniki","greece"],
	    ["Катерини","katerini","greece"],
	    ["Метеора","meteora","greece"],
	    ["Кавала","kavala","greece"],
	    ["Драма","drama","greece"],
	    ["Корфу","corfu","greece"],
	    ["Лефкада","lefkada","greece"],
	    ["Александруполис","alexandroupolis","greece"],
	    ["Литохоро","litochoro","greece"],
	    ["Лептокария","leptokarya","greece"]
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
