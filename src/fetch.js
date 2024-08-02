import { pageLoad } from './rendering';
import { country } from './userInput';
import { unit } from './userInput';
import { renderWeatherElements } from './rendering';
import { handleErrors } from './rendering';

export let weatherData;
export default function fetchData() {
  pageLoad();

  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/next7days?unitGroup=${unit}&include=days%2Ccurrent&key=CBH64PUQGLBV2Z47HJ6WH8ZHV&contentType=json`
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      updateWeatherData(response);
      renderWeatherElements();
    })
    .catch((err) => {
      handleErrors();
      console.log(err);
    });
}

function updateWeatherData(data) {
  weatherData = data;
}
