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
let currentMinutes = date.getMinutes();

let formattedDate = `${currentDay}, ${currentHour}: ${currentMinutes}`;
currentDate.innerHTML = formattedDate;



function displayData(response){
document.querySelector("#city").innerHTML=response.data.name;
document.querySelector(".current-temperature").innerHTML=Math.round(response.data.main.temp);
document.querySelector(".weather-description").innerHTML = response.data.weather[0].main;
document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`;
document.querySelector("#wind").innerHTML = `Wind: ${Math.round(response.data.wind.speed)}m/s`;
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

iconElement.setAttribute("alt", response.data.weather[0].description);
  
}

function search(city){
let apiKey = "24e8153e9c8eb48f21299cbc6a60616a";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

   axios.get(apiUrl).then(displayData);
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


let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentPosition);

search("Paris");
