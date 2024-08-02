import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import { getDay } from 'date-fns';
import { format } from 'date-fns';
import { parse } from 'date-fns';
import getIcon from './getIcons';

let weatherData;
let country = 'saudi arabia';
let unit = 'metric';
let unitText = '°C';

fetchData();
function fetchData() {
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}/next7days?unitGroup=${unit}&include=days%2Ccurrent&key=CBH64PUQGLBV2Z47HJ6WH8ZHV&contentType=json`
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      weatherData = response;
      console.log(weatherData);
      createLocationElement();
      currentDayElement();
      createOtherDaysElement();
    })
    .catch((err) => {
      console.log(err);
    });
}

function getUserInput() {
  const search = document.querySelector('.search-bar');
  const unitCheckBox = document.querySelector('#checkbox_toggle');
  country = search.value;
  if (unitCheckBox.checked) {
    unit = 'metric';
    unitText = '°C';
  } else {
    unit = 'us';
    unitText = '°F';
  }
}

function currentDayElement() {
  const cards = document.querySelector('.cards');
  const todaysCard = document.createElement('div');
  todaysCard.classList.add('todaysCard');
  const dayTime = document.createElement('div');
  dayTime.classList.add('card-day-time');
  const temp = document.createElement('div');
  temp.classList.add('card-temp');
  const condition = document.createElement('h2');
  const cardDetails = document.createElement('div');
  cardDetails.classList.add('card-details');

  condition.textContent = weatherData.currentConditions.conditions;

  cards.appendChild(todaysCard);
  todaysCard.appendChild(dayTime);
  todaysCard.appendChild(temp);
  todaysCard.appendChild(condition);
  todaysCard.appendChild(cardDetails);

  const day = document.createElement('h3');
  const time = document.createElement('h3');

  day.textContent = format(new Date(), 'eeee');
  time.textContent = format(new Date(), 'p');
  dayTime.appendChild(day);
  dayTime.appendChild(time);

  const tempText = document.createElement('h1');
  const icon = getIcon(weatherData.currentConditions.icon);
  const currentDayIcon = document.createElement('img');

  tempText.textContent = weatherData.currentConditions.temp + unitText;
  currentDayIcon.src = icon;
  temp.appendChild(tempText);
  temp.appendChild(currentDayIcon);

  const group1 = document.createElement('div');
  const group2 = document.createElement('div');
  cardDetails.appendChild(group1);
  cardDetails.appendChild(group2);

  const feelsLike = document.createElement('h4');
  const humidity = document.createElement('h4');
  const wind = document.createElement('h4');

  const uvIndex = document.createElement('h4');
  const sunRise = document.createElement('h4');
  const sunSet = document.createElement('h4');

  feelsLike.textContent =
    'Feels like: ' + weatherData.currentConditions.feelslike + unitText;
  humidity.textContent =
    'Humidity: ' + weatherData.currentConditions.humidity + '%';
  wind.textContent = 'Wind: ' + weatherData.currentConditions.windspeed + 'm/s';
  uvIndex.textContent = 'UV index: ' + weatherData.currentConditions.uvindex;
  const sunRiseTime = parse(
    weatherData.currentConditions.sunrise,
    'HH:mm:ss',
    new Date()
  );
  sunRise.textContent = 'Sunrise: ' + format(new Date(sunRiseTime), 'p');
  const sunSetTime = parse(
    weatherData.currentConditions.sunset,
    'HH:mm:ss',
    new Date()
  );
  sunSet.textContent = 'Sunset: ' + format(new Date(sunSetTime), 'p');

  group1.appendChild(feelsLike);
  group1.appendChild(humidity);
  group1.appendChild(wind);

  group2.appendChild(uvIndex);
  group2.appendChild(sunRise);
  group2.appendChild(sunSet);
}

function createOtherDaysElement() {
  for (let i = 1; i < 7; i++) {
    const cards = document.querySelector('.cards');
    const otherDayscards = document.createElement('div');
    otherDayscards.classList.add('next-day-cards');
    cards.appendChild(otherDayscards);
    const day = document.createElement('h3');
    const temp = document.createElement('h1');

    const icon = getIcon(weatherData.days[i].icon);
    const otherDayIcon = document.createElement('img');

    day.textContent = format(
      new Date(weatherData.days[i].datetime),
      'eeee'
    ).slice(0, 3);
    temp.textContent = weatherData.days[i].temp + unitText;
    otherDayIcon.src = icon;

    otherDayscards.appendChild(day);
    otherDayscards.appendChild(otherDayIcon);
    otherDayscards.appendChild(temp);
  }
}

function createLocationElement() {
  const location = document.querySelector('.location');
  const locationIcon = document.createElement('i');
  const locationName = document.createElement('h1');

  locationIcon.classList.add('fa-solid');
  locationIcon.classList.add('fa-location-dot');
  locationIcon.classList.add('fa-2xl');

  locationName.textContent = weatherData.resolvedAddress;

  location.appendChild(locationIcon);
  location.appendChild(locationName);
}
