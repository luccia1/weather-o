function changeTemp(response){
  
  let temperatureElement=document.querySelector("#temperature");
  let temperature=response.data.temperature.current;
  let timeElement=document.querySelector("#time");
  let descriptionElement=document.querySelector("#description");
  let humidityElement=document.querySelector("#humidity");
  let windElement=document.querySelector("#wind-speed");
  let iconElement=document.querySelector("#icon");
  let date = new Date(response.data.time * 1000);



  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML=Math.round(temperature);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

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
    let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey} `;
    axios.get(apiUrl) .then(changeTemp);
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



