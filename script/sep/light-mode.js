const moonIcon = document.querySelector('.fa-moon')
const sunIcon = document.querySelector('.fa-sun')
const weatherApp = document.querySelectorAll('.weather-app')
const layoutBg = document.querySelectorAll('.bg-color-2')
const fontColor = document.querySelectorAll('.f-colors')

let moonFunc = () => {
    moonIcon.classList.add('switchThem')
    sunIcon.classList.remove('switchThem')

    
}
let sunFunc = () => {

    sunIcon.classList.add('switchThem')
    moonIcon.classList.remove('switchThem')

}
moonIcon.addEventListener('click', moonFunc)
sunIcon.addEventListener('click', sunFunc)

