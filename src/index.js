import './css/styles.css'
import './css/loading.css'
import './css/nav.css'
import './css/hourly.css'
import {x} from './modules/first'
import { format } from 'date-fns'
console.log(x)
console.log('Hello, world!')


// Remember: Weather API only allow us to get 3 days ahead forecast

console.log(format(new Date(), 'dd MM yyyy'))

// °C °F

let obj = {
    nato : 1,
    notNato : 0,
}

console.log(Boolean(obj.notNato))

// TODO: Use figma to design phone and tablet layout

const root = document.querySelector(":root")
root.classList.add('dark')


window.addEventListener('scroll', navbarHandler)

function navbarHandler(){
    const navbar = document.querySelector('#nav')
    if(window.scrollY > 400){
        navbar.classList.remove('popNavbar')
    }
    if(window.scrollY <= 400 ){
        navbar.classList.add('popNavbar')
    }  
}




// TODO: Make the content box for hourly weather cast for the day
// TODO: Make a function that will convert all celsius temp to fahrenheit