const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const printPuzzle = document.querySelector('#printPuzzle');
const printGeoCoords = document.querySelector('#printGeoCoords');
const printLocation = document.querySelector('#printLocation');
const printForecast = document.querySelector('#printForecast');

fetch('https://puzzle.mead.io/puzzle').then((response) => {
  response.json().then((data) => {
    printPuzzle.textContent = data.puzzle;
  });
});

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  printGeoCoords.textContent = 'Loading...';

  fetch(`/weather?location=${search.value}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        printGeoCoords.textContent = data.error;
      } else {
        printGeoCoords.textContent = `Latitude: ${data.latitude}, Longitude: ${data.longitude}`;
        printLocation.textContent = `${data.forecast.country} ${data.forecast.region} ${data.forecast.localtime}`;
        printForecast.textContent = `${data.forecast.weather_description}: Temperature at ${data.forecast.temperature} degree and feels like ${data.forecast.feelslike} degree.`;
        search.value = '';
      }
    });
  });
});
