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
let h2 = document.querySelector("h2");
h2.innerHTML = `${response.data.name}`;
let tempCelcius= Math.round(response.data.main.temp);
let cityTemp = document.querySelector(".current-temperature");
cityTemp.innerHTML = `${tempCelcius}`;
let weatherDescription = document.querySelector(".weather-description");
weatherDescription.innerHTML= response.data.weather[0].main;


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

function getCurrentPosition(event) {
  event.preventDefault(); 
  navigator.geolocation.getCurrentPosition(currentPosition);
  let currentLocation = document.querySelector("h2");
  currentLocation.innerHTML =  response.data.name;
  let tempCelcius= Math.round(response.data.main.temp);
let cityTemp = document.querySelector(".current-temperature");
cityTemp.innerHTML = `${tempCelcius}`;
let weatherDescription = document.querySelector(".weather-description");
weatherDescription.innerHTML= response.data.weather[0].main;
  
}

function currentPosition(position) {
  console.log(position);
  let apiKey = "24e8153e9c8eb48f21299cbc6a60616a";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(getCurrentPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentPosition);

search("Kyoto");
