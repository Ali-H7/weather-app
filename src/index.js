import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

let weatherData;
let country = 'bahrain';
let unit = 'metric';

function fetchData() {
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/next7days?unitGroup=${unit}&include=days%2Ccurrent&key=CBH64PUQGLBV2Z47HJ6WH8ZHV&contentType=json`
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      response = weatherData;
    })
    .catch((err) => {
      console.log(err);
    });
}
