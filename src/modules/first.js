import { format } from "date-fns"
import { dialogMaker } from "./dialog"

let x = 'this is from first js'

const searchBar = [...document.querySelectorAll('.searcher')]
const searchButton = [...document.querySelectorAll('.searcher-button')]
let desiredTempCelcius = true


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

function conditionHandler(data){
    const {current} = data
    const condition = document.querySelector('#condition')
    condition.textContent = current.condition.text
    const temp = document.querySelector('#temp-info > h2')
    temp.textContent = `${current.temp_c} °C`
}


function hourlyWeather(data){    
    const thead = [...document.querySelectorAll('#table-heading > div > p')]
    const tableContent = [...document.querySelectorAll('.table-content')]
    console.log(thead)
    console.log(tableContent)


    thead[0].textContent = `Sunrise: ${data.astro.sunrise}`
    thead[1].textContent = `Sunset: ${data.astro.sunset}`
    tableContent.forEach((content, index)=>{
        const icon = tableContent[index].querySelector('img')
        const condition = tableContent[index].querySelector('p')
        icon.src = data.hour[index].condition.icon
        condition.textContent = data.hour[index].condition.text
    })
}

async function forecastHandler(data){
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
        temp.textContent = `${forecastDay[index].day.maxtemp_c} °C`
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
        console.log('Please insert a city name')
        return true
    }
    return false
}

async function leftContainerHandler(searchBar){
    const loadingScreen = document.querySelector('#loading-screen')
    if(checkInputValue(searchBar)){ return }
    loadingScreen.classList.remove('finish')
    
    let data;
    try {
        data = await getWeatherData(searchBar)

        searchBar.value = ''

        cityNameHandler(data)
        conditionHandler(data)
        forecastHandler(data)

        loadingScreen.classList.add('finish')
    } catch (error) {
        loadingScreen.classList.add('finish')
        searchBar.value = ''
        return;
    }

    
}






searchButton.forEach((button)=>{
    button.addEventListener('click', ()=>{
        const searchBar = button.parentElement.firstElementChild
        leftContainerHandler(searchBar)
    })
})

searchBar.forEach((bar)=>{
    bar.addEventListener('keyup',  (e)=>{
        if(e.key !== 'Enter'){
            return
        }
        leftContainerHandler(bar)
    })
})  


// TODO: Make one async function for content container and make mega function that will pop up the loading and await all async function





export { x }