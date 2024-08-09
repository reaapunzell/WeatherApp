function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temperature);

    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;

    let countryElement = document.querySelector("#country");
    countryElement.innerHTML = response.data.country;

    let humidityElement = document.querySelector("#")



}

function searchCity(city){
 //make api call and update the app
 let apiKey = "7f9d9cf0474030cet59a45f7coc640b0";
 let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");    
   

    searchCity(searchInput.value);
}


let searchFormElement = document.querySelector("#search-form");

searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Johannesburg");
