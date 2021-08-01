const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?limit=1&access_token=pk.eyJ1IjoidGhlcm9vcGVzaCIsImEiOiJja2t1eWJ2bjIwejA3MzFsbWo0Mmt5b3hxIn0.CVI29oMR3N-po-cNuBal-w`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to the Internet", undefined);
    } else if (response.body.features.length === 0) {
      callback("Unable to find the location", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
