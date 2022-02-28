## About The Project

- The Complete Node.js Developer Course (3rd Edition) on Udemy
- Tutorial for Weather App

## Installation

1. Install NPM packages

   ```sh
   npm install
   ```

2. Enter your API in `config.mjs`

   ```js
   const API_KEY = {
     forecast: 'ENTER YOUR API KEY', // https://weatherstack.com/
     geoCoords: 'ENTER YOUR API KEY', // https://www.mapbox.com/
   };
   ```

### Notes

- .gitignore includes config.mjs that contain API Keys. So additional setup is required to run on hosting services.
