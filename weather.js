
window.onload = function() {
	getLocation();
}

// for autocomplete input fied suggestions

function activatePlacesSearch(){
	var input = document.getElementById("autocomplete");
	var autocomplete = new google.maps.places.Autocomplete(input);
}

// city name div

var x = document.getElementById("city");

//fetching lat and long of current location

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position){
    lat=position.coords.latitude;
    lon=position.coords.longitude;
    displayLocation(lat,lon);
}

//converting coords  into city name and displaying

function displayLocation(latitude,longitude){
    var geocoder;
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode(
        {'latLng': latlng}, 
        function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var add= results[0].formatted_address ;
                    var  value=add.split(",");

                    count=value.length;
                    country=value[count-1];
                    state=value[count-2];
                    city=value[count-3];
                    x.innerHTML = city;
                    findWeatherDetails();
                }
                else  {
                    x.innerHTML = "address not found";
                }
            }
            else {
                x.innerHTML = "Geocoder failed due to: " + status;
            }
        }
    );
}

// variables and constant 

const apiKey = "5b4d71cebe83b8bae3c180a2bd3e4ddf";

let searchButton = document.getElementById("submit");
let searchInput = document.getElementById("autocomplete");
let status_icon = document.getElementById("icon");
let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");

//if clicked search button after filling city name

searchButton.addEventListener("click", findWeatherDetails);

//if pressed enter after filling city name

searchInput.addEventListener("keyup", enterPressed);
function enterPressed(event) {
  if (event.key === "Enter") {
    findWeatherDetails();
  }
}

//url conditions

function findWeatherDetails() {
  if (searchInput.value === "") {
  	  let url = "https://api.openweathermap.org/data/2.5/weather?q=" + x.innerHTML + "&appid="+apiKey;
  	  httpRequestAsync(url, theResponse);
  } 
  else {
      let url = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput.value + "&appid="+apiKey;
      httpRequestAsync(url, theResponse);
  }
}


//asynchronous request

function httpRequestAsync(url, callback){
  
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = () => { 
          if (httpRequest.readyState == 4 && httpRequest.status == 200){
            callback(httpRequest.responseText);
          }
    }

    httpRequest.open("GET", url, true); // true for asynchronous 
    httpRequest.send();
}

// geting  city data(temperature,pressure,wind,humidity and icon) and displaying

function theResponse(response) {

  let data = JSON.parse(response);

	  if(searchInput.value === ""){
	  	x.innerHTML = city;
	  }else{
	  	x.innerHTML = data.name;
	  }

	  status_icon.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

	  document.getElementById("status_text").innerHTML = data.weather[0].main;

  		var celcius_btn = document.getElementById("celcius");
  		var far_btn = document.getElementById("far");

  		far_btn.addEventListener("click",function(){
  			var celcius = parseInt(data.main.temp - 273) + "  &degC";
  			var farhenheit = parseInt(((data.main.temp - 273) * (1.8)) + 32) + "  &degF";
  	  	if(temperature.innerHTML = celcius){
  	  		temperature.innerHTML = farhenheit;
  	  		far_btn.style.display = "none";
  	  		celcius_btn.style.display ="inline-block";
  	  	}
    	});

  		celcius_btn.addEventListener("click",function(){
  			var celcius = parseInt(data.main.temp - 273) + "  &degC";
  			var farhenheit = parseInt(((data.main.temp - 273) * (1.8)) + 32) + "  &degF";
  	  	if(temperature.innerHTML = farhenheit){
  	  		temperature.innerHTML = celcius;
  	  		celcius_btn.style.display = "none";
  	  		far_btn.style.display ="inline-block";
  	  	}
  	  });

      var weatherImage = "";

    var imagePhoto = {

        thunder: "http://hdqwalls.com/wallpapers/bthumb/thunderstorm-5k-7g.jpg",
        rainy: "https://images5.alphacoders.com/600/thumb-1920-600816.jpg",
        cloudy: "https://images.wallpaperscraft.com/image/clouds_porous_sky_116078_3840x2400.jpg",
        snow: "https://images.alphacoders.com/220/thumb-350-22071.jpg",
        clear: "https://images.pexels.com/photos/96622/pexels-photo-96622.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        drizzle: "https://images8.alphacoders.com/714/thumb-1920-714894.jpg",
        haze: "https://images.pexels.com/photos/163323/fog-dawn-landscape-morgenstimmung-163323.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        tornado: "https://images.alphacoders.com/284/thumb-1920-284263.jpg",
        cold: "https://static.pexels.com/photos/374/snow-dawn-sunset-winter.jpg",
        windy: "https://ak9.picdn.net/shutterstock/videos/4337360/thumb/1.jpg",
        hail: "https://s-media-cache-ak0.pinimg.com/236x/7c/60/3d/7c603d9183ff32c92330780a2ebdcfca--rainy-weather-rainy-days.jpg",
        sunny: "https://wallpaperstudio10.com/static/wpdb/wallpapers/1000x563/180913.jpg"
    };

    function selectImage (id){

    if (id >= 200 && id <= 232){
        weatherImage = imagePhoto.thunder;
    }else if(id >= 300 && id <= 321){
        weatherImage = imagePhoto.drizzle;
    }else if (id >= 500 && id <= 531){
        weatherImage = imagePhoto.rainy;
    }else if (id >= 600 && id <= 622){
        weatherImage = imagePhoto.snow;
    }else if (id >= 701 && id <= 721 ){
        weatherImage = imagePhoto.haze;
    }else if (id === 800){
        weatherImage = imagePhoto.clear;
    }else if (id >= 801 && id <= 804){
        weatherImage = imagePhoto.cloudy;
    }else if (id >= 900 && id <= 902){
        weatherImage = imagePhoto.tornado;
    }else if (id === 903){
        weatherImage = imagePhoto.cold;
    }else if (id === 904){
      weatherImage = imagePhoto.sunny;
    }else if (id === 905){
        weatherImage = imagePhoto.windy;
    }else if (id === 906){
        weatherImage = imagePhoto.hail;
    }else{
        weatherImage = imagePhoto.windy;
    }

    $('body').css('background-image', 'url(' + weatherImage + ')').addClass("background");


}
      selectImage(data.weather[0].id);

  	  temperature.innerHTML = parseInt(data.main.temp - 273) + "  &degC";
  	  humidity.innerHTML = data.main.humidity + "  %";
  	  pressure.innerHTML = data.main.pressure + "  hpa";
  	  wind.innerHTML = data.wind.speed + "  km/h";
}

