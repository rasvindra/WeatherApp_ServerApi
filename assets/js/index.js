var searchInputEl = document.getElementById("userInput");
var searchBtnEl = document.getElementById("searchBtn");
var mainDisplayEl = document.getElementById("primary-card");
var fivedayDisplayEl = document.getElementById("5-day-card");
var searchData = [];

searchBtnEl.addEventListener("click", userCity);



function userCity (event) {
    event.preventDefault();
    var cityName = searchInputEl.value;
    if (cityName === "") {
        alert ("No Name entered to Search");
        return;
    }

    getAPIdata(cityName)
}

function getAPIdata(cityName) {
    var APIKey = "5106b1dd029f01436cf1eff2fabc4fcf";
    queryURL ="https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";

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
