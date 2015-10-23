var weather = require('./weatherdata.js');
//weather.getWeather(zipcode);
var zipcode = process.argv.slice(2);

zipcode.forEach(weather.getWeather);
