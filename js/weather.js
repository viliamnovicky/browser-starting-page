const body = document.querySelector(".body");
const weatherImage = document.querySelector(".weather__img");
const weatherLocation = document.querySelector(".weather__location");

const weatherCondition = document.querySelector(".weather__cond");
const weatherIcon = document.querySelector(".weather__icon");

const weatherTemp = document.querySelector(".weather__temp");
const weatherTempFeel = document.querySelector(".weather__temp-feel");

const weatherWind = document.querySelector(".weather__wind");
const weatherVisibility = document.querySelector(".weather__visibility");

const weatherSunrise = document.querySelector(".weather__sunrise");
const weatherSunset = document.querySelector(".weather__sunset");

const weatherMaxTemp = document.querySelector(".weather__max");
const weatherMinTemp = document.querySelector(".weather__min");

const modalWeather = document.querySelector(".modal-weather");
const modalBackWeather = document.querySelector(".modal__back--weather");
const btnCloseWeather = document.querySelector(".btn-close-weather");

const modalCondition = document.querySelector(".modal-weather__condition");
const modalToday = document.querySelector(".today");
const modalTomorrow = document.querySelector(".tomorrow");
const modalAfterTomorrow = document.querySelector(".after-tomorrow");
const modalImageWeather = document.querySelector(".modal-weather-img");

const hour8 = document.getElementById("hour-8");
const hour10 = document.getElementById("hour-10");
const hour12 = document.getElementById("hour-12");
const hour14 = document.getElementById("hour-14");
const hour16 = document.getElementById("hour-16");
const hour18 = document.getElementById("hour-18");
const hour20 = document.getElementById("hour-20");

const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const moonrise = document.getElementById("moonrise");
const moonset = document.getElementById("moonset");

const clearForecastToday = function() {
  weatherTemp.textContent = ""
  weatherTempFeel.textContent = ""
  weatherWind.textContent = ""
  weatherVisibility.textContent = ""
}

const clearForecastFuture = function() {
  weatherSunrise.textContent = ""
  weatherSunset.textContent = ""
  weatherMaxTemp.textContent = ""
  weatherMinTemp.textContent = ""
}

const getLocation = function () {
  if (navigator.geolocation) {
    function success(pos) {
      const crd = pos.coords;
      localStorage.setItem("latitude", crd.latitude);
      localStorage.setItem("longitude", crd.longitude);
      console.log(crd);
    }

    function error(err) {
      console.log(err);
      console.warn(`ERROR(${err.code}): ${err.message}`);
      //localStorage.setItem("latitude", 49.1974367);
      //localStorage.setItem("longitude", 21.6577553);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }
};

const getTodayData = function () {
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=378e1c6f3cbe4f8b8e9195724221603&q=
    ${localStorage.getItem("latitude")},
    ${localStorage.getItem("longitude")}&aqi=no`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      clearForecastToday()
      console.log(data.current);

      weatherLocation.textContent = data.location.name;
      weatherCondition.textContent = data.current.condition.text;
      weatherIcon.style.background = `url(${data.current.condition.icon}) no-repeat center`;
      weatherTemp.insertAdjacentHTML(
        "afterbegin",
        `${data.current.temp_c} °C`
      );
      weatherTempFeel.insertAdjacentHTML(
        "afterbegin",
        `${data.current.feelslike_c} °C`
      );
      weatherWind.insertAdjacentHTML(
        "afterbegin",
        `${data.current.wind_kph} km/h`
      );
      weatherVisibility.insertAdjacentHTML(
        "afterbegin",
        `${data.current.vis_km}km`
      );
      weatherCondition.textContent = data.current.condition.text;
      data.current.is_day ? 
      weatherImage.src = `./img/weatherAI/w${data.current.condition.code}.png` :
      weatherImage.src = `./img/weatherAI/w${data.current.condition.code}n.png`
    });
};

const getFutureData = function () {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=378e1c6f3cbe4f8b8e9195724221603&q=
    ${localStorage.getItem("latitude")},
    ${localStorage.getItem("longitude")}&days=4&aqi=yes&alerts=yes`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      clearForecastFuture()
      console.log(data);

      weatherSunrise.insertAdjacentHTML(
        "afterbegin",
        `${data.forecast.forecastday[0].astro.sunrise}`
      );
      weatherSunset.insertAdjacentHTML(
        "afterbegin",
        `${data.forecast.forecastday[0].astro.sunset}`
      );
      weatherMaxTemp.insertAdjacentHTML(
        "afterbegin",
        `${data.forecast.forecastday[0].day.maxtemp_c} °C`
      );
      weatherMinTemp.insertAdjacentHTML(
        "afterbegin",
        `${data.forecast.forecastday[0].day.mintemp_c} °C`
      );

      const weatherHourData = function (index) {
        modalCondition.textContent = `${data.forecast.forecastday[index].day.condition.text}`;
        modalImageWeather.src = `${data.forecast.forecastday[index].day.condition.icon}`;
        hour8.textContent = `${data.forecast.forecastday[index].hour[8].temp_c}°C`;
        hour10.textContent = `${data.forecast.forecastday[index].hour[10].temp_c}°C`;
        hour12.textContent = `${data.forecast.forecastday[index].hour[12].temp_c}°C`;
        hour14.textContent = `${data.forecast.forecastday[index].hour[14].temp_c}°C`;
        hour16.textContent = `${data.forecast.forecastday[index].hour[16].temp_c}°C`;
        hour18.textContent = `${data.forecast.forecastday[index].hour[18].temp_c}°C`;
        hour20.textContent = `${data.forecast.forecastday[index].hour[20].temp_c}°C`;
        sunrise.textContent = `${data.forecast.forecastday[index].astro.sunrise}`;
        sunset.textContent = `${data.forecast.forecastday[index].astro.sunset}`;
        moonrise.textContent = `${data.forecast.forecastday[index].astro.moonrise}`;
        moonset.textContent = `${data.forecast.forecastday[index].astro.moonset}`;

        data.current.is_day ? 
        modalWeather.style.background = `url(img/w${data.forecast.forecastday[index].day.condition.code}.jpg) no-repeat center center/cover` : 
        modalWeather.style.background = `url(img/w${data.forecast.forecastday[index].day.condition.code}n.jpg) no-repeat center center/cover`;
      };

      
      body.addEventListener("click", function (e) {
        if(e.target.closest(".weather__cont")) {
          modalBackWeather.classList.remove("hidden");
          weatherHourData(0);
        }
      });

      btnCloseWeather.addEventListener("click", function () {
        modalBackWeather.classList.add("hidden");
        modalAfterTomorrow.classList.remove("active");
        modalTomorrow.classList.remove("active");
        modalToday.classList.add("active");
      });

      modalToday.addEventListener("click", function () {
        modalAfterTomorrow.classList.remove("active");
        modalTomorrow.classList.remove("active");
        modalToday.classList.add("active");
        weatherHourData(0);
      });

      modalTomorrow.addEventListener("click", function () {
        modalAfterTomorrow.classList.remove("active");
        modalToday.classList.remove("active");
        modalTomorrow.classList.add("active");
        weatherHourData(1);
      });

      modalAfterTomorrow.addEventListener("click", function () {
        modalToday.classList.remove("active");
        modalTomorrow.classList.remove("active");
        modalAfterTomorrow.classList.add("active");
        weatherHourData(2);
      });
    });
};

getLocation();
getTodayData();
getFutureData();

export  {getTodayData,getFutureData}