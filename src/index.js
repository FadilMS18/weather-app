import './css/styles.css'
import {x} from './modules/first'
import { format } from 'date-fns'
console.log(x)
console.log('Hello, world!')



async function weatherTest(){
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=4c9280a21b7640efb4e51904242205&q=${search.value}&days=3&aqi=no&alerts=no`)
    console.log(response)
    let data = await response.json()
    console.log(data)
    let forecast = await data.forecast
    console.log(forecast)
    let bgResponse = await fetch('https://api.giphy.com/v1/gifs/dU97uV3UyP0ly?api_key=3cgs9hdwFdzL6pSZSImZnFRDPzsKdybB')
    let bg = await bgResponse.json()
    document.body.style.backgroundImage = `url(${bg.data.images.original.url})`
} 

const cityInfo = document.querySelector('#city')
cityInfo.innerText = `Makassar, South Sulawesi Indonesia \n Thursday, 30 May 2024`
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