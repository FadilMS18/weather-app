import "./css/styles.css";
import "./css/loading.css";
import "./css/nav.css";
import "./css/hourly.css";
import { WeatherHandler, desiredTempCelsius } from "./modules/weather";

// TODO: Use figma to design phone and tablet layout

window.addEventListener("scroll", navbarHandler);
window.addEventListener("DOMContentLoaded", loadFirstPage, { once: true });

// default city searcher that is Amsterdam
function loadFirstPage() {
  const searchBar = document.querySelector("#search");
  WeatherHandler(searchBar, desiredTempCelsius);
}

// Scroll down function, pop the navbar when ever the user past the first search box

function navbarHandler() {
  const navbar = document.querySelector("#nav");
  window.scrollY > 300
    ? navbar.classList.remove("popNavbar")
    : navbar.classList.add("popNavbar");
}
