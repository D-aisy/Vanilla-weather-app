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
} 

apiKey = "364a702f202dc863a32d2f7ebc07434e"
city = "Sao Paulo"
units = "metric"
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
axios.get(apiUrl).then(displayWeatherInformation);