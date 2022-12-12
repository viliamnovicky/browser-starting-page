const weatherLocation = document.getElementById("location");
const weatherCondition = document.getElementById("weath-cond");
const weatherIcon = document.getElementById("weath-icon");

const weatherTemp = document.getElementById("weath-temp");
const weatherTempFeel = document.getElementById("weath-temp-feel");

const weatherWind = document.getElementById("weath-wind");
const weatherVisibility = document.getElementById("weath-vis");

const weatherSunrise = document.getElementById("weath-sunrise");
const weatherSunset = document.getElementById("weath-sunset");

const weatherMaxTemp = document.getElementById("weath-max");
const weatherMinTemp = document.getElementById("weath-min");

const weather = document.querySelector(".weather");
const modalWeather = document.querySelector(".modal-weather");
const modalBackWeather = document.querySelector(".modal-back-weather");
const btnCloseWeather = document.querySelector(".btn-close-weather");

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

const codes = [
  1000, 1003, 1006, 1009, 1030, 1063, 1066, 1069, 1072, 1087, 1114, 1117, 1135,
  1147, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201,
  1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1240, 1243, 1246, 1249,
  1252, 1255, 1258, 1261, 1264, 1273, 1276, 1279, 1282,
];

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

      weatherLocation.textContent = data.location.name;
      weatherCondition.textContent = data.current.condition.text;
      weatherIcon.style.background = `url(${data.current.condition.icon}) no-repeat center`;
      weatherTemp.insertAdjacentHTML(
        "afterbegin",
        `<i class="fas fa-thermometer-full"></i> ${data.current.temp_c} °C`
      );
      weatherTempFeel.insertAdjacentHTML(
        "afterbegin",
        `<i class="fas fa-temperature-high"></i> ${data.current.temp_c} °C`
      );
      weatherWind.insertAdjacentHTML(
        "afterbegin",
        `<i class="fas fa-wind"></i> ${data.current.wind_dir}`
      );
      weatherVisibility.insertAdjacentHTML(
        "afterbegin",
        `<i class="fas fa-eye"></i> ${data.current.vis_km}km`
      );
      weatherCondition.textContent = data.current.condition.text;
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

      weatherSunrise.insertAdjacentHTML(
        "afterbegin",
        `<i class="fas fa-arrow-up"></i><i class="fas fa-sun"></i> ${data.forecast.forecastday[0].astro.sunrise}`
      );
      weatherSunset.insertAdjacentHTML(
        "afterbegin",
        `<i class="fas fa-arrow-down"></i><i class="fas fa-sun"></i> ${data.forecast.forecastday[0].astro.sunset}`
      );
      weatherMaxTemp.insertAdjacentHTML(
        "afterbegin",
        `<i class="fas fa-arrow-up"></i>${data.forecast.forecastday[0].day.maxtemp_c} °C`
      );
      weatherMinTemp.insertAdjacentHTML(
        "afterbegin",
        `<i class="fas fa-arrow-down"></i>${data.forecast.forecastday[0].day.mintemp_c} °C`
      );

      const weatherHourData = function (index) {
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

        for (let i = 0; i < codes.length; i++) {
          if (
            codes[i] === data.forecast.forecastday[index].day.condition.code
          ) {
            modalWeather.style.background = `url(img/w${codes[i]}.jpg) no-repeat center center/cover`;
            console.log(codes[i]);
          }
        }
      };

      weather.addEventListener("click", function () {
        modalBackWeather.classList.remove("hidden");
        weatherHourData(0);
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