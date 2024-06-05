import './css/styles.css'
import './css/loading.css'
import './css/nav.css'
import './css/hourly.css'
import { WeatherHandler, desiredTempCelsius} from './modules/weather'
console.log('Hello, world!')


// Remember: Weather API only allow us to get 3 days ahead forecast


// °C °F

// TODO: Use figma to design phone and tablet layout

const root = document.querySelector(":root")


window.addEventListener('scroll', navbarHandler)
window.addEventListener('DOMContentLoaded', loadFirstPage)

function loadFirstPage(){
    const searchBar = document.querySelector('#search')
    WeatherHandler(searchBar, desiredTempCelsius)
}

function navbarHandler(){
    const navbar = document.querySelector('#nav')
    if(window.scrollY > 400){
        navbar.classList.remove('popNavbar')
    }
    if(window.scrollY <= 400 ){
        navbar.classList.add('popNavbar')
    }  
}

// TODO: Make a function that will convert all celsius temp to fahrenheit or celsius