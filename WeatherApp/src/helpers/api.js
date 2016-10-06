
const axios = require('axios');
const _APIKEY = '49abc6dcfe6bd66aeff79156ba0fad1a';

// const units  = '&units=imperial';
const _baseURL = 'http://api.openweathermap.org/data/2.5/';

function prepRouteParams(queryStringData) {
  return Object.keys(queryStringData)
    .map(function (key) {
      return key + '=' + encodeURIComponent(queryStringData[key]);
    }).join('&');
};

function prepUrl(type, queryStringData) {
  return _baseURL + type + '?' + prepRouteParams(queryStringData);
}

function getQueryStringData(city) {
  return {
    q: city,
    type: 'accurate',
    APPID: _APIKEY,
    cnt: 5,
  };
}

function getCurrentWeather(city) {
  const queryStringData = getQueryStringData(city);
  const url = prepUrl('weather', queryStringData);

  return axios.get(url)
    .then(function (currentWeatherData) {
      return currentWeatherData.data;
    });
}

function getForecast(city) {
  const queryStringData = getQueryStringData(city);
  const url = prepUrl('forecast/daily', queryStringData);

  return axios.get(url)
    .then(function (forecastData) {
      return forecastData.data;
    });
}

module.exports = {
  getCurrentWeather: getCurrentWeather,
  getForecast: getForecast,
};
