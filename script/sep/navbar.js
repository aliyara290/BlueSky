
const navbarFun = () => {
    
    const citiesNav = document.getElementById('cities-nav')
    const settingsNav = document.getElementById('settings-nav')
    const daysTemps = document.querySelector('.days-temps')
    const settings = document.querySelector('.settings')
    const cities = document.querySelector('.cities')
    const rigthSide = document.querySelector('.right-side')

    const leftSide = document.querySelector('.left-side');
    const humBar = document.querySelector('.fa-bars');
    const humClose = document.querySelector('.x-close');

    const blurBg = document.querySelector('.blur')

const citiesClick = () => {
    settings.classList.add('hidden')
    cities.classList.remove('hidden')
    settingsNav.classList.remove('active')
    citiesNav.classList.add('active')
    rigthSide.classList.remove('p-7', 'bg-color-2')
    leftSide.classList.remove('show')
    blurBg.style.display = 'none';
    settings.classList.remove('show')
}
const settingsClick = () => {
    settings.classList.add('show')
    cities.classList.add('hidden')
    settings.classList.remove('hidden')
    settingsNav.classList.add('active')
    citiesNav.classList.remove('active')
    rigthSide.classList.add('p-7', 'bg-color-2')
    leftSide.classList.remove('show')
    blurBg.style.display = 'none';
    
}

citiesNav.addEventListener('click', citiesClick)
settingsNav.addEventListener('click', settingsClick)

// humberger menu 



humBar.addEventListener('click', () => {
    leftSide.classList.toggle('show')
    blurBg.style.display = 'block'

})
humClose.addEventListener('click', () => {
    leftSide.classList.remove('show')
    blurBg.style.display = 'none';
})
}


navbarFun()