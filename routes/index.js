
/*
 * GET home page.
 */
var YQL = require("yql");
var models = require('../models');
var Img = models.Img;

exports.index = function(req, res){
  // TODO: include other locations 
  // TODO: add pricing
  locations = ["San-Francisco--CA"];
  
  // scrape airbnb with a given location for images
  new YQL.exec('select * from data.html.cssselect where url="https://www.airbnb.com/s/San-Francisco--CA" and css=".pop_image_small a"', function(response) {
    results = response.query.results.results.a;
    for (var i in results) {
      var res = results[i];
      url = res.img.src;
      name = res.title;
      link = "https://www.airbnb.com"+res.href;
      if (url=='//a1.muscache.com/airbnb/static/page2/default-listing-thumbnail-a8408bbd55f4844b681f628f7d521d13.jpg')
      	continue;
      console.log(url);
      console.log(name);
      console.log(link);

      // add to mongoose db
      var img = new Img({ url:url, name:name, airbnbLink:link});
      img.save(function (err) {
        if (err)
          return console.log(err);
      });
    }
  });

  new YQL.exec('select * from data.html.cssselect where url="https://www.airbnb.com/s/New-York-NY" and css=".pop_image_small a"', function(response) {
    results = response.query.results.results.a;
    for (var i in results) {
      var res = results[i];
      console.log(res);
      url = res.img.src;
      name = res.title;
      link = "https://www.airbnb.com"+res.href;
      if (url=='//a1.muscache.com/airbnb/static/page2/default-listing-thumbnail-a8408bbd55f4844b681f628f7d521d13.jpg')
      	continue;
      console.log(url);
      console.log(name);
      console.log(link);

      // add to mongoose db
      var img = new Img({ url:url, name:name, airbnbLink:link});
      img.save(function (err) {
        if (err)
          return console.log(err);
      });
    }
  });

  res.render('index', { title: 'Look at Places to Stay' });
};

exports.pics = function(req, res){
  var images = Img.find({}, function (err, imgs) {
  	if (err)
  		console.log(err);

  	// do not display duplicate images
  	var urls = [];
  	for (var i in imgs) {
  		var duplicate = false;
  		console.log(urls[j]);
  		console.log(imgs[i].url);
  		for (var j in urls) {
  		  if (urls[j].url == imgs[i].url)
  		    duplicate = true;
  		}
  		if (!duplicate && imgs[i].airbnbLink!=undefined)
  		  urls.push(imgs[i]);
  	}
  	console.log(urls);
    res.render('pics', { imgs:urls, title: 'Pictures of Places to Stay' });
  });
};

exports.about = function(req, res){
  res.render('about', {title: 'About'});
};

exports.contact = function(req, res){
  res.render('contact', {title: 'Contact'});
};