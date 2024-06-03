import { format } from "date-fns"

let x = 'this is from first js'

console.log('hello, world!')

let desiredTempCelcius = true

class Weather{
    static getLocation({location}){
        return location
    }
    static getCurrent({current}){
        return current
    }
    static getForecast({forecast}){
        return forecast
    }
}

const searchBar = document.querySelector('#search')
const searchButton = document.querySelector('#search-button')

async function getWeatherData(){
    const loadingScreen = document.querySelector('#loading-screen')
    loadingScreen.classList.remove('finish')
    
    try{
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=4c9280a21b7640efb4e51904242205&q=${searchBar.value}&days=3&aqi=no&alerts=no`, {mode:'cors'})
        if(!response.ok){
            throw new Error(response.statusText);
        }
        const data = await response.json()
        searchBar.value = ''
        loadingScreen.classList.add('finish')
        return data    
    }catch(error){
        !loadingScreen.classList.contains('finish') ? loadingScreen.classList.add('finish') : null
        searchBar.value = ''
        alert(error)
        
    }
    
    

    
}

async function leftContainerHandler(){
    if(checkInputValue(searchBar)){ return }
    const data = await getWeatherData()
    cityNameHandler(data)
    conditionHandler(data)
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

function checkInputValue(input){
    if(input.value === ''){
        console.log('Please insert a city name')
        return true
    }
    return false
}

searchButton.addEventListener('click', ()=>{
    leftContainerHandler()
})

searchBar.addEventListener('keyup',  (e)=>{
    if(e.key !== 'Enter'){
        return
    }
    leftContainerHandler()
})

// TODO: Make one async function for content container and make mega function that will pop up the loading and await all async function
// TODO: figure out how to stop the problem on error at getweatherdata bad response


export { x }