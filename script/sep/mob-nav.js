"use strict"
const searchNavIcon = document.getElementById('search-mo');
const searchContent = document.querySelector('.search-content');
const searchClose = document.getElementById('search-close');

const cities = document.querySelector('.cities');
const citiesNavIcon = document.getElementById('cities-mo');
const citiesClose = document.getElementById('cities-close');

const settingsNavIcon = document.getElementById('settings-mo');
const settingsClose = document.getElementById('settings-close');
const settingsContent = document.querySelector('.settings');

const rightSideContent = document.querySelector('.right-side');
const weatherHeart = document.querySelector('.weather-heart');

const searchNavIconFun = () => {
    searchContent.classList.add('show')
}

const searchCloseFun = () => {
    searchContent.classList.remove('show')
}

const citiesNavIconFun = () => {
    rightSideContent.classList.add('show')
    cities.classList.remove('show')
    settingsContent.classList.remove('show')
}

const citiesCloseFun = () => {
    rightSideContent.classList.remove('show')
}

const settingsNavIconFun = () => {
    settingsContent.classList.add('show')
    rightSideContent.classList.add('show')
    cities.classList.add('show')
}
const settingsCloseFun = () => {
    rightSideContent.classList.remove('show')
    settingsContent.classList.remove('show')
}

searchClose.addEventListener('click', searchCloseFun);
searchNavIcon.addEventListener('click', searchNavIconFun);
citiesNavIcon.addEventListener('click', citiesNavIconFun);
citiesClose.addEventListener('click', citiesCloseFun);
settingsNavIcon.addEventListener('click', settingsNavIconFun);
settingsClose.addEventListener('click', settingsCloseFun);