import { format } from "date-fns"

// Function to make a dialog when user click the 3 days forecast
function dialogMaker(data, index){
    const dialog = document.createElement('dialog')
    dialog.classList.add('dialog')
    const dialogContent = document.createElement('div')
    dialogContent.setAttribute('id', 'dialog-content')
    dialog.appendChild(dialogContent)

    const h2 = document.createElement('h2')
    h2.textContent = data[index].day.condition.text
    const p = document.createElement('p')
    p.textContent = format(data[index].date, 'EEE, dd MMM y')
    const ul = document.createElement('ul')
    ul.setAttribute('id', 'content-detail')
    const liArray = []
    for(let i = 0; i < 9; i++){
        const li = document.createElement('li')
        liArray.push(li)
    }
    liArray[0].textContent = `Max Temperature in celsius: ${data[index].day.maxtemp_c} °C`
    liArray[1].textContent = `Max Temperature in fahrenheit: ${data[index].day.maxtemp_f} °F`
    liArray[2].textContent = `Avg Temperature in celsius: ${data[index].day.avgtemp_c} °C`
    liArray[3].textContent = `Avg Temperature in fahrenheit: ${data[index].day.avgtemp_f} °F`
    liArray[4].textContent = `Chance of rain: ${data[index].day.daily_chance_of_rain} %`
    liArray[5].textContent = `Max wind speed: ${data[index].day.maxwind_mph} mph / ${data[index].day.maxwind_kph} kph`
    liArray[6].textContent = `Sunrise at: ${data[index].astro.sunrise}`
    liArray[7].textContent = `Sunset at: ${data[index].astro.sunset}`
    liArray[8].textContent = `Moon phase: ${data[index].astro.moon_phase}`
    liArray.forEach((li)=>{
        ul.appendChild(li)
    })

    dialogContent.appendChild(h2)
    dialogContent.appendChild(p)
    dialogContent.appendChild(ul)

    const button = document.createElement('button')
    button.setAttribute('id', 'close-dialog')
    button.textContent = 'Close'
    button.addEventListener('click', async ()=>{
        setTimeout(()=>{
            document.body.removeChild(dialog)
        },351)
        dialog.close()
    })
    dialogContent.appendChild(button)
    return dialog
}

export { dialogMaker }