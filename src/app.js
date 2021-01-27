function currentDate(timestamp) {
    let date = new Date(timestamp)
    let hours = date.getHours()
        if (hours < 10) {
            hours = `0${hours}`
        }
    let minutes = date.getMinutes()
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
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
    return `${day} ${hours}:${minutes}`
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

function search(city) {
apiKey = "364a702f202dc863a32d2f7ebc07434e"
units = "metric"
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
axios.get(apiUrl).then(displayWeatherInformation);
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