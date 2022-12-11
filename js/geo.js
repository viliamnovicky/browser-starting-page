const results = document.querySelector(".search__city--results")

const cities = function(location) {
    fetch(`../data/cities.json`)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        let cities = []
        data.forEach(city => {
            if(city.name.toLowerCase() === location.toLowerCase()) {
                results.insertAdjacentHTML("beforeend",
                `<p class="search__city--result">${city.name}, ${city.country}</p>`)
                cities.push(city)

                if(cities.length > 0) {
                    results.classList.remove("hidden")
                }
            }
        });
    })
}

const searchCityBTN = document.querySelector(".search__city--btn")
const searchCityInput = document.querySelector(".search__city--input")

searchCityBTN.addEventListener("click", function() {
    const searchedCity = searchCityInput.value
    cities(searchedCity)
})

const showSearchBarBTN = document.querySelector(".show-search-bar")
const searchCityCont = document.querySelector(".search__city")
const closeSearchBarBTN = document.querySelector(".btn__close--search")

showSearchBarBTN.addEventListener("click", function() {
  searchCityCont.classList.remove("hidden")
  searchCityCont.style.top = "15rem"
  showSearchBarBTN.classList.add("hidden")
})

closeSearchBarBTN.addEventListener("click", function() {
  searchCityCont.classList.add("hidden")
  searchCityCont.style.top = "2vh"
  showSearchBarBTN.classList.remove("hidden")
  results.classList.add("hidden")
  results.innerHTML = ""
  searchCityInput.value = ""
  
})



