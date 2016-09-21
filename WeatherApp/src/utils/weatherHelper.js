var axios = require('axios');

var apiKey = '49abc6dcfe6bd66aeff79156ba0fad1a';
var cityId = 'Portland';

var oneDayWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q='
        + cityId + '&type=accurate&APPID=' + apiKey;

var fiveDayForecastUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='
        + cityId + '&type=accurate&APPID=' + apiKey;

// A trick to display object info in json format
function puke(object) {
  return <pre>{JSON.stringify(object, null, ' ')}</pre>;
}

//  Make a get request to the url and log it
function weatherHelper() {
  axios.get(fiveDayForecastUrl)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

module.exports = weatherHelper;
