let date = new Date();
let currentDate = document.querySelector("#current-date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = days[date.getDay()];
let currentHour = date.getHours();
if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
let currentMinutes = date.getMinutes();
if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

let formattedDate = `${currentDay}, ${currentHour}:${currentMinutes}`;
currentDate.innerHTML = formattedDate;

function formatHours(timestamp){
let date = new Date(timestamp);
let currentHour = date.getHours();
if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
let currentMinutes = date.getMinutes();
if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

return `${currentHour}:${currentMinutes}`;
}

function displayData(response){
document.querySelector("#city").innerHTML=response.data.name;
document.querySelector(".current-temperature").innerHTML=Math.round(response.data.main.temp);
document.querySelector(".weather-description").innerHTML = response.data.weather[0].main;
document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`;
document.querySelector("#wind").innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

iconElement.setAttribute("alt", response.data.weather[0].description);

celciusTemperature = response.data.main.temp;
  
}
function displayForecast(response){
  console.log(response.data);
  let forecastElement= document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for(let index = 0; index<5; index ++){
    forecast = response.data.list[index];
    forecastElement.innerHTML +=
  `<div class="col">
   <h3>
     ${formatHours(forecast.dt*1000)}
    </h3> 

    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="Clear" id="forecast-icon">
                
    <div class="temperature">
      ${Math.round(forecast.main.temp)}°
    </div>
    </div>`;
  }
    
}

function search(city){
let apiKey = "24e8153e9c8eb48f21299cbc6a60616a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

   axios.get(apiUrl).then(displayData);

  apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);

}

function displayCity(event) {
  event.preventDefault();  
  let city = document.querySelector("#search-text-input").value;
  search(city);
  
  }
  
let searchCityInput = document.querySelector("#search-city");
searchCityInput.addEventListener("submit", displayCity);

function currentPosition(position) {
  console.log(position);
  let apiKey = "24e8153e9c8eb48f21299cbc6a60616a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(getCurrentPosition);
}

function getCurrentPosition(event) {
 event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition); 
  
}

function  displayFahrenheitTemperature(event){
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature= (celciusTemperature*9)/5+32;
  let currentTemperature = document.querySelector(".current-temperature");
  currentTemperature.innerHTML= Math.round(fahrenheitTemperature);

}

function  displayCelciusTemperature(event){
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector(".current-temperature");
  currentTemperature.innerHTML= Math.round(celciusTemperature);
}

let celciusTemperature = null;

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentPosition);

let fahrenheitLink= document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink= document.querySelector("#celcius-link")
celciusLink.addEventListener("click", displayCelciusTemperature);

search("Paris");
