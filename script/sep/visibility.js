import { myRequest, updateUI } from "/script/main.js";

const km = document.getElementById('km');
const visiMeter = document.getElementById('meter');
const visibilityText = document.getElementById('Visibility');
const visibilityPath = document.querySelector('.visibility-path')
let visiInKiloFun = () => {
    if (myRequest.readyState === 4 && myRequest.status === 200) {
        const apiData = JSON.parse(myRequest.responseText);
        visibilityPath.innerText = 'km'
        let visibilityKilo = Math.round(apiData.visibility / 1000);
        visibilityText.innerText = `${visibilityKilo}`;

        km.classList.add('selected-item');
        visiMeter.classList.remove('selected-item');

    } else {
        console.error('try again');
    }
}

let visiInMeterFun = () => {
    if (myRequest.readyState === 4 && myRequest.status === 200) {
        const apiData = JSON.parse(myRequest.responseText);
        visibilityPath.innerText = 'mi'
        let visibilityMeter = Math.round(apiData.visibility * 0.621371);
        visibilityText.innerText = `${visibilityMeter}`;

        km.classList.remove('selected-item');
        visiMeter.classList.add('selected-item');

    } else {
        console.error('try again');
    }
}

km.addEventListener('click', visiInKiloFun);
visiMeter.addEventListener('click', visiInMeterFun);
