function changeTemp(response){
  
  let temperatureElement=document.querySelector("#temperature");
  let temperature=response.data.temperature.current;
  let timeElement=document.querySelector("#time");
  let descriptionElement=document.querySelector("#description");
  let humidityElement=document.querySelector("#humidity");
  let windSpeedElement=document.querySelector("#wind-speed");
  let iconElement=document.querySelector("#icon");
  let date = new Date(response.data.time * 1000);



  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML=Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

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


function searchCity(city){
    let apiKey="3d19633teeafa6c79049ab3o334f7b44";
    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric `;
    axios.get(apiUrl).then(changeTemp) ;
}


function handleSearch(event){
    event.preventDefault();
    let searchForm=document.querySelector("#search-form-input");

    let townElement =document.querySelector("#city");
    townElement.innerHTML=searchForm.value;
    searchCity(searchForm.value);
    
    }


let searchInput=document.querySelector("#search-form");
searchInput.addEventListener("submit", handleSearch);

function formatDate(timestamp){
  let date=new Date(timestamp * 1000);
  let days=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}



function getForecast(city){
  let apiKey="3d19633teeafa6c79049ab3o334f7b44";
  let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response){
 let forecastHTML="";

  response.data.daily.forEach(function (day, index) {
    if(index<5){
  
   forecastHTML=
  forecastHTML+` <div class="weather-forecast" >
  <div class="weather-forecast-date">${formatDate(day.time)}</div>
  <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
   <div class="weather-forecast-temperature">
   <div class="weather-forecast-temperature">
      <strong>${Math.round(day.temperature.maximum)}°</strong> </div>
      <div class="weather-forecast-temperature"> ${Math.round(day.temperature.minimum)}°</div> 
</div>
</div>`;

}

  });


let forecastElement=document.querySelector("#forecast");
forecastElement.innerHTML=forecastHTML;
}
displayForecast();




