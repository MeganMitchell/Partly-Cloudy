//first, get weather
//display weather
//get art
//use keywords from current weather (sunny, rainy) to find art with the same keywords
//randomize a choice within those key words
//display art

// _____________________________________________________
//this section gets the current weather in Toronto

var weatherApp = {};
weatherApp.apiKey = 'BRdqaKQv';
weatherApp.apiURL = 'https://www.rijksmuseum.nl/api/en/';

weatherApp.getWeather = function() {
	$.ajax({
	  	url : "http://api.wunderground.com/api/3b02180019cd1414/geolookup/conditions/q/canada/Toronto.json",
	  	dataType : "jsonp"
	 }).then(function(parsed_json) {
  		var location = parsed_json.location.city;
  		var temp_f = parsed_json.current_observation.temp_c;
  		var conditions = parsed_json.current_observation.icon;
  		var feelsLike = parsed_json.current_observation.feelslike_c;
  		console.log(parsed_json)
	  	console.log("Current temperature in " + location + " is: " + temp_f + ", the conditions are " + conditions);
	  	$('#weather').html('Current temperature in <span>' + location + '</span> is <span>'  + temp_f + 'C</span> (feeling like <span>' + feelsLike + 'C</span>), and the conditions are <span>' + conditions) + '</span>';
	  	weatherApp.getArt(conditions)
	  });
};


  weatherApp.getArt = function(weatherConditions){
	$.ajax({ //ajax is also a method
		url: weatherApp.apiURL + 'collection',
		method: 'GET',
		dataType: 'json',
		data: {
			key: weatherApp.apiKey,
			ps: 100,
			q: weatherConditions + ' painting'
		},
	}).then(function(artData) { 

		var artWithImages = artData.artObjects.filter(function(item) {
			return item.hasImage === true
		}); console.log(artWithImages)

			var randomArt = Math.floor(Math.random()* artWithImages.length);

			var artTitle = artWithImages[randomArt].title;
			var artPrincipal = artWithImages[randomArt].principalOrFirstMaker;
			var artImage = artWithImages[randomArt].webImage.url
			console.log(artImage)
			console.log(artTitle)
			weatherApp.displayArt(artImage, artTitle, artPrincipal);

		});

	};

			weatherApp.displayArt = function(artImage, artTitle, artPrincipal) {
				// document.body.style.backgroundImage = artImage;
				$('#art').html( artTitle + " <span>by</span> " + artPrincipal) ;
				// $('body').css
				$('body').css('background-image', 'url("'+ artImage + '")');

	
			};
  
weatherApp.init = function() {
  	weatherApp.getWeather();
  	// weatherApp.displayArt();
};

$(function() {
	weatherApp.init();
});
// _____________________________________________________

