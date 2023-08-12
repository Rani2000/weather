const apiKey = "f5219436cfb55eb71e48c6af04b3519e";
const form = document.getElementsByTagName('form')[0];
const search = document.getElementById('search');
const weather = document.getElementById('weather');
const details = document.getElementById('details');

const getWeather = async (url) => {
    weather.innerHTML = `<div class="left">
    <img class="skeleton skeleton-img margin-bottom"></img>
    <p class="skeleton skeleton-text margin-bottom"></p>
    <p class="skeleton skeleton-text"></p>
    </div>
    <div class="right">
        <p class="skeleton skeleton-text margin-bottom"></p>
        <p class="skeleton skeleton-text"></p>
    </div>`;
    details.innerHTML = `
    <h2 class="skeleton skeleton-title margin-bottom"></h2>
    <div id="info">
        <div class="humidity">
            <h3 class="skeleton skeleton-title margin-bottom"></h3>
            <p class="skeleton skeleton-text"></p>
        </div>
        <div class="windspeed">
            <h3 class="skeleton skeleton-title margin-bottom"></h3>
            <p class="skeleton skeleton-text"></p>
        </div>
        <div class="pressure">
            <h3 class="skeleton skeleton-title margin-bottom"></h3>
            <p class="skeleton skeleton-text"></p>
        </div>
        <div class="winddirection">
            <h3 class="skeleton skeleton-title margin-bottom"></h3>
            <p class="skeleton skeleton-text"></p>
        </div>
    </div>`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return showWeather(data);
    }
    catch {
        weather.innerHTML = "Sorry city not found &#128542;";
        details.innerHTML = "";
    }
}

getWeather(`https://api.openweathermap.org/data/2.5/weather?q=ludhiana&appid=${apiKey}&units=metric`);

function userLocation() {
    navigator.geolocation.getCurrentPosition(success, error);
    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
    }
    function error() {
        console.log("You should allowed to fetch your location automatically.");
    }
}

userLocation();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWeather(`https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=${apiKey}&units=metric`);
    search.value = "";
})

const showWeather = (data) => {
    weather.innerHTML = `<div class="left">
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weathericon">
    <p>${data.weather[0].description}</p>
    <p>${data.main.temp_max}/${data.main.temp_min}<sup>&#8451;</sup></p>
    </div>
    <div class="right">
        <h1>${data.main.temp}<sup>&#8451;</sup></h1>
        <p>${data.name}, ${data.sys.country}</p>
    </div>`;

    details.innerHTML = `
    <h2>Details</h2>
    <hr>
    <div id="info">
        <div class="humidity">
        <i class="fa fa-solid fa-temperature-low"></i>
            <h3>Humidity</h3>
            <p>${data.main.humidity} %</p>
        </div>
        <div class="windspeed">
            <i class="fa fa-solid fa-wind"></i>
            <h3>Wind speed</h3>
            <p>${data.wind.speed} meter/sec</p>
        </div>
        <div class="pressure">
            <i class="fa fa-solid fa-stopwatch"></i>
            <h3>Pressure</h3>
            <p>${data.main.pressure} hPa</p>
        </div>
        <div class="winddirection">
            <i class="fa fa-solid fa-compass"></i>
            <h3>Wind direction</h3>
            <p>${data.wind.deg} &deg;</p>
        </div>
    </div>`;
}




