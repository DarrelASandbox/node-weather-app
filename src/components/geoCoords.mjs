import request from 'request';

const geoCoords = (location, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=pk.eyJ1Ijoib2JhbWF3YWxrZXIiLCJhIjoiY2t6eTY3a3poMDB6NzJ1czFxeWUwYnd0dCJ9.VUM1aD-VdYPH3Hruz6lq8w&limit=1`;

  if (location.length === 0) return console.log('Please provide a location.');

  request({ url, json: true }, (error, response) => {
    if (error) return callback('Something went wrong!', undefined);
    else if (response.body.features.length === 0)
      return callback('Invalid location.');
    else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

export default geoCoords;
