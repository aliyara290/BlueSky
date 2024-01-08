import { myRequest, updateUI } from "/script/main.js";

const mmhg = document.getElementById('mmhg');
const inhg = document.getElementById('inhg');
const hpa = document.getElementById('hpa');
const pressureText = document.getElementById('pressure');

let mmhgFun = () => {
    if (myRequest.readyState === 4 && myRequest.status === 200) {
        const apiData = JSON.parse(myRequest.responseText);
        console.log(apiData);
        const presurePath = document.querySelector('.presure-path')
        let pressureInMmhg = Math.round(apiData.main.pressure * 0.750062);
        presurePath.innerText = 'mmhg'
        pressureText.innerText = `${pressureInMmhg}`;

        mmhg.classList.add('selected-item');
        inhg.classList.remove('selected-item');
        hpa.classList.remove('selected-item');

    } else {
        console.error('try again');
    }
}

let inhgFun = () => {
    if (myRequest.readyState === 4 && myRequest.status === 200) {
        const apiData = JSON.parse(myRequest.responseText);
        console.log(apiData);
        const presurePath = document.querySelector('.presure-path')
        let pressureInInhg = Math.round(apiData.main.pressure * 0.02953);
        presurePath.innerText = 'inhg'
        pressureText.innerText = `${pressureInInhg}`;

        mmhg.classList.remove('selected-item');
        inhg.classList.add('selected-item');
        hpa.classList.remove('selected-item');

    } else {
        console.error('try again');
    }
}

let hpaFun = () => {
    if (myRequest.readyState === 4 && myRequest.status === 200) {
        const apiData = JSON.parse(myRequest.responseText);
        console.log(apiData);
        const presurePath = document.querySelector('.presure-path')
        let pressureInHpa = apiData.main.pressure;
        presurePath.innerText = 'hPa'
        pressureText.innerText = `${pressureInHpa}`;

        mmhg.classList.remove('selected-item');
        inhg.classList.remove('selected-item');
        hpa.classList.add('selected-item');

    } else {
        console.error('try again');
    }
}

mmhg.addEventListener('click', mmhgFun);
inhg.addEventListener('click', inhgFun);
hpa.addEventListener('click', hpaFun);
