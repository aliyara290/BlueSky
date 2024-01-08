const apiKey = 'fa46ad611512230d302fada95b54016a';
const citiesName = ['Dubai', 'London', 'Tangier', 'Moscow', 'Istanbul', 'Berlin', 'Toyama'];

citiesName.forEach((cityName, index) => {
    const newXml = new XMLHttpRequest();
    newXml.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&lang=en`);

    newXml.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const getCityData = JSON.parse(this.responseText);
            const cityCard = document.querySelector(`.city-card:nth-child(${index + 1})`); // Assuming index starts from 0
            cardFun(getCityData, cityCard);
        }
    };

    newXml.send();
});

const cardFun = (getCityData, cityCard) => {
    const cityNameElement = cityCard.querySelector('.city-name');
    const cityHumidityElement = cityCard.querySelector('.city-humidity');
    const cityTempElement = cityCard.querySelector('.city-temp');
    const cityWeatherDescElement = cityCard.querySelector('.city-wt-description');

    cityNameElement.innerText = getCityData.name;
    cityHumidityElement.innerText = `humidity: ${getCityData.main.humidity}%`;
    cityTempElement.innerText = `${Math.round(getCityData.main.temp - 273.15)}°`;
    cityWeatherDescElement.innerText = getCityData.weather[0].main;


    const cityPp = cityCard.querySelector('.city-pp');
    const cityWeatherDescript = getCityData.weather[0].main;

    switch(cityWeatherDescript) {
            case 'Rain':
                cityPp.style.background = 'linear-gradient(#5D6268, #464C54)'
                break;
            case 'Clear':
                cityPp.style.background = 'linear-gradient(#2B50A3, #26459D)'
                break;
            case 'Thunderstorm':
                cityPp.style.background = 'linear-gradient(#464C54, #5D6268)'
                break;
            case 'Clouds':
                cityPp.style.background = 'linear-gradient(#5E778E, #495969)'
                break;
            case 'Snow':
                cityPp.style.background = 'linear-gradient(#238481, #1a6b6b)'
                break;
            case 'Drizzle':
                cityPp.style.background = '#4E6072'
                break;
            default:
                cityPp.style.background = 'linear-gradient(#2B50A3, #26459D)'
                break;
    }
};
// change card background 




