import { format } from "date-fns"
import { dialogMaker } from "./dialog"

let x = 'this is from first js'

const searchBar = [...document.querySelectorAll('.searcher')]
const searchButton = [...document.querySelectorAll('.searcher-button')]
let desiredTempCelsius = true


async function getWeatherData(searchBar){
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=4c9280a21b7640efb4e51904242205&q=${searchBar.value}&days=3&aqi=no&alerts=no`, {mode:'cors'})
    const data = await response.json()
    
    return data    
}

function cityNameHandler(data){
    const {location} = data
    const cityInfo = document.querySelector('#city')
    const localTime = format(location.localtime, 'EEEE, do LLL yyyy ')
    cityInfo.innerText = `${location.name}, ${location.region} ${location.country} \n ${localTime}`
}

function conditionHandler(data, desiredTempCelsius){
    const {current} = data
    const condition = document.querySelector('#condition')
    condition.textContent = current.condition.text
    const temp = document.querySelector('#temp-info > h2')
    if(desiredTempCelsius){
        temp.textContent = `${current.temp_c} °C`
    }else{
        temp.textContent = `${current.temp_f} °F`
    }
    
}


function hourlyWeather(data){    
    const thead = [...document.querySelectorAll('#table-heading > div > p')]
    const tableContent = [...document.querySelectorAll('.table-content')]
    
    thead[0].textContent = `Sunrise: ${data.astro.sunrise}`
    thead[1].textContent = `Sunset: ${data.astro.sunset}`
    tableContent.forEach((content, index)=>{
        const icon = tableContent[index].querySelector('img')
        const condition = tableContent[index].querySelector('p')
        icon.src = data.hour[index].condition.icon
        condition.textContent = data.hour[index].condition.text
    })
}

async function forecastHandler(data, desiredTempCelsius){
    const forecastContent = [...document.querySelectorAll('.content')]
    const futureDaysContent = [...document.querySelectorAll('.future-days-content')]
    const forecastIMG = [...document.querySelectorAll('.future-days-content > img')]
    const {forecast} = data
    const forecastDay = forecast.forecastday
    forecastContent.forEach((content, index)=>{
        const title = content.querySelector('h4')
        const date = content.querySelector('p')
        const temp = content.querySelector('h5')

        forecastIMG[index].src = forecastDay[index].day.condition.icon
        title.textContent = forecastDay[index].day.condition.text
        date.textContent = format(forecastDay[index].date, 'EEE, dd MMM y')
        if(desiredTempCelsius){
            temp.textContent = `${forecastDay[index].day.maxtemp_c} °C`
        }else{
            temp.textContent = `${forecastDay[index].day.maxtemp_f} °F`
        }
        
    })

    await hourlyWeather(forecastDay[0])

    futureDaysContent.forEach((content, index)=>{
        content.addEventListener('click', ()=>{
            const dialog = dialogMaker(forecastDay, index)
            document.body.appendChild(dialog)
            dialog.showModal()
        })
    })
    
}

function checkInputValue(input){
    if(input.value === ''){
        alert('Search box cannot be empty')
        return true
    }
    return false
}

function tempSwitcher(data){
    const celsius = document.querySelector('#celsius-icon')
    const fahrenheit = document.querySelector('#fahrenheit-icon')

    celsius.addEventListener('click', ()=>{
        desiredTempCelsius = true
        if(!celsius.classList.contains('active')){
            celsius.classList.add('active')
            fahrenheit.classList.remove('active')
        }
        conditionHandler(data, desiredTempCelsius)
        forecastHandler(data, desiredTempCelsius)
    })

    fahrenheit.addEventListener('click', async ()=>{
        desiredTempCelsius = false
        if(!fahrenheit.classList.contains('active')){
            fahrenheit.classList.add('active')
            celsius.classList.remove('active')
        }
        conditionHandler(data, desiredTempCelsius)
        forecastHandler(data, desiredTempCelsius)
    })
}

async function WeatherHandler(searchBar, desiredTempCelsius){
    const loadingScreen = document.querySelector('#loading-screen')
    if(checkInputValue(searchBar)){ return }
    loadingScreen.classList.remove('finish')
    
    let data;
    try {
        data = await getWeatherData(searchBar)

        searchBar.value = ''

        cityNameHandler(data)
        conditionHandler(data, desiredTempCelsius)
        forecastHandler(data, desiredTempCelsius)
        tempSwitcher(data)

        loadingScreen.classList.add('finish')
    } catch (error) {
        loadingScreen.classList.add('finish')
        searchBar.value = ''
        alert('Please search for a valid city')
        return;
    }

    
}

function searchButtonEvent(button){
    button.addEventListener('click', ()=>{
        const searchBar = button.parentElement.firstElementChild
        WeatherHandler(searchBar, desiredTempCelsius)
    })
}

function searchEnter(bar){
    bar.addEventListener('keyup',  (e)=>{
        if(e.key !== 'Enter'){
            return
        }
        WeatherHandler(bar, desiredTempCelsius)
    })
}

searchButton.forEach(searchButtonEvent)
searchBar.forEach(searchEnter)  



// TODO: Make one async function for content container and make mega function that will pop up the loading and await all async function





export { WeatherHandler, desiredTempCelsius }