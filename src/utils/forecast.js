const request = require("postman-request");

const forecast = ({ latitude, longitude }, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f49fced8c04ad1e3603e58d0dd45f70f&query=${latitude},${longitude}`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the Internet!", undefined);
    } else if (response.body.error) {
      callback("Unable to find your location!", undefined);
    } else {
      callback(undefined, {
        weatherDescription: response.body.current.weather_descriptions[0],
        temperature: response.body.current.temperature,
        feelslike: response.body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
