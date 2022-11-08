var searchInputEl = document.getElementById("userInput");
var searchBtnEl = document.getElementById("searchBtn");
var mainDisplayEl = document.getElementById("primary-card");
var fivedayDisplayEl = document.getElementById("5-day-card");
var userHistoryEl = document.getElementById("searchList")
var searchData = [];
var previousSearch = []; 

searchBtnEl.addEventListener("click", userCity);


function init(){
    var storedSearches = JSON.parse(localStorage.getItem("cityKey"));
    if (storedSearches !== null) {
        storedSearches = previousSearch
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
    var newli =document.createElement("li");
    newli.textContent = previousSearch[i];
    userHistoryEl.append(newli);
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
            console.log(data, "teeeeessssssssssttt IT WORKS!!!!!")
            displayData(data)

        })
    }
 function displayData(data) {
    mainDisplayEl.innerHTML= "";
    var cityCurrentinfo = data;
    var cityOGdate = data.dt
    var cityCurrentDate = moment.unix(cityOGdate).format("dddd, MMMM Do YYYY, h a")
    var thumbnailIcon = data.weather[0].icon


    // need current date,icon of current weather, temp, humid,wind speed
    var newH2 = document.createElement("h2");
    var newImg = document.createElement("img");
    var newPtag = document.createElement("p");

    var cityMain = newH2;
    var cityIcon = newImg;
    var cityTemp = newPtag;
    var cityWindSpeed = newPtag;
    var cityHumidity = newPtag;

    cityMain.textContent = cityCurrentinfo.name + " " + cityCurrentDate;
    cityIcon.setAttribute("src", "")
    cityTemp.textContent = "The Current Temprature is " + cityCurrentinfo.main.temp + "Fahrenheit";
    cityHumidity.textContent = "The Current Humidity is " + cityCurrentinfo.main.cityHumidity + "%";
    cityWindSpeed.textContent = "The Current Wind Speed is " + cityCurrentinfo.wind.speed + "MPH";
    
    mainDisplayEl.append(cityMain);
    mainDisplayEl.append(cityTemp);
    mainDisplayEl.append(cityWindSpeed);
    mainDisplayEl.append(cityHumidity);
    mainDisplayEl.append(cityIcon);
    

    // future dates needs same as curremt day
 }