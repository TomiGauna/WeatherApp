let currentCity = 'Córdoba';
let units = 'metric';

let city = document.querySelector('.weather__city');
let datetime = document.querySelector('.weather__datetime');
let weatherForecast = document.querySelector('.weather__forecast');
let weatherTemp = document.querySelector('.weather__temperature');
let weatherIcon = document.querySelector('.weather__icon');
let minmax = document.querySelector('.weather__minmax');
let realFeel = document.querySelector('.weather__realfeel');
let humidity = document.querySelector('.weather__humidity');
let wind = document.querySelector('.weather__wind');
let pressure = document.querySelector('.weather__pressure');
let searchContainer = document.querySelector('.weather__search');
let celsiusUnit = document.querySelector('.weather__unit_celsius');
let fahrenheitUnit = document.querySelector('.weather__unit_fahrenheit');
let bothUnits = document.querySelectorAll('.unit');

bothUnits.forEach(unit => {
    unit.addEventListener('click', () => {
        document.querySelector('.active')?.classList.remove('active');
        unit.classList.add('active');
    });
});


searchContainer.addEventListener('submit', ev => {
    let searchForm = document.querySelector('.weather__searchform');
    ev.preventDefault();
    currentCity = searchForm.value;
    getWeather();
    searchForm.value = '';
});

celsiusUnit.addEventListener('click', () => {
    if (units !== 'metric') {
        units = 'metric';
        getWeather()
    };
});

fahrenheitUnit.addEventListener('click', () => {
    if (units !== 'imperial') {
        units = 'imperial';
        getWeather()
    };
});

function convertTimestamp(timestamp, timezone){
    const convertTimezone = timezone / 3600;
    const date = new Date(timestamp*1000);
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: `Etc/GMT${convertTimezone >= 0 ? '-' : '+'}${Math.abs(convertTimezone)}`,
        hour12: true
    }
    return date.toLocaleString('en-US', options)
}

function turnToFullName(country){
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    return regionNames.of(country)
}

function getWeather() {
    const apiKey = 'f82f9c7c92006bf36fbe712768ad01a5'
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data);
            city.innerHTML = `${data.name}, ${turnToFullName(data.sys.country)}`;
            datetime.innerHTML = convertTimestamp(data.dt, data.timezone);
            weatherForecast.innerHTML = `<p>${data.weather[0].main}<p>`;
            weatherTemp.innerHTML = `${data.main.temp.toFixed()}&#176`;
            weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">`;
            minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p> <p>Max: ${data.main.temp_max.toFixed()}&#176`;
            realFeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
            humidity.innerHTML = `${data.main.humidity.toFixed()}%`;
            wind.innerHTML = `${data.wind.speed} ${units === 'imperial' ? 'mph' : 'm/s'}`;
            pressure.innerHTML = `${data.main.pressure.toFixed()} hPa`;
        })

};

document.body.addEventListener('load', getWeather());