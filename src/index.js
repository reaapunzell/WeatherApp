const weatherIcons = {
  "clear-sky-day": "src/images/Clear%20Sky%20Day.png",
  "clear-sky-night": "src/images/Clear%20Sky%20Night.png",
  "few-clouds-day": "src/images/Few%20Clouds%20Day-1.png",
  "few-clouds-night": "src/images/Few%20Clouds%20Night.png",
  "scattered-clouds-day": "src/images/Scattered%20Clouds%20Day.png",
  "scattered-clouds-night": "src/images/Scattered%20Clouds%20Night.png",
  "broken-clouds-day": "src/images/Broken%20Clouds%20Day.png",
  "broken-clouds-night": "src/images/Broken%20Clouds%20Night.png",
  "shower-rain-day": "src/images/Shower%20Rain%20Day.png",
  "shower-rain-night": "src/images/Shower%20Rain%20Night.png",
  "rain-day": "src/images/Rain%20day.png",
  "rain-night": "src/images/Rain%20Night.png",
  "thunderstorm-day": "src/images/Thunderstorm%20day-1.png",
  "thunderstorm-night": "src/images/Thunderstorm%20night.png",
  "snow-day": "src/images/Snow%20day.png",
  "snow-night": "src/images/Snow%20night.png",
  "mist-day": "src/images/Mist%20day.png",
  "mist-night": "src/images/Mist%20night.png",
};

function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temperature);

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;

    let countryElement = document.querySelector("#country");
    countryElement.innerHTML = response.data.country;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${response.data.wind.speed}km/h`;

    let dayElement = document.querySelector("#day");
    let date = new Date(response.data.time * 1000);
    dayElement.innerHTML = formatDate(date);

    let iconKey = response.data.condition.icon;
    let iconElement = document.querySelector("#icon");
    if (weatherIcons[iconKey]) {
        iconElement.innerHTML = `<img src="${weatherIcons[iconKey]}" class="weather-app-icon" alt="${response.data.condition.description}"/>`;
    } else {
        console.error(`Icon key ${iconKey} not found in weatherIcons object`);
        iconElement.innerHTML = `<img src="default-icon.png" class="weather-app-icon" alt="${response.data.condition.description}"/>`; // Fallback icon
    }

    
    getForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
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

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    let apiKey = "7f9d9cf0474030cet59a45f7coc640b0";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
}

function getForecast(city) {
    let apiKey = `7f9d9cf0474030cet59a45f7coc640b0`;
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {


  let forecastHtml = "";
  
  response.data.daily.forEach(function (day, index) {
    if (index < 5){
      forecastHtml = forecastHtml + ` 
      <div class="forecast-day">
      <div class="forecast-date">${formatDay(day.time)}</div>
  
      <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
      <div class="forecast-temperatures">
          <div class="forecast-temperature">
              <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="forecast-temperature">${Math.round(day.temperature.minimum)}º</div>
      </div>
      </div>
      `;
    }
      });
  
  
  let forecastElement = document.querySelector('#forecast');
  forecastElement.innerHTML = forecastHtml;
  }

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg");
