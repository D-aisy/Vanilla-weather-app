function displayWeatherInformation(response) {
console.log(response)
    document.querySelector("#city-element").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#forecast").innerHTML = response.data.weather[0].description;
    //document.querySelector("#precipitation").innerHTML = response.data.
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
} 

apiKey = "364a702f202dc863a32d2f7ebc07434e"
city = "London"
units = "metric"
apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
axios.get(apiUrl).then(displayWeatherInformation);