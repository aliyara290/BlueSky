import { myRequest, updateUI } from "/script/main.js";

const meterSec = document.getElementById('meter-s');
const KiloPerHour = document.getElementById('kilo-h');
const mph = document.getElementById('mph');
const windText = document.getElementById('wind');
const windPath = document.querySelector('.wind-path');

let meterPerSecFunc = () => {
    if (myRequest.readyState === 4 && myRequest.status === 200) {
        const apiData = JSON.parse(myRequest.responseText);
        let windInMeters = Math.round(apiData.wind.speed);
        windPath.innerText = 'm/s';
        windText.innerText = `${windInMeters}`;

        meterSec.classList.add('selected-item');
        KiloPerHour.classList.remove('selected-item');
        mph.classList.remove('selected-item');

    } else {
        console.error('try again');
    }
}

let kiloPerHourFunc = () => {
    if (myRequest.readyState === 4 && myRequest.status === 200) {
        const apiData = JSON.parse(myRequest.responseText);
        let windInKilos = Math.round(apiData.wind.speed * 3.5);
        windPath.innerText = 'km/s';
        windText.innerText = `${windInKilos}`;

        meterSec.classList.remove('selected-item');
        KiloPerHour.classList.add('selected-item');
        mph.classList.remove('selected-item');

    } else {
        console.error('try again');
    }
}

let mphFunc = () => {
    if (myRequest.readyState === 4 && myRequest.status === 200) {
        const apiData = JSON.parse(myRequest.responseText);
        let windInMph = Math.round(apiData.wind.speed * 2.23694);
        windPath.innerText = 'mph';
        windText.innerText = `${windInMph}`

        meterSec.classList.remove('selected-item');
        KiloPerHour.classList.remove('selected-item');
        mph.classList.add('selected-item');

    } else {
        console.error('try again');
    }
}

meterSec.addEventListener('click', meterPerSecFunc);
KiloPerHour.addEventListener('click', kiloPerHourFunc);
mph.addEventListener('click', mphFunc);