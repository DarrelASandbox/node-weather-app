const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message1');
const message2 = document.querySelector('#message2');

fetch('https://puzzle.mead.io/puzzle').then((response) => {
  response.json().then((data) => {
    message1.textContent = data.puzzle;
  });
});

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  message2.textContent = 'Loading...';

  fetch(`/weather?location=${search.value}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        message2.textContent = data.error;
      } else {
        message2.textContent = `${data.latitude}, ${data.longitude}
            ${data.forecast}`;
        search.value = '';
      }
    });
  });
});
