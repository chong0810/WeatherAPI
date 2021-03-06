$( document ).ready(function() {

    localStorage.getItem("city");
    
    
    let cityName;
    
    // current city information
    var currentCity = document.getElementById("current");
    // current weather Emoji
    var currentEmoji = document.getElementById("currentEmoji");
    // current temperature
    var currentTemp = document.getElementById("temperature");
    // current humidity
    var currentHum = document.getElementById("humidity");
    // current wind speed
    var currentWind = document.getElementById("windSpeed");
    // current UV Index
    var currentUV = document.getElementById("uvIndex");
    
    // 5 day forecast
    
    // day1 information
    var day1 = document.getElementById("day1");
    // day 1 temp
    var day1Temp = document.getElementById("day1Temperature");
    //  day 1 humidity
    var day1Humidty = document.getElementById("day1Humidity");
    //  day 1 emoji
    var day1Emoji = document.getElementById("day1Emoji");
    
    //  day 2 information
    var day2 = document.getElementById("day2");
    //  day 2 temp
    var day2Temp = document.getElementById("day2Temperature");
    //  day 2 humidity
    var day2Humidty = document.getElementById("day2Humidity");
    //  day 2 emoji
    var day2Emoji = document.getElementById("day2Emoji");
    
    // day 3 information
    var day3 = document.getElementById("day3");
    // day 3 temp
    var day3Temp = document.getElementById("day3Temperature");
    // day 3 humidity
    var day3Humidty = document.getElementById("day3Humidity");
    //  day 3 emoji
    var day3Emoji = document.getElementById("day3Emoji");
    
    // day 4 information
    var day4 = document.getElementById("day4");
    // day 4 temp
    var day4Temp = document.getElementById("day4Temperature");
    // day 4 humidity
    var day4Humidty = document.getElementById("day4Humidity");
    // day 4 emoji
    var day4Emoji = document.getElementById("day4Emoji");
    
    // day 5 information
    var day5 = document.getElementById("day5");
    // day 5 temp
    var day5Temp = document.getElementById("day5Temperature");
    // day 5 humidity
    var day5Humidty = document.getElementById("day5Humidity");
    //  day 5 emoji
    var day5Emoji = document.getElementById("day5Emoji");
    
    // targeting searched city div
    var searchedCity = document.getElementById("searchedCity");
    // searched city list
    var cityArray = [];
    
    // putting local storage item in 
    
    if ((localStorage.getItem("city"))) {
    cityArray = JSON.parse(localStorage.getItem("city"));
    console.log(cityArray);
    
    // searched list 
    for (let i = 0; i <cityArray.length; i++) {
    
        cityName = cityArray[i];
        // let newDiv = document.createElement("div");
        // creating a searched city button
        let cityButton = document.createElement("button");
        let newDiv = document.createElement("div");
        cityButton.innerText = cityName;
        searchedCity.append(newDiv);
        newDiv.append(cityButton);
        newDiv.setAttribute("class", "row");
        cityButton.setAttribute("class","col-sm btn btn-light cityList");
        cityButton.onclick = function() {
        //    console.log(this);
        cityName = this.innerText;
    
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=3a62bced9ceab4de3f9f5c1c6e205817";
        $.ajax ({ 
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            // put information on according variables
            currentCity.innerText =  cityName + " " + moment().format("MM/DD/YYYY");
            currentEmoji= response.weather[0].icon;
            $("#currentEmoji").attr("src", "http://openweathermap.org/img/w/" + currentEmoji + ".png" );
            currentTemp.innerText = "Temperature: " + Math.floor(((response.main.temp - 273.15)*9 /5)+32)+ "°F";
            currentHum.innerText = "Humidity: " + response.main.humidity + "%";
            currentWind.innerText ="Wind Speed: " + response.wind.speed + " MPH";
            
            // uv index 
            queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=3a62bced9ceab4de3f9f5c1c6e205817&lat="+response.coord.lat+"&lon="+response.coord.lon;
    
            $.ajax ({
                url: queryURL,
                method: "GET"
            }).then(function(response2) {
                console.log(response2);
    
                currentUV.innerText = "UV Index: " + response2.value;
    
                if (response2.value < 3) {
                    currentUV.setAttribute("class", "lowUV");
                } else if (response2.value < 6 && response2.value >=3) {
                    currentUV.setAttribute("class", "moderateUV");
                } else if (response2.value <8 && response2.value >=6) {
                    currentUV.setAttribute("class", "highUV");
                } else {
                    currentUV.setAttribute("class", "veryHighUV");
                }
    
            }).then(function() {
                // 5 day forcast 
                queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid=3a62bced9ceab4de3f9f5c1c6e205817";
                $.ajax ({
                    url: queryURL,
                    method: "GET"
    
                }).then(function(response3) {
    
                    console.log(response3);
                    // today date
                    todayDate = moment();
                    // date calculator
                    day1.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
                    day2.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
                    day3.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
                    day4.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
                    day5.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
    
                    // 5 day temp
                    day1Temp.innerText ="Temp: " +Math.floor(((response3.list[4].main.temp - 273.15)*9 /5)+32)+ "°F"
                    day2Temp.innerText ="Temp: " +Math.floor(((response3.list[12].main.temp - 273.15)*9 /5)+32)+ "°F"
                    day3Temp.innerText ="Temp: " +Math.floor(((response3.list[20].main.temp - 273.15)*9 /5)+32)+ "°F"
                    day4Temp.innerText ="Temp: " +Math.floor(((response3.list[28].main.temp - 273.15)*9 /5)+32)+ "°F"
                    day5Temp.innerText ="Temp: " +Math.floor(((response3.list[36].main.temp - 273.15)*9 /5)+32)+ "°F"
    
                    // 5 day wind speed
                    day1Humidty.innerText ="Humidity: "+ response3.list[4].main.humidity + "%";
                    day2Humidty.innerText ="Humidity: "+ response3.list[12].main.humidity + "%";
                    day3Humidty.innerText ="Humidity: "+ response3.list[20].main.humidity + "%";
                    day4Humidty.innerText ="Humidity: "+ response3.list[28].main.humidity + "%";
                    day5Humidty.innerText ="Humidity: "+ response3.list[36].main.humidity + "%";
    
                    // 5 day weather Icons
                    day1Emoji= response3.list[4].weather[0].icon;
                    $("#day1Emoji").attr("src", "http://openweathermap.org/img/w/" + day1Emoji + ".png" );
                    day2Emoji= response3.list[12].weather[0].icon;
                    $("#day2Emoji").attr("src", "http://openweathermap.org/img/w/" + day2Emoji + ".png" );
                    day3Emoji= response3.list[20].weather[0].icon;
                    $("#day3Emoji").attr("src", "http://openweathermap.org/img/w/" + day3Emoji + ".png" );
                    day4Emoji= response3.list[28].weather[0].icon;
                    $("#day4Emoji").attr("src", "http://openweathermap.org/img/w/" + day4Emoji + ".png" );
                    day5Emoji= response3.list[36].weather[0].icon;
                    $("#day5Emoji").attr("src", "http://openweathermap.org/img/w/" + day5Emoji + ".png" );
    
    
                });
            });
    
    
        });
        
    
    }
    }
    
    cityName = cityArray[cityArray.length -1];
    
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=3a62bced9ceab4de3f9f5c1c6e205817";
       
    $.ajax ({ 
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            // put information on according variables
            currentCity.innerText =  cityName + " " + moment().format("MM/DD/YYYY");
            currentEmoji= response.weather[0].icon;
            $("#currentEmoji").attr("src", "http://openweathermap.org/img/w/" + currentEmoji + ".png" );
            currentTemp.innerText = "Temperature: " + Math.floor(((response.main.temp - 273.15)*9 /5)+32)+ "°F";
            currentHum.innerText = "Humidity: " + response.main.humidity + "%";
            currentWind.innerText ="Wind Speed: " + response.wind.speed + " MPH";
            
            // uv index 
            queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=3a62bced9ceab4de3f9f5c1c6e205817&lat="+response.coord.lat+"&lon="+response.coord.lon;
    
            $.ajax ({
                url: queryURL,
                method: "GET"
            }).then(function(response2) {
                console.log(response2);
    
                currentUV.innerText = "UV Index: " + response2.value;
    
                if (response2.value < 3) {
                    currentUV.setAttribute("class", "lowUV");
                } else if (response2.value < 6 && response2.value >=3) {
                    currentUV.setAttribute("class", "moderateUV");
                } else if (response2.value <8 && response2.value >=6) {
                    currentUV.setAttribute("class", "highUV");
                } else {
                    currentUV.setAttribute("class", "veryHighUV");
                }
    
            }).then(function() {
                // 5 day forcast 
                queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid=3a62bced9ceab4de3f9f5c1c6e205817";
                $.ajax ({
                    url: queryURL,
                    method: "GET"
    
                }).then(function(response3) {
    
                    console.log(response3);
                    // today date
                    todayDate = moment();
                    // date calculator
                    day1.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
                    day2.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
                    day3.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
                    day4.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
                    day5.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
    
                    // 5 day temp
                    day1Temp.innerText ="Temp: " +Math.floor(((response3.list[4].main.temp - 273.15)*9 /5)+32)+ "°F"
                    day2Temp.innerText ="Temp: " +Math.floor(((response3.list[12].main.temp - 273.15)*9 /5)+32)+ "°F"
                    day3Temp.innerText ="Temp: " +Math.floor(((response3.list[20].main.temp - 273.15)*9 /5)+32)+ "°F"
                    day4Temp.innerText ="Temp: " +Math.floor(((response3.list[28].main.temp - 273.15)*9 /5)+32)+ "°F"
                    day5Temp.innerText ="Temp: " +Math.floor(((response3.list[36].main.temp - 273.15)*9 /5)+32)+ "°F"
    
                    // 5 day wind speed
                    day1Humidty.innerText ="Humidity: "+ response3.list[4].main.humidity + "%";
                    day2Humidty.innerText ="Humidity: "+ response3.list[12].main.humidity + "%";
                    day3Humidty.innerText ="Humidity: "+ response3.list[20].main.humidity + "%";
                    day4Humidty.innerText ="Humidity: "+ response3.list[28].main.humidity + "%";
                    day5Humidty.innerText ="Humidity: "+ response3.list[36].main.humidity + "%";
    
                    // 5 day weather Icons
                    day1Emoji= response3.list[4].weather[0].icon;
                    $("#day1Emoji").attr("src", "http://openweathermap.org/img/w/" + day1Emoji + ".png" );
                    day2Emoji= response3.list[12].weather[0].icon;
                    $("#day2Emoji").attr("src", "http://openweathermap.org/img/w/" + day2Emoji + ".png" );
                    day3Emoji= response3.list[20].weather[0].icon;
                    $("#day3Emoji").attr("src", "http://openweathermap.org/img/w/" + day3Emoji + ".png" );
                    day4Emoji= response3.list[28].weather[0].icon;
                    $("#day4Emoji").attr("src", "http://openweathermap.org/img/w/" + day4Emoji + ".png" );
                    day5Emoji= response3.list[36].weather[0].icon;
                    $("#day5Emoji").attr("src", "http://openweathermap.org/img/w/" + day5Emoji + ".png" );
    
    
                });
            });
    
    
        });
            
        
    
    }
    
    // search function
    $("#submit").click(function () {
        
        
        cityName = $("#input").val().trim();
        // let newDiv = document.createElement("div");
        // creating a searched city button
        let cityButton = document.createElement("button");
        let newDiv = document.createElement("div");
        cityButton.innerText = cityName;
        searchedCity.append(newDiv);
        newDiv.append(cityButton);
        newDiv.setAttribute("class", "row");
        cityButton.setAttribute("class","col-sm btn btn-light cityList");
        cityButton.onclick = function() {
        //    console.log(this);
        cityName = this.innerText;
    
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=3a62bced9ceab4de3f9f5c1c6e205817";
        $.ajax ({ 
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            // put information on according variables
            currentCity.innerText =  cityName + " " + moment().format("MM/DD/YYYY");
            currentEmoji= response.weather[0].icon;
            $("#currentEmoji").attr("src", "http://openweathermap.org/img/w/" + currentEmoji + ".png" );
            currentTemp.innerText = "Temperature: " + Math.floor(((response.main.temp - 273.15)*9 /5)+32)+ "°F";
            currentHum.innerText = "Humidity: " + response.main.humidity + "%";
            currentWind.innerText ="Wind Speed: " + response.wind.speed + " MPH";
            
            // uv index 
            queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=3a62bced9ceab4de3f9f5c1c6e205817&lat="+response.coord.lat+"&lon="+response.coord.lon;
    
            $.ajax ({
                url: queryURL,
                method: "GET"
            }).then(function(response2) {
                console.log(response2);
    
                currentUV.innerText = "UV Index: " + response2.value;
    
                if (response2.value < 3) {
                    currentUV.setAttribute("class", "lowUV");
                } else if (response2.value < 6 && response2.value >=3) {
                    currentUV.setAttribute("class", "moderateUV");
                } else if (response2.value <8 && response2.value >=6) {
                    currentUV.setAttribute("class", "highUV");
                } else {
                    currentUV.setAttribute("class", "veryHighUV");
                }
    
            }).then(function() {
                // 5 day forcast 
                queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid=3a62bced9ceab4de3f9f5c1c6e205817";
                $.ajax ({
                    url: queryURL,
                    method: "GET"
    
                }).then(function(response3) {
    
                    console.log(response3);
                    // today date
                    todayDate = moment();
                    // date calculator
                    day1.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
                    day2.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
                    day3.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
                    day4.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
                    day5.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
    
                    // 5 day temp
                    day1Temp.innerText ="Temp: " +Math.floor(((response3.list[4].main.temp - 273.15)*9 /5)+32)+ "°F"
                    day2Temp.innerText ="Temp: " +Math.floor(((response3.list[12].main.temp - 273.15)*9 /5)+32)+ "°F"
                    day3Temp.innerText ="Temp: " +Math.floor(((response3.list[20].main.temp - 273.15)*9 /5)+32)+ "°F"
                    day4Temp.innerText ="Temp: " +Math.floor(((response3.list[28].main.temp - 273.15)*9 /5)+32)+ "°F"
                    day5Temp.innerText ="Temp: " +Math.floor(((response3.list[36].main.temp - 273.15)*9 /5)+32)+ "°F"
    
                    // 5 day wind speed
                    day1Humidty.innerText ="Humidity: "+ response3.list[4].main.humidity + "%";
                    day2Humidty.innerText ="Humidity: "+ response3.list[12].main.humidity + "%";
                    day3Humidty.innerText ="Humidity: "+ response3.list[20].main.humidity + "%";
                    day4Humidty.innerText ="Humidity: "+ response3.list[28].main.humidity + "%";
                    day5Humidty.innerText ="Humidity: "+ response3.list[36].main.humidity + "%";
    
                    // 5 day weather Icons
                    day1Emoji= response3.list[4].weather[0].icon;
                    $("#day1Emoji").attr("src", "http://openweathermap.org/img/w/" + day1Emoji + ".png" );
                    day2Emoji= response3.list[12].weather[0].icon;
                    $("#day2Emoji").attr("src", "http://openweathermap.org/img/w/" + day2Emoji + ".png" );
                    day3Emoji= response3.list[20].weather[0].icon;
                    $("#day3Emoji").attr("src", "http://openweathermap.org/img/w/" + day3Emoji + ".png" );
                    day4Emoji= response3.list[28].weather[0].icon;
                    $("#day4Emoji").attr("src", "http://openweathermap.org/img/w/" + day4Emoji + ".png" );
                    day5Emoji= response3.list[36].weather[0].icon;
                    $("#day5Emoji").attr("src", "http://openweathermap.org/img/w/" + day5Emoji + ".png" );
    
    
                });
            });
    
    
        });
    
        }
    
        cityArray.push(cityName);
    
        localStorage.setItem("city", JSON.stringify(cityArray));
    
    
    //  $("#submit").on("click", function(){
    //      var cityList = [];
    //      var city = $("input").val().trim();
    //      cityList.push(city)
    //      localStorage.setItem("city", JSON.stringify(cityList))
    //  })
    
    // $("#submit").on("click", function(event){
    //     event.preventDefault;
    //     var city = $("input").val().trim();
    //     $("#searchedCity").append(city)
    //     getWeather()
    // })
    
    // var weatherHistory = getItem from localStorage
    
    // if (weatherHistory.length > 0) {
    //     getWeather(weatherHistory[weatherHistory.length-1]);
    // }
    
    // for loop that goes through local storage
    // declare var for localStorage.getItem(whatever index);
    // cityList.append(city)
        
    
    
        // get searched city today's info
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=3a62bced9ceab4de3f9f5c1c6e205817";
        $.ajax ({ 
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            // put information on according variables
            currentCity.innerText =  cityName + " " + moment().format("MM/DD/YYYY");
            currentEmoji= response.weather[0].icon;
            $("#currentEmoji").attr("src", "http://openweathermap.org/img/w/" + currentEmoji + ".png" );
            currentTemp.innerText = "Temperature: " + Math.floor(((response.main.temp - 273.15)*9 /5)+32)+ "°F";
            currentHum.innerText = "Humidity: " + response.main.humidity + "%";
            currentWind.innerText ="Wind Speed: " + response.wind.speed + " MPH";
            
            // uv index 
            queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=3a62bced9ceab4de3f9f5c1c6e205817&lat="+response.coord.lat+"&lon="+response.coord.lon;
    
            $.ajax ({
                url: queryURL,
                method: "GET"
            }).then(function(response2) {
                console.log(response2);
    
                currentUV.innerText = "UV Index: " + response2.value;
    
                if (response2.value < 3) {
                    currentUV.setAttribute("class", "lowUV");
                } else if (response2.value < 6 && response2.value >=3) {
                    currentUV.setAttribute("class", "moderateUV");
                } else if (response2.value <8 && response2.value >=6) {
                    currentUV.setAttribute("class", "highUV");
                } else {
                    currentUV.setAttribute("class", "veryHighUV");
                }
    
            }).then(function() {
                // 5 day forcast 
                queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+cityName+"&appid=3a62bced9ceab4de3f9f5c1c6e205817";
                $.ajax ({
                    url: queryURL,
                    method: "GET"
    
                }).then(function(response3) {
    
                    console.log(response3);
                    // today date
                    todayDate = moment();
                    // date calculator
                    day1.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
                    day2.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
                    day3.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
                    day4.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
                    day5.innerText = todayDate.add(1,"days").format("MM/DD/YYYY");
    
                    // 5 day temp
                    day1Temp.innerText ="Temp: " +Math.floor(((response3.list[4].main.temp - 273.15)*9 /5)+32)+ "°F"
                    day2Temp.innerText ="Temp: " +Math.floor(((response3.list[12].main.temp - 273.15)*9 /5)+32)+ "°F"
                    day3Temp.innerText ="Temp: " +Math.floor(((response3.list[20].main.temp - 273.15)*9 /5)+32)+ "°F"
                    day4Temp.innerText ="Temp: " +Math.floor(((response3.list[28].main.temp - 273.15)*9 /5)+32)+ "°F"
                    day5Temp.innerText ="Temp: " +Math.floor(((response3.list[36].main.temp - 273.15)*9 /5)+32)+ "°F"
    
                    // 5 day wind speed
                    day1Humidty.innerText ="Humidity: "+ response3.list[4].main.humidity + "%";
                    day2Humidty.innerText ="Humidity: "+ response3.list[12].main.humidity + "%";
                    day3Humidty.innerText ="Humidity: "+ response3.list[20].main.humidity + "%";
                    day4Humidty.innerText ="Humidity: "+ response3.list[28].main.humidity + "%";
                    day5Humidty.innerText ="Humidity: "+ response3.list[36].main.humidity + "%";
    
                    // 5 day weather Icons
                    day1Emoji= response3.list[4].weather[0].icon;
                    $("#day1Emoji").attr("src", "http://openweathermap.org/img/w/" + day1Emoji + ".png" );
                    day2Emoji= response3.list[12].weather[0].icon;
                    $("#day2Emoji").attr("src", "http://openweathermap.org/img/w/" + day2Emoji + ".png" );
                    day3Emoji= response3.list[20].weather[0].icon;
                    $("#day3Emoji").attr("src", "http://openweathermap.org/img/w/" + day3Emoji + ".png" );
                    day4Emoji= response3.list[28].weather[0].icon;
                    $("#day4Emoji").attr("src", "http://openweathermap.org/img/w/" + day4Emoji + ".png" );
                    day5Emoji= response3.list[36].weather[0].icon;
                    $("#day5Emoji").attr("src", "http://openweathermap.org/img/w/" + day5Emoji + ".png" );
    
    
                });
            });
    
    
        });
            
    
        });
    
    
    
      
    
    });
    