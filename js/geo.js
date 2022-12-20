import { getTodayData, getFutureData } from "./weather.js";

const searchCityCont = document.querySelector(".search__city");
const searchCityResults = document.querySelector(".search__city--results");
const searchCityBTN = document.querySelector(".search__city--btn");
const searchCityInput = document.querySelector(".search__city--input");
const showSearchBarBTN = document.querySelector(".btn__show-search-bar");
const closeSearchBarBTN = document.querySelector(".btn__close--search");
const results = document.querySelector(".search__city--results");

let citiesArray = [];

const cities = function (location) {
  fetch(`../data/cities.json`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      citiesArray = [];
      results.innerHTML = "";
      data.map((city) =>
        city.name.toLowerCase() === location.toLowerCase()
          ? citiesArray.push(city)
          : citiesArray === citiesArray
      );

      citiesArray.length === 0
        ? results.insertAdjacentHTML(
            "beforeend",
            `<p class="search__city--result no-match">No results</p>`
          )
        : citiesArray.map((city, i) =>
            results.insertAdjacentHTML(
              "beforeend",
              `<p class="search__city--result" id = "${i}">${city.name}, ${city.country}</p>`
            )
          );

      results.classList.remove("hidden");
    });
};

searchCityBTN.addEventListener("click", function () {
  const searchedCity = searchCityInput.value;
  cities(searchedCity);
});


showSearchBarBTN.addEventListener("click", function () {
  console.log("fuck");
  searchCityCont.classList.remove("hidden");
  searchCityCont.style.top = "24rem";
  showSearchBarBTN.classList.add("hidden");
});

closeSearchBarBTN.addEventListener("click", function () {
  console.log(citiesArray);
  searchCityCont.classList.add("hidden");
  searchCityCont.style.top = "2vh";
  showSearchBarBTN.classList.remove("hidden");
  results.classList.add("hidden");
  results.innerHTML = "";
  searchCityInput.value = "";
});

searchCityResults.addEventListener("click", function (e) {
  const city = e.target.closest(".search__city--result");
  console.log(city);
  localStorage.setItem("latitude", citiesArray[city.id].lat);
  localStorage.setItem("longitude", citiesArray[city.id].lng);
  getTodayData();
  getFutureData();
});
