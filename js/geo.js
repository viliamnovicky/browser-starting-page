import {getTodayData, getFutureData} from "./weather.js"

const results = document.querySelector(".search__city--results")
let citiesArray = []

const cities = function(location) {
    fetch(`../data/cities.json`)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        citiesArray = []
        results.innerHTML = ""
        results.classList.remove("hidden")
        data.forEach(city => {
            if(city.name.toLowerCase() === location.toLowerCase()) {
                results.insertAdjacentHTML("beforeend",
                `<p class="search__city--result" id = "${citiesArray.length}">${city.name}, ${city.country}</p>`)
                citiesArray.push(city)
            }
        });
        if(cities.length === 0) {
            results.insertAdjacentHTML("beforeend",
        `<p class="search__city--result no-match">No results</p>`)
        }
    })
}

const searchCityCont = document.querySelector(".search__city")
const searchCityResults = document.querySelector(".search__city--results")
const searchCityBTN = document.querySelector(".search__city--btn")
const searchCityInput = document.querySelector(".search__city--input")

searchCityBTN.addEventListener("click", function() {
    const searchedCity = searchCityInput.value
    cities(searchedCity)
})

const showSearchBarBTN = document.querySelector(".show-search-bar")
const closeSearchBarBTN = document.querySelector(".btn__close--search")

showSearchBarBTN.addEventListener("click", function() {
    console.log("fuck");
  searchCityCont.classList.remove("hidden")
  searchCityCont.style.top = "15rem"
  showSearchBarBTN.classList.add("hidden")
})

closeSearchBarBTN.addEventListener("click", function() {
console.log(citiesArray);
  searchCityCont.classList.add("hidden")
  searchCityCont.style.top = "2vh"
  showSearchBarBTN.classList.remove("hidden")
  results.classList.add("hidden")
  results.innerHTML = ""
  searchCityInput.value = ""
  
})

searchCityResults.addEventListener("click", function(e) {
    const city = e.target.closest(".search__city--result")
    console.log(city);
    localStorage.setItem("latitude", citiesArray[city.id].lat);
      localStorage.setItem("longitude", citiesArray[city.id].lng);
      getTodayData()
      getFutureData()
      
})

searchCityResults.addEventListener("keydown", function(e) {
    const city = e.target.closest(".search__city--result")
    if(e.keycode === 13) {
        console.log(city);
        localStorage.setItem("latitude", citiesArray[city.id].lat);
          localStorage.setItem("longitude", citiesArray[city.id].lng);
          getTodayData()
          getFutureData()
    }   
})





