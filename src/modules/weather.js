import { format } from "date-fns";
import { dialogMaker } from "./dialog";

const searchBar = [...document.querySelectorAll(".searcher")];
const searchButton = [...document.querySelectorAll(".searcher-button")];
let desiredTempCelsius = true;

// fetch function to get json data from weatherAPI
async function getWeatherData(searchBar) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=4c9280a21b7640efb4e51904242205&q=${searchBar.value}&days=3&aqi=no&alerts=no`,
    { mode: "cors" }
  );
  const data = await response.json();

  return data;
}

// Location function that will change city information
function cityNameHandler(data) {
  const { location } = data;
  const cityInfo = document.querySelector("#city");
  const localTime = format(location.localtime, "EEEE, do LLL yyyy ");
  cityInfo.innerText = `${location.name}, ${location.region} ${location.country} \n ${localTime}`;
}

// Condition function for change the condition in that day based on weatherAPI source
function conditionHandler(data, desiredTempCelsius) {
  const { current } = data;
  const condition = document.querySelector("#condition");
  condition.textContent = current.condition.text;
  const temp = document.querySelector("#temp-info > h2");
  if (desiredTempCelsius) {
    temp.textContent = `${current.temp_c} °C`;
  } else {
    temp.textContent = `${current.temp_f} °F`;
  }
}

// Table content Maker
function hourlyWeather(data) {
  const thead = [...document.querySelectorAll("#table-heading > div > p")];
  const tableContent = [...document.querySelectorAll(".table-content")];

  thead[0].textContent = `Sunrise: ${data.astro.sunrise}`;
  thead[1].textContent = `Sunset: ${data.astro.sunset}`;
  tableContent.forEach((content, index) => {
    const icon = tableContent[index].querySelector("img");
    const condition = tableContent[index].querySelector("p");
    icon.src = data.hour[index].condition.icon;
    condition.textContent = data.hour[index].condition.text;
  });
}

// Function for 3 days forecast with dialog for clicking it
async function forecastHandler(data, desiredTempCelsius) {
  const forecastContent = [...document.querySelectorAll(".content")];
  const futureDaysContent = [
    ...document.querySelectorAll(".future-days-content"),
  ];
  const forecastIMG = [
    ...document.querySelectorAll(".future-days-content > img"),
  ];
  const { forecast } = data;
  const forecastDay = forecast.forecastday;
  forecastContent.forEach((content, index) => {
    const title = content.querySelector("h4");
    const date = content.querySelector("p");
    const temp = content.querySelector("h5");

    forecastIMG[index].src = forecastDay[index].day.condition.icon;
    title.textContent = forecastDay[index].day.condition.text;
    date.textContent = format(forecastDay[index].date, "EEE, dd MMM y");
    if (desiredTempCelsius) {
      temp.textContent = `${forecastDay[index].day.maxtemp_c} °C`;
    } else {
      temp.textContent = `${forecastDay[index].day.maxtemp_f} °F`;
    }
  });

  hourlyWeather(forecastDay[0]);

  futureDaysContent.forEach((content, index) => {
    content.addEventListener("click", () => {
      const dialog = dialogMaker(forecastDay, index);
      document.body.appendChild(dialog);
      dialog.showModal();
    });
  });
}

// function to check the search box, is it empty or not
function checkInputValue(input) {
  if (input.value === "") {
    alert("Search box cannot be empty");
    return true;
  }
  return false;
}

// Temp Converter function, switch between celsius & fahrenheit
function tempSwitcher(data) {
  const celsius = document.querySelector("#celsius-icon");
  const fahrenheit = document.querySelector("#fahrenheit-icon");

  celsius.addEventListener("click", () => {
    desiredTempCelsius = true;
    if (!celsius.classList.contains("active")) {
      celsius.classList.add("active");
      fahrenheit.classList.remove("active");
    }
    conditionHandler(data, desiredTempCelsius);
    forecastHandler(data, desiredTempCelsius);
  });

  fahrenheit.addEventListener("click", async () => {
    desiredTempCelsius = false;
    if (!fahrenheit.classList.contains("active")) {
      fahrenheit.classList.add("active");
      celsius.classList.remove("active");
    }
    conditionHandler(data, desiredTempCelsius);
    forecastHandler(data, desiredTempCelsius);
  });
}

// Function to run all the other functions
async function WeatherHandler(searchBar, desiredTempCelsius) {
  const loadingScreen = document.querySelector("#loading-screen");
  if (checkInputValue(searchBar)) {
    return;
  }
  loadingScreen.classList.remove("finish");

  let data;
  try {
    data = await getWeatherData(searchBar);

    searchBar.value = "";

    cityNameHandler(data);
    conditionHandler(data, desiredTempCelsius);
    forecastHandler(data, desiredTempCelsius);
    tempSwitcher(data);

    loadingScreen.classList.add("finish");
  } catch (error) {
    loadingScreen.classList.add("finish");
    searchBar.value = "";
    alert("Please search for a valid city");
    return;
  }
}

// function to trigger the search box with enter key or button click
function searchButtonEvent(button) {
  button.addEventListener("click", () => {
    const searchBar = button.parentElement.firstElementChild;
    WeatherHandler(searchBar, desiredTempCelsius);
  });
}

function searchEnter(bar) {
  bar.addEventListener("keyup", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    WeatherHandler(bar, desiredTempCelsius);
  });
}

searchButton.forEach(searchButtonEvent);
searchBar.forEach(searchEnter);

export { WeatherHandler, desiredTempCelsius };
