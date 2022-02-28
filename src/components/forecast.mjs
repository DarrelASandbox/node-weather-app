import request from 'request';
import API_KEY from '../../config.mjs';

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${API_KEY.forecast}&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) return callback('Something went wrong!');
    else if (response.body.error)
      return callback('weatherstack error: ' + longitude);
    else {
      callback(
        undefined,
        // `${response.body.location.country} ${response.body.location.region} (${response.body.location.localtime}): ${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degree and feels like ${response.body.current.feelslike} degree.`
        {
          country: response.body.location.country,
          region: response.body.location.region,
          localtime: response.body.location.localtime,
          weather_description: response.body.current.weather_descriptions[0],
          temperature: response.body.current.temperature,
          feelslike: response.body.current.feelslike,
        }
      );
    }
  });
};

export default forecast;
