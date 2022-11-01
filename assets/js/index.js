var searchInputEl = document.getElementById("userInput");
var searchBtnEl = document.getElementById("searchBtn");
var mainDisplayEl = document.getElementById("primary-card");
var fivedayDisplayEl = document.getElementById("5-day-card");

searchBtnEl.addEventListener("click", userCity);

var cityName = searchInputEl.value;

function userCity (event) {
    event.preventDefault();
    if (cityName === "") {
        alert ("No Name entered to Search");
        return;
    }
    getData()
}

function getData(cityName) {
    var APIKey = "5106b1dd029f01436cf1eff2fabc4fcf";
    queryURL ="https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";

    fetch(queryURL)
        .then(function(response) {
            if(!response.ok) {
                console.log("error","tessssttttttttt 1111111111111111111")
            } else {
                return response.json();
            }
        })
        .then(function(data){
            console.log(data, "teeeeessssssssssttt 22222222222222222222")
            displayData(data)

        })
    }





