// API KEY: 7f162c99ea2cee9d3b28bc1eec52562f
// URL: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

var requestLat;
var requestLon;
const apiKey = "7f162c99ea2cee9d3b28bc1eec52562f";
var requestURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + requestLat + "&lon=" + requestLon + "&cnt=1" + "&appid=" + apiKey;

var citySearchEl = document.getElementById("city-search");
var cityDisplayEl = document.getElementById("city-display");
var displayEl = document.getElementById("display")

var gCity;
var gLimit=1;

var weatherInfo = [];

citySearchEl.addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        gCity = citySearchEl.value;
        searchByCity();
    }
})

function searchByCity(){
    gCity = "Darwin";
        fetch("https://api.openweathermap.org/geo/1.0/direct?q="+gCity+"&limit="+ gLimit + "&appid=" + apiKey, {})
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            try{
                requestLat = data[0].lat;
                requestLon = data[0].lon;

                fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + requestLat + "&lon=" + requestLon + "&units=metric&appid=" + apiKey, {})
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    cityDisplayEl.textContent = data.city.name + ", " + data.city.country;
                    console.log(data);
                    test(data);
                })
            } catch (error){
                console.log(error);
                location.reload();
                alert("Error");
            }
        })
    }

    function findDailyAverage(data){
        var dates = [];
        var dailyTemps = [];

        currentDate = data.list[0].dt_txt.split(" ")[0]
        currentTime = data.list[0].dt_txt.split(" ")[1]

        for(i=0; i< data.list.length; i++){
            if(!dates.includes(data.list[i].dt_txt.split(" ")[0])){
                dates.push(data.list[i].dt_txt.split(" ")[0])      
            }
            weatherInfo.push([{
                date:data.list[i].dt_txt.split(" ")[0],
                time:data.list[i].dt_txt.split(" ")[1],
                temp:(data.list[i].main.temp),
                humidity: data.list[i].main.humidity + "%",
                windSpeed: data.list[i].wind.speed + " m/s"
            }])
        }
        console.log("weatherInfo : " + weatherInfo)
    }

    // searchByCity();

function test(data){
        for(i=0; i<data.list.length; i++){
            if(data.list[i].dt_txt.split(" ")[1] == "15:00:00"){
                console.log(data.list[i].dt_txt.split(" ")[0], ", 3 PM : ", data.list[i]);
                displayToPage(data);
            }
        }
    }

    function displayToPage(data){

        var displayContainerEl = $("<section>");
        var weatherWrapperEl = $("<div>");
        var dateWrapperEl = $("<div>");
        var ImageWrapperEl = $("<div>");
        var ImageEl = $("<img>");
        var weatherDescriptionEl = $("<p>");
        var temperatureWrapperEl = $("<div>");
        var temperatureEl = $("<p>");
        var humidityEl = $("<p>");
        var windSpeedEl = $("<p>");


        displayContainerEl.attr("class", "display-container");
        weatherWrapperEl.attr("class", "weather-wrapper");
        dateWrapperEl.attr("class", "time-wrapper");
        dateWrapperEl.text(data.list[i].dt_txt.split(" ")[0]);
        ImageWrapperEl.attr("class", "image-wrapper");
        ImageEl.attr("class", "image weather-icon");
        ImageEl.attr("src", "http://openweathermap.org/img/w/"+ data.list[i].weather[0].icon + ".png");
        weatherDescriptionEl.attr("class", "weather-description");
        weatherDescriptionEl.text(data.list[i].weather[0].description);
        temperatureWrapperEl.attr("class", "temperature-wrapper");
        temperatureEl.attr("class", "temperature");
        temperatureEl.text(Math.round(data.list[i].main.temp) + "\u00B0C");
        humidityEl.attr("class", "humidity");
        humidityEl.text(Math.floor(data.list[i].main.humidity) + "%");
        windSpeedEl.attr("class", "Wind Speed");
        windSpeedEl.text((data.list[i].wind.speed) + " m/s");

        windSpeedEl.attr("class", "wind-speed");

        
        $("#display").append(displayContainerEl);
        displayContainerEl.append(weatherWrapperEl);
        weatherWrapperEl.append(dateWrapperEl);
        weatherWrapperEl.append(ImageWrapperEl);
        ImageWrapperEl.append(ImageEl);
        ImageWrapperEl.append(weatherDescriptionEl);
        weatherWrapperEl.append(temperatureWrapperEl);
        temperatureWrapperEl.append(temperatureEl);
        temperatureWrapperEl.append(humidityEl);
        temperatureWrapperEl.append(windSpeedEl);
    }
    
