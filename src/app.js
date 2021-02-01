function currentDate(timestamp) {
    let date = new Date(timestamp)

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ]
    let day = days[date.getDay()]
    return `${day} ${formatHours(timestamp)}`
}

function formatHours (timestamp) {
    let date = new Date(timestamp)
    let hours = date.getHours()
        if (hours < 10) {
            hours = `0${hours}`
        }
    let minutes = date.getMinutes()
    if (minutes < 10) {
        minutes = `0${minutes}`
    }

    return `${hours}:${minutes}`
}

function displayWeatherInformation(response) {
    document.querySelector("#city-element").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#forecast").innerHTML = response.data.weather[0].description;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#current-date").innerHTML = currentDate(response.data.dt * 1000)
    document.querySelector("#weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    document.querySelector("#weather-icon").setAttribute("alt", response.data.weather[0].description)

    celsius = response.data.main.temp;

} 

function displayForecast(response){
    let forecastElement = document.querySelector("#row-forecast")
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
        forecastElement.innerHTML += 
        `<div class="col-2" >
                    <h6 class="time">
                        ${formatHours(forecast.dt * 1000)}
                    </h6>
                    <img
                    src= "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
                    class = "forecast-image"
                  />
                  <div class="forecast-temperature">
                     <strong>${Math.round(forecast.main.temp_max)}° 
                      | 
                      ${Math.round(forecast.main.temp_min)}°
                      </strong>
                  </div>
                </div>
                `;
    }
}

function search(city) {
apiKey = "364a702f202dc863a32d2f7ebc07434e"
units = "metric"
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
axios.get(apiUrl).then(displayWeatherInformation);

apiUrl = `https:api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
axios.get(apiUrl).then(displayForecast);
}

function searchCity(event) {
    event.preventDefault()
    let cityInputValue = document.querySelector("#search-city-input")
    search(cityInputValue.value);
}

function displayFarenheitTemperature(event) {
    event.preventDefault()
    let temperatureElement = document.querySelector("#temperature")
    let displayFarenheit = (celsius * 9/5) + 32;
    temperatureElement.innerHTML = Math.round(displayFarenheit)
}
function displayCelsiusTemperature(event) {
    event.preventDefault()
    let temperatureElement = document.querySelector("#temperature")
    let displayCelsius = celsius;
    temperatureElement.innerHTML = Math.round(displayCelsius);
}

search("London")

let celsius = null

let searchForm = document.querySelector("#search-form")
searchForm.addEventListener("click", searchCity);

let farenheitLink = document.querySelector("#farenheit-link")
farenheitLink.addEventListener("click", displayFarenheitTemperature)

let celsiusLink = document.querySelector("#celsius-link")
celsiusLink.addEventListener("click", displayCelsiusTemperature)