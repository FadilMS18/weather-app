import './css/styles.css'
import './css/loading.css'
import './css/nav.css'
import {x} from './modules/first'
import { format } from 'date-fns'
console.log(x)
console.log('Hello, world!')





// weatherTest()

// Remember: Weather API only allow us to get 3 days ahead forecast
// TODO: use date-fns to convert local time to day, ddth, mm yy hours  

console.log(format(new Date(), 'dd MM yyyy'))

// °C °F

let obj = {
    nato : 1,
    notNato : 0,
}

console.log(Boolean(obj.notNato))

// TODO: search for a way that your gif will match your theme 
// TODO: make the weather api working
// TODO: Use figma to design phone and tablet layout
// TODO: Make a theme for day and night 

const root = document.querySelector(":root")
root.classList.add('dark')


window.addEventListener('scroll', navbarHandler)

function navbarHandler(){
    const navbar = document.querySelector('#nav')
    if(window.scrollY > 400){
        console.log(window)
        navbar.classList.contains('popNavbar') 
        ? navbar.classList.remove('popNavbar')
        : null ;
    }
    if(window.scrollY <= 400 ){
        !navbar.classList.contains('popNavbar') 
        ? navbar.classList.add('popNavbar')
        : null ;
    }  
}

// scrollDown.addEventListener('click', ()=>{
//     navbar.classList.toggle('popNavbar')
// })