function celciusToFahrenheit(celcius){
  return (celcius * (9/5) + 32);
}

// sets the image at "imageURL" as the background image
function changeBackground(imageURL){
  $("body").css('background', "url(" + imageURL + ")");
}

// finds the appropriate weather status from description
// and calls changeBackground() to set appropriate bg image
function checkStatus(description){
  if (description.search("cloudy") != -1){
    changeBackground("http://www.cray.com/blog/wp-content/uploads/2015/09/Weather-Blog-Image.jpg");
  }
  else if (description.search("fog") != -1){
    changeBackground("https://a2ua.com/fog/fog-022.jpg");
  }
  else if (description.search("haze") != -1){
  changeBackground("http://www.pamper.my/news/wp-content/uploads/2015/09/haze-in-malaysia.jpg");
  }
  else if (description.search("rain") != -1){
    changeBackground("http://harrymoroz.com/wp-content/uploads/2014/04/1_See_It.jpg");
  }
  else if (description.search("snow") != -1){
    changeBackground("https://upload.wikimedia.org/wikipedia/commons/4/4a/Snow_on_the_mountains_of_Southern_California.jpg");
  }
  else if (description.search("thunderstorm") != -1){
    changeBackground("http://farmersalmanac.com/wp-content/uploads/2015/06/Thunderstorm-5best.jpg");
  }
  else {
    changeBackground("http://img.wallpaperfolder.com/f/489128C8C077/clear-sky-759.jpg");
  }
  
}

function displayWeather(celOrFah){
  // get user's location by IP address
  $.getJSON("http://ipinfo.io/json", function(json){
    // get city name of user's current ip address
    console.log(json);
    var cityName = json.city;
    var countryCode = json.country;
    var api = "http://api.openweathermap.org/data/2.5/weather?q="  + cityName  + ","  + countryCode + "&units=metric&appid=19bd064b6c3a18668b3257b1ca21fb93";
    
    // get weather information about user's city
    $.getJSON(api, function(weather){
      //console.log(weather);
      var temp = weather.main.temp;
      var windSpeed = weather.wind.speed;
      var description = weather.weather[0].description;
      //console.log(temp, windSpeed, description, cityName);
      var html = "<br>";
      html += "<center><h3>" + cityName + ", " + countryCode + "</h3>";
      if (celOrFah == "celcius"){
        html += "<h3 id=''celfah>" + Math.round(temp) + " °C </h3>";
      }
      else{
        html += "<h3 id=''celfah>" + Math.round(celciusToFahrenheit(temp)) + " °F </h3>";
      }
      html += "<h3>" + description + "</h3>";
      html += "</center>";
      /*if (description == "clear sky"){
        changeBackground("http://img.wallpaperfolder.com/f/489128C8C077/clear-sky-759.jpg");
      }*/
      checkStatus(description);
      $(".message").html(html);
      
    });
  });
}



$(document).ready(function(){
  displayWeather("celcius");  
  
  $(".btn-primary").on('click', function(){
      displayWeather("celcius");
  });
  $(".btn-success").on('click', function(){
    displayWeather("fahrenheit");
  });
});