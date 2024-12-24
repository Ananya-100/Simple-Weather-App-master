const api = {
  key: "86c245af51507eaae4d2b5b3acf48836",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults(weather) {
  // Location
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  // Date
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  // Temperature
  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  // Weather condition (lines 33-39 seen in snippet)
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

  // Humidity
  let humidity_el = document.querySelector('.current .humidity');
  humidity_el.innerText = `Humidity: ${weather.main.humidity}%`;

  // Wind
  let wind_el = document.querySelector('.current .wind');
  wind_el.innerText = `Wind: ${weather.wind.speed} m/s`;

  // Rainfall
  let rainfall_el = document.querySelector('.current .rainfall');
  rainfall_el.innerText = `Rainfall: ${weather.rain && weather.rain['1h'] ? weather.rain['1h'] : 0} mm`;

  // Sunrise
  let sunrise_el = document.querySelector('.current .sunrise');
  let sunriseTime = new Date(weather.sys.sunrise * 1000);
  sunrise_el.innerText = `Sunrise: ${sunriseTime.toLocaleTimeString()}`;

  // Sunset
  let sunset_el = document.querySelector('.current .sunset');
  let sunsetTime = new Date(weather.sys.sunset * 1000);
  sunset_el.innerText = `Sunset: ${sunsetTime.toLocaleTimeString()}`;
}

function dateBuilder(d) {
  let months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}