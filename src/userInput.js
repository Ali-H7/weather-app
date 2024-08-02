export let country = 'bahrain';
export let unit = 'metric';
export let unitText = '°C';
export let speedUnit = 'km/h';

export default function getUserInput() {
  const search = document.querySelector('.search-bar');
  const unitCheckBox = document.querySelector('#checkbox_toggle');
  country = search.value;
  if (unitCheckBox.checked) {
    unit = 'us';
    unitText = '°F';
    speedUnit = 'mp/h';
  } else {
    unit = 'metric';
    unitText = '°C';
    speedUnit = 'km/h';
  }
}
