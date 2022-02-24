import express from 'express';
import hbs from 'hbs';
import path from 'path';
import { fileURLToPath } from 'url';
import geoCoords from '../src/components/geoCoords.mjs';
import forecast from '../src/components/forecast.mjs';

const app = express();
const port = process.env.PORT || 3000;

// define paths for Express config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs'); // setup handlebar ~ dynamic templating engine
app.set('views', viewsPath); // change default folder of 'views' to 'templates'
hbs.registerPartials(partialsPath); // using hbs package from npm
app.use(express.static(path.join(__dirname, '../public/'))); // setup static directory to serve

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    footer: 'ThE WoRlD iS EnDInG...',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Stare into my soul...',
    footer: 'ThE WoRlD iS EnDInG...',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'HAALLLLLLLPPPPPP!!!',
    footer: 'ThE WoRlD iS EnDInG...',
  });
});

// ?search=
app.get('/weather', (req, res) => {
  if (!req.query.location)
    return res.send({ error: 'You must provide a location.' });

  geoCoords(req.query.location, (error, geoCoordsData) => {
    if (error) return console.log(error);
    forecast(
      geoCoordsData.latitude,
      geoCoordsData.longitude,
      (error, forecastData) => {
        if (error) return console.log(error);
        res.send({
          latitude: geoCoordsData.latitude,
          longitude: geoCoordsData.longitude,
          forecast: forecastData,
        });
      }
    );
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search)
    return res.send({
      error: 'You must provide a search term.',
    });
  res.send({
    product: [],
  });
});

app.use((req, res, next) => {
  res.status(404).render('404', {
    title: '404 Page',
    footer: 'ThE WoRlD iS EnDInG...',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
