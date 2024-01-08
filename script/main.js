const apiKey = 'fa46ad611512230d302fada95b54016a';
const myRequest = new XMLHttpRequest();
const get5DaysTemp = new XMLHttpRequest();
let alertAppended = false; // Flag to track whether the alert has been appended

const getDefaultCityWeather = () => {
    const defaultCity = 'london';
    myRequest.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&appid=${apiKey}&lang=en`);
    myRequest.send();
};

const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                myRequest.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=en`);
                myRequest.send();
            }
        );
    } else {
        getDefaultCityWeather(); 
    }
};

myRequest.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        const jsonData = JSON.parse(myRequest.responseText);
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${jsonData.coord.lat}&lon=${jsonData.coord.lon}&appid=${apiKey}`;
        console.log(jsonData);
        // get 5 days temp and date
        get5DaysTemp.open('GET', apiUrl);
        get5DaysTemp.onreadystatechange = function () {
            if(get5DaysTemp.readyState === 4 && get5DaysTemp.status === 200) {
                const daysTemps = JSON.parse(get5DaysTemp.responseText);
                alertAppended = false;
                updateUI(jsonData,daysTemps)
            }
        }
        get5DaysTemp.send()
    } else if (this.status === 404  && !alertAppended) {
        appendAlert();
    }
}

// alert
const appendAlert = () => {
    const weatherApp = document.querySelector('.weather-app');
    const alert = document.createElement('div');
    const alertPar = document.createElement('p');

    alert.classList.add('alert-content');
    alertPar.classList.add('alert-msg');
    alertPar.innerText = "Please provide a City or State that is valid and recognized. Thank you!";
    
    weatherApp.appendChild(alert);
    alert.appendChild(alertPar);
    alert.classList.add('show');

    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => {
            alert.remove();
        }, 800);
    }, 5000); 

    alertAppended = true;

};



const updateUI = (jsonData, daysTemps) => {
    // mobile (close humberger menu when I submit the search)

    // Get city name 
    const cityNameElement = document.querySelector('#city-name');
    cityNameElement.innerText = jsonData.name;

    // current temp
    let temperatureElements = document.querySelector('.temp');
    
    let temperatureInCelsius = Math.round(jsonData.main.temp - 273.15);
        temperatureElements.innerText = `${temperatureInCelsius}`; 

    // // change weather background 

    // const weatherBg = document.querySelector('.tod-weather')

    
    // if(jsonData) {
    //     const getWeatherDescription = jsonData.weather[0].main;

    //     switch(getWeatherDescription) {
    //         case 'Rain':
    //             weatherBg.style.background = 'linear-gradient(#5D6268, #464C54)'
    //             break;
    //         case 'Clear':
    //             weatherBg.style.background = 'linear-gradient(#2B50A3, #26459D)'
    //             break;
    //         case 'Thunderstorm':
    //             weatherBg.style.background = 'linear-gradient(#464C54, #5D6268)'
    //             break;
    //         case 'Clouds':
    //             weatherBg.style.background = 'linear-gradient(#5E778E, #495969)'
    //             break;
    //         case 'Snow':
    //             weatherBg.style.background = 'linear-gradient(#238481, #1a6b6b)'
    //             break;
    //         case 'Drizzle':
    //             weatherBg.style.background = '#4E6072'
    //             break;
    //         default:
    //             weatherBg.style.background = 'linear-gradient(#2B50A3, #26459D)'
    //             break;
    // }
    // } else if (window.screen.width <= 837) {
    //     weatherBg.style.background = 'red'
    // }

    // weather description 
    const weatherDescElement = document.querySelector('.weather-desc');
    weatherDescElement.innerText = jsonData.weather[0].description;

    // sunset / sunrise

    const sunset = document.getElementById('sunset');
    const sunsetDate = new Date(jsonData.sys.sunset * 1000)
    const sunsetHour = sunsetDate.getHours();
    const minutes = sunsetDate.getMinutes();
    const formattedHours = sunsetHour < 10 ? `0${sunsetHour}` : sunsetHour;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const getDate = `${formattedHours}:${formattedMinutes}`
    sunset.innerText = getDate;

    const sunrise = document.getElementById('sunrise');

    const sunriseDate = new Date(jsonData.sys.sunrise * 1000)
    const sunHours = sunriseDate.getHours();
    const sunMinutes = sunriseDate.getMinutes();
    const formattedHoursSunrise = sunHours < 10 ? `0${sunHours}` : sunHours;
    const formattedMinutesSunrise = sunMinutes < 10 ? `0${sunMinutes}` : sunMinutes;
    const sunriseGetDate = `${formattedHoursSunrise}:${formattedMinutesSunrise}`;
    sunrise.innerText = sunriseGetDate;

    // get today's times temp
    
    const todDiv = document.querySelectorAll('.t-d-cols-2');

    todDiv.forEach((tod, outerIndex) => {
        const todTime = tod.querySelectorAll('.time-h');
        const todIcon = tod.querySelectorAll('.weather-icon');
        const todTemp = tod.querySelectorAll('.today-temps');

        todTime.forEach((time, innerIndex) => {
            const getTime = new Date(daysTemps.list[outerIndex * todTime.length + innerIndex].dt * 1000);
            const getHour = getTime.getHours();
            const getMinutes = getTime.getMinutes();
            const formateHours = getHour < 10 ? `0${getHour}` : getHour;
            const formateMinutes = getMinutes < 10 ? `0${getMinutes}` : getMinutes;
            
            if(getHour > 12) {

                time.innerText = `${formateHours}:${formateMinutes}`;
            } else {
                time.innerText = `${formateHours}:${formateMinutes}`;
                
            }

            todIcon.forEach((icon, innerIndex) => {
                const getWeatherDesc = daysTemps.list[outerIndex * todIcon.length + innerIndex].weather[0].main;
                if(getHour >= sunsetHour || getHour <= sunHours) {
                    switch (getWeatherDesc) {
                        case 'Rain':
                            icon.src = '/images/weather-situation/rainy.png';
                            break;

                        case 'rain':
                            icon.src = '/images/weather-situation/few-clouds.png';
                            break;

                        case 'Clouds':
                            icon.src = '/images/weather-situation/clouds-night.png';
                            break;

                        default:
                        icon.src = '/images/weather-situation/clear-sky.png';
                        break;
                    }
                } else {

                    switch (getWeatherDesc) {
                        case 'Rain':
                        icon.src = '/images/weather-situation/altmospher.png';
                        break;
                        case 'Clouds':
                        icon.src = '/images/weather-situation/clouds.png';
                        break;
            
                        case 'Snow':
                        icon.src = '/images/weather-situation/snowy.png';
                        break;
            
                        case 'Thunderstorm':
                        icon.src = '/images/weather-situation/thunderstorm.png';
                        break;
            
                        case 'Drizzle':
                        icon.src = '/images/weather-situation/drizzle.png';
                        break;
            
                        default:
                        icon.src = '/images/weather-situation/sunny.png';
                        break;
                    }
                }
            })

            todTemp.forEach((temps, innerIndex) => {

                let FehnertToCelisius = Math.round(daysTemps.list[outerIndex * todTemp.length + innerIndex].main.temp - 273.15);
                temps.innerText = `${FehnertToCelisius}°`;
                })

        });

    });


    // real feel
    const realFeelElement = document.getElementById('real-feel');
    const feelsInCelsius = Math.round(jsonData.main.feels_like - 273.15);
    realFeelElement.innerText = `${feelsInCelsius}°`;

    // wind 
    const windElement = document.getElementById('wind');
    const windPathTwo = document.querySelector('.wind-path');
    const windSpeedInMeterPerSecond = jsonData.wind.speed;
    let windSpeedInMeterPerHour = Math.round(windSpeedInMeterPerSecond * 3.5);
    windPathTwo.innerText = 'km/h';
    windElement.innerText = `${windSpeedInMeterPerHour}`;


    // humidity 
    const humidityElement = document.getElementById('humidity');
    const humidityPath = document.querySelector('.humidity-path')
    humidityPath.innerText = '%';
    const getHum = jsonData.main.humidity;
    humidityElement.innerText = `${getHum}`;

    // visibility
    const visibilityElement = document.getElementById('Visibility');
    const visibilityPathTwo = document.querySelector('.visibility-path')
    const getVisiInMeter = jsonData.visibility;
    const getVisiInKilometers = Math.round(getVisiInMeter / 1000);
    visibilityPathTwo.innerText = 'km'
    visibilityElement.innerText = `${getVisiInKilometers}`;

    // pressure 
    const pressureElement = document.getElementById('pressure');
    const presurePath = document.querySelector('.presure-path')
    const getPressure = jsonData.main.pressure;
    presurePath.innerText = 'hPa';

    pressureElement.innerText = `${getPressure}`;

    //  UV Index not real value becaus I'm using free plan API, I cannot access to all the features.
    
    const uvIndex = document.getElementById('index')
    uvIndex.innerText = Math.floor(Math.random() * 6)

};

const searchCity = () => {
    let input = document.querySelector('#search-input');
    let inputVal = input.value.trim();
    const searchContentTwo = document.querySelector('.search-content');
    searchContentTwo.classList.remove('show')
    if (inputVal !== '') {
        myRequest.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&lang=en`);
        myRequest.send();
        input.value = '';
    }

};

const init = () => {
    let searchBtn = document.querySelector('#search-btn');
    let input = document.querySelector('#search-input');

    // Retrieve the last entered city from local storage
    searchBtn.addEventListener('click', searchCity);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchCity();
        }
    });
};

window.onload = () => {
    getDefaultCityWeather();
    getCurrentLocationWeather()
};
init();

export {updateUI, myRequest}