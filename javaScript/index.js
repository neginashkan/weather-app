let currentBtn = document.getElementById("current-button");
let searchFormEl = document.querySelector("#search-form");
let timeEl = document.getElementById("time");

function currentTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let Hour = date.getHours();
  let minute = date.getMinutes();
  let temporarilyHour = Hour;
  let temporarilyMinute = minute;
  if (Hour < 10) {
    temporarilyHour = `0${Hour}`;
  }
  if (minute < 10) {
    temporarilyMinute = `0${minute}`;
  }
  return `${day} ${temporarilyHour}:${temporarilyMinute}`;
}

timeEl.innerHTML = currentTime(new Date());

// let celsius
// ------------user searches for a city --------------

function showUserSearch(response) {
  let cityEl = document.querySelector("#city");
  let humidityEl = document.getElementById("humidity");
  let windEl = document.getElementById("wind");
  let descriptionEl = document.getElementById("description");
  let temperatureEl = document.querySelector("#temperature");
  cityEl.innerHTML = response.data.name;
  humidityEl.innerHTML = response.data.main.humidity;
  windEl.innerHTML = Math.round(response.data.wind.speed);
  descriptionEl.innerHTML = response.data.weather[0].description;
  temperatureEl.innerHTML = Math.round(response.data.main.temp);
}
function userSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "3ae41ca5badf1e113a0c401393a6ee78";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showUserSearch);
}
searchFormEl.addEventListener("submit", userSearch);

// -------------- Current Location button----------------
function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3ae41ca5badf1e113a0c401393a6ee78";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showUserSearch);
}
function currentLocation() {
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}
currentBtn.addEventListener("click", currentLocation);
