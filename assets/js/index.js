var searchInputEl = document.getElementById("userInput");
var searchBtnEl = document.getElementById("searchBtn");
var mainDisplayEl = document.getElementById("primary-card");
var fivedayDisplayEl = document.getElementById("day5-card");
var userHistoryEl = document.getElementById("searchList")
var searchData = [];
var previousSearch = []; 

searchBtnEl.addEventListener("click", userCity);


function init(){
    var storedSearches = JSON.parse(localStorage.getItem("cityKey"));
    if (storedSearches !== null) {
        previousSearch = storedSearches
    }
    displayPreviousSearch()
}

function userCity (event) {
    event.preventDefault();
    var cityName = searchInputEl.value;
    if (cityName === "") {
        alert ("No Name entered to Search");
        return;
    }
    previousSearch.push(cityName);
    searchInputEl.value= "";
    getAPIdata(cityName);
    addSearch();
    displayPreviousSearch();
}

function addSearch(){
localStorage.setItem("cityKey", JSON.stringify(previousSearch))
}

function displayPreviousSearch(){
userHistoryEl.innerHTML = "";
for (let i = 0; i < previousSearch.length; i++){
    var newButton =document.createElement("button");
    newButton.textContent = previousSearch[i];
    userHistoryEl.append(newButton);
    }
}

function getAPIdata(cityName) {
    var APIKey = "5106b1dd029f01436cf1eff2fabc4fcf";
    queryURL ="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";

    fetch(queryURL)
        .then(function(response) {
            if(!response.ok) {
                console.log("error","tessssttttttttt NOT WORKING!!!")
            } else {
                return response.json();
            }
        })
        .then(function(data){
            console.log(data, "teeeeessssssssssttt IT WORKS!!!!!");
            displayData(data);
            getDailydata(data);
        })
}

function displayData(data) {
    mainDisplayEl.innerHTML= "";
    var cityCurrentinfo = data;
    var cityOGdate = data.dt
    var cityCurrentDate = moment.unix(cityOGdate).format("dddd, MMMM Do YYYY, h a")
    var thumbnailIcon = data.weather[0].icon
    console.log(thumbnailIcon)


    // need current date,icon of current weather, temp, humid,wind speed
    var cityNewDiv = document.createElement("div")
    var cityMain = document.createElement("h2");;
    var cityIcon = document.createElement("img");
    var cityTemp = document.createElement("p");
    var cityWindSpeed = document.createElement("p");
    var cityHumidity = document.createElement("p");

    cityMain.textContent = cityCurrentinfo.name + " " + cityCurrentDate;
    cityIcon.setAttribute("src", 'https://openweathermap.org/img/wn/'+thumbnailIcon+'@2x.png')
    cityTemp.textContent = "The Current Temprature is " + cityCurrentinfo.main.temp + " Fahrenheit";
    cityHumidity.textContent = "The Current Humidity is " + cityCurrentinfo.main.humidity + "%";
    cityWindSpeed.textContent = "The Current Wind Speed is " + cityCurrentinfo.wind.speed + "MPH";
    
    mainDisplayEl.append(cityNewDiv)
    cityNewDiv.append(cityMain);
    cityNewDiv.append(cityMain);
    cityNewDiv.append(cityIcon);
    cityNewDiv.append(cityTemp);
    cityNewDiv.append(cityWindSpeed);
    cityNewDiv.append(cityHumidity);
 
}

 function getDailydata(data) {
    var APIKey = "5106b1dd029f01436cf1eff2fabc4fcf";
    var lat = data.coord.lat;
    var lon = data.coord.lon;
    console.log(lat, lon)

    queryURL ="https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;

    fetch(queryURL)
        .then(function(response) {
            if(!response.ok) {
                console.log("error","NOT WORKING!!!")
            } else {
                return response.json();
            }
        })
        .then(function(data){
            console.log(data, "teeeeessssssssssttt2222222222")
            future5day(data)
        })      
}


function future5day(data){
fivedayDisplayEl.innerHTML=""
var nextDay = data.list

console.log(nextDay)
for (let i = 0; i < 40; i+=8) {
var dailyDateOG = nextDay[i].dt
var dailyDateFormat = moment.unix(dailyDateOG).format("dddd, MMMM Do YYYY, h a")
var dailyIcon = nextDay[i].weather[0].icon
var dailyTemp = nextDay[i].main.temp
var dailyHumidity = nextDay[i].main.humidity
var dailyWind = nextDay[i].wind.speed

var dailynewDiv = document.createElement("div")
var cityDate = document.createElement("h4")
var cityIcon = document.createElement("img");
var cityTemp = document.createElement("p");
var cityWindSpeed = document.createElement("p");
var cityHumidity = document.createElement("p");

cityDate.textContent = "Date: " + dailyDateFormat;
cityIcon.setAttribute("src", 'https://openweathermap.org/img/wn/'+dailyIcon+'@2x.png');
cityTemp.textContent = "The Temperature will be " + dailyTemp + " Kelvin";
cityHumidity.textContent = "The Humidity will be " + dailyHumidity + "%";
cityWindSpeed.textContent = "The Wind Speed will be " + dailyWind + "MPH";

fivedayDisplayEl.append(dailynewDiv);
dailynewDiv.append(cityDate);
dailynewDiv.append(cityIcon);
dailynewDiv.append(cityTemp);
dailynewDiv.append(cityWindSpeed);
dailynewDiv.append(cityHumidity);

}

}


init()