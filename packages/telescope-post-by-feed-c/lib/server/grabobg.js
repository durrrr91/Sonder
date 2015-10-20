var parseString = Npm.require('xml2js').parseString;
var request = Npm.require('request');
var getFirstAdminUser = function() {
  return Users.adminUsers({sort: {createdAt: 1}, limit: 1})[0];
};
var getItemCategories = function(title) {
    var itemCategories = [];
    var towns = [
	    ["Банско","bansko","Пирин","pirin","България","bulgaria"],
	    ["Велинград","velingrad","Родопи","rodopi","България","bulgaria"],
	    ["Пампорово","pamporovo","Родопи","rodopi","България","bulgaria"],
	    ["Трявна","triavna","Стара планина","stara_planina","България","bulgaria"],
	    ["Разлог","razlog","Пирин","pirin","България","bulgaria"],
	    ["Девин","devin","Родопи","rodopi","България","bulgaria"],
	    ["Елена","elena","Стара планина","stara_planina","България","bulgaria"],
	    ["Дряново","drianovo","Стара планина","stara_planina","България","bulgaria"],
	    ["Боровец","borovec","Рила","rila","България","bulgaria"],
	    ["Цигов чарк","tsigov_chark","Родопи","rodopi","България","bulgaria"],
	    ["Говедарци","govedartsi","Рила","rila","България","bulgaria"],
	    ["Арбанаси","arbanasi","Стара планина","stara_planina","България","bulgaria"],
	    ["Правец","pravets","София и Западна България","sofia_i_zapadna_bulgaria","България","bulgaria"],
	    ["Бургас","burgas","Южно черноморие","yujno_chernomorie","България","bulgaria"],
	    ["Несебър","neseber","Южно черноморие","yujno_chernomorie","България","bulgaria"],
	    ["Стара Загора","stara_zagora","Пловдив и Tракия","plovdiv_i_trakia","България","bulgaria"],
	    ["Златоград","zlatograd","Родопи","rodopi","България","bulgaria"],
	    ["Варна","varna","Северно черноморие","severno_chernomorie","България","bulgaria"],
	    ["Поморие","pomorie","Южно черноморие","yujno_chernomorie","България","bulgaria"],
	    ["Балчик","balchik","Северно черноморие","severno_chernomorie","България","bulgaria"],
	    ["Златни пясъци","zlatni_piasaci","Северно черноморие","severno_chernomorie","България","bulgaria"],
	    ["Обзор","obzor","Северно черноморие","severno_chernomorie","България","bulgaria"],
	    ["Слънчев бряг","sunny_beach","Южно черноморие","yujno_chernomorie","България","bulgaria"],
	    ["Равда","ravda","Южно черноморие","yujno_chernomorie","България","bulgaria"],
	    ["Езерец","ezerec","София и Западна България","sofia_i_zapadna_bulgaria","България","bulgaria"],
	    ["Равадиново","ravadinovo","Южно черноморие","yujno_chernomorie","България","bulgaria"],
	    ["Мелник","melnik","Пирин","pirin","България","bulgaria"],
	    ["Сандански","sandanski","Пирин","pirin","България","bulgaria"],
	    ["Баня","banya","Пирин","pirin","България","bulgaria"],
	    ["Годлево","godlevo","Пирин","pirin","България","bulgaria"],
	    ["Самоков","samokov","Рила","rila","България","bulgaria"],
	    ["Костенец","kostenec","Рила","rila","България","bulgaria"],
	    ["Брацигово","bracigovo","Родопи","rodopi","България","bulgaria"],
	    ["Кърджали","kardzhali","Родопи","rodopi","България","bulgaria"],
	    ["Смолян","smolyan","Родопи","rodopi","България","bulgaria"],
	    ["Априлци","aprilci","Стара планина","stara_planina","България","bulgaria"],
	    ["Габрово","gabrovo","Стара планина","stara_planina","България","bulgaria"],
	    ["Чифлик","chiflik","Стара планина","stara_planina","България","bulgaria"],
	    ["Панагюрище","panagurishte","Стара планина","stara_planina","България","bulgaria"],
	    ["Мирково","mirkovo","Стара планина","stara_planina","България","bulgaria"],
	    ["Копривщица","koprivshtica","Стара планина","stara_planina","България","bulgaria"],
	    ["Рибарица","ribaritsa","Стара планина","stara_planina","България","bulgaria"],
	    ["Тетевен","teteven","Стара планина","stara_planina","България","bulgaria"],
	    ["Троян","troyan","Стара планина","stara_planina","България","bulgaria"],
	    ["Пловдив","plovdiv","Пловдив и Tракия","plovdiv_i_trakia","България","bulgaria"],
	    ["Пазарджик","pazardzhik","Пловдив и Tракия","plovdiv_i_trakia","България","bulgaria"],
	    ["София","sofia","София и Западна България","sofia_i_zapadna_bulgaria","България","bulgaria"],
	    ["Перник","pernik","София и Западна България","sofia_i_zapadna_bulgaria","България","bulgaria"],
	    ["Кюстендил","kyustendil","София и Западна България","sofia_i_zapadna_bulgaria","България","bulgaria"],
	    ["Русе","ruse","Северна България","severna_bulgaria","България","bulgaria"],
	    ["Свищов","svishtov","Северна България","severna_bulgaria","България","bulgaria"],
	    ["Плевен","pleven","Северна България","severna_bulgaria","България","bulgaria"],
	    ["Враца","vratsa","Северна България","severna_bulgaria","България","bulgaria"],
	    ["Монтана","montana","Северна България","severna_bulgaria","България","bulgaria"],
	    ["Добринище","dobrinishte","Пирин","pirin","България","bulgaria"],
	    ["Шумен","shumen","Северна България","severna_bulgaria","България","bulgaria"],
	    ["Цари Мали град","cari_mali_grad","Рила","rila","България","bulgaria"],
	    ["Етрополе","etropole","София и Западна България","sofia_i_zapadna_bulgaria","България","bulgaria"],
	    ["Пещера","peshtera","Родопи","rodopi","България","bulgaria"],
	    ["Младежко","mladejko","Южно черноморие","yujno_chernomorie","България","bulgaria"],
	    ["Карлово","karlovo","Стара планина","stara_planina","България","bulgaria"],
	    ["Ягодина","yagodina","Родопи","rodopi","България","bulgaria"],
	    ["Иракли","irakli","Северно черноморие","severno_chernomorie","България","bulgaria"],
	    ["Хасково","haskovo","Пловдив и Tракия","plovdiv_i_trakia","България","bulgaria"],
	    ["Триград","trigrad","Родопи","rodopi","България","bulgaria"],
	    ["Лещен","leshten","Пирин","pirin","България","bulgaria"],
	    ["Гоце Делчев","goce_delchev","Пирин","pirin","България","bulgaria"],
	    ["Чепеларе","chepelare","Родопи","rodopi","България","bulgaria"],
	    ["Калофер","kalofer","Стара планина","stara_planina","България","bulgaria"],
	    ["Велико Търново","veliko_turnovo","Стара планина","stara_planina","България","bulgaria"],
	    ["Хисаря","hisarya","Пловдив и Tракия","plovdiv_i_trakia","България","bulgaria"],
	    ["Царево","tsarevo","Южно черноморие","yujno_chernomorie","България","bulgaria"],
	    ["Вършец","vurshec","Северна България","severna_bulgaria","България","bulgaria"],
	    ["Халкидики","chalkidiki","","","Гърция","greece"],
	    ["Тасос","thasos","","","Гърция","greece"],
	    ["Солун","thessaloniki","","","Гърция","greece"],
	    ["Катерини","katerini","","","Гърция","greece"],
	    ["Метеора","meteora","","","Гърция","greece"],
	    ["Кавала","kavala","","","Гърция","greece"],
	    ["Драма","drama","","","Гърция","greece"],
	    ["Корфу","corfu","","","Гърция","greece"],
	    ["Лефкада","lefkada","","","Гърция","greece"],
	    ["Александруполис","alexandroupolis","","","Гърция","greece"],
	    ["Литохоро","litochoro","","","Гърция","greece"],
	    ["Лептокария","leptokarya","","","Гърция","greece"]
    ];
    var addCat = function(catName,catSlug,catParent){
		var country = Categories.findOne({slug: catSlug});
		if(country){
			itemCategories.push(country._id);
		}else{
			if(catParent){
				var cat_parent = Categories.findOne({slug: catParent});
				if(cat_parent){
					Categories.insert({name: catName, slug: catSlug, parentId: cat_parent._id, image: "/packages/custom-theme/public/img/"+catSlug+".jpg"});
				}
			}else{
				Categories.insert({name: catName, slug: catSlug, image: "/packages/custom-theme/public/img/"+catSlug+".jpg"});
			}
			
			var new_country = Categories.findOne({slug:catSlug});
			if(new_country){ itemCategories.push(new_country._id); }
		}    	
    }
    if (title) {
    	for(var i=0; i<towns.length; i++){
    		if(title.indexOf(towns[i][0]) > -1){
    			addCat(towns[i][4], towns[i][5], null); //country
    			if(towns[i][3]){ //region
    				addCat(towns[i][2],towns[i][3],towns[i][5]);
    				addCat(towns[i][0],towns[i][1],towns[i][3]);
    			}else{ //no region
    				addCat(towns[i][0],towns[i][1],towns[i][5]);
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
