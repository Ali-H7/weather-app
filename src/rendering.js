import { weatherData } from './fetch';
import getIcon from './getIcons';
import { format } from 'date-fns';
import { parse } from 'date-fns';
import { unitText } from './userInput';
import { speedUnit } from './userInput';

export function renderWeatherElements() {
  clearContent();
  createLocationElement();
  currentDayElement();
  createOtherDaysElement();
}

function currentDayElement() {
  const cards = document.querySelector('.cards');
  const todaysCard = document.createElement('div');
  const dayTime = document.createElement('div');
  const temp = document.createElement('div');
  const condition = document.createElement('h2');
  const cardDetails = document.createElement('div');
  const day = document.createElement('h3');
  const time = document.createElement('h3');
  const tempText = document.createElement('h1');
  const icon = getIcon(weatherData.currentConditions.icon);
  const currentDayIcon = document.createElement('img');
  const group1 = document.createElement('div');
  const group2 = document.createElement('div');
  const feelsLike = document.createElement('h4');
  const humidity = document.createElement('h4');
  const wind = document.createElement('h4');
  const uvIndex = document.createElement('h4');
  const sunRise = document.createElement('h4');
  const sunSet = document.createElement('h4');

  cardDetails.classList.add('card-details');
  todaysCard.classList.add('todaysCard');
  dayTime.classList.add('card-day-time');
  temp.classList.add('card-temp');

  condition.textContent = weatherData.currentConditions.conditions;
  day.textContent = format(new Date(), 'eeee');
  time.textContent = format(new Date(), 'p');
  tempText.textContent = weatherData.currentConditions.temp + unitText;
  currentDayIcon.src = icon;
  feelsLike.textContent =
    'Feels like: ' + weatherData.currentConditions.feelslike + unitText;
  humidity.textContent =
    'Humidity: ' + weatherData.currentConditions.humidity + '%';
  wind.textContent =
    'Wind: ' + weatherData.currentConditions.windspeed + ' ' + speedUnit;
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

  cards.appendChild(todaysCard);
  todaysCard.appendChild(dayTime);
  todaysCard.appendChild(temp);
  todaysCard.appendChild(condition);
  todaysCard.appendChild(cardDetails);
  dayTime.appendChild(day);
  dayTime.appendChild(time);
  temp.appendChild(tempText);
  temp.appendChild(currentDayIcon);
  cardDetails.appendChild(group1);
  cardDetails.appendChild(group2);
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
    const day = document.createElement('h3');
    const temp = document.createElement('h1');
    const icon = getIcon(weatherData.days[i].icon);
    const otherDayIcon = document.createElement('img');

    otherDayscards.classList.add('next-day-cards');

    day.textContent = format(
      new Date(weatherData.days[i].datetime),
      'eeee'
    ).slice(0, 3);
    temp.textContent = weatherData.days[i].temp + unitText;
    otherDayIcon.src = icon;

    cards.appendChild(otherDayscards);
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

function clearContent() {
  const location = document.querySelector('.location');
  const cards = document.querySelector('.cards');
  location.textContent = '';
  cards.textContent = '';
}

export function handleErrors() {
  clearContent();
  const location = document.querySelector('.location');
  const errorMsg = document.createElement('h1');
  errorMsg.textContent = 'Error 404, Try Again!';
  location.appendChild(errorMsg);
}

export function pageLoad() {
  clearContent();
  const location = document.querySelector('.location');
  const loading = document.createElement('div');
  loading.classList.add('loader');
  location.appendChild(loading);
}
