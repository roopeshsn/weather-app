const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Settingup template engine and the views path to templates folder
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// settingup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Roopesh Saravanan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Roopesh Saravanan",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  // res.send({
  //   forecast: "Probability for raining",
  //   location: req.query.address,
  //   temperature: 29,
  // });

  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }

    forecast({ latitude, longitude }, (error, { weatherDescription, temperature, feelslike }) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        address: req.query.address,
        location,
        forecast: `${weatherDescription}. It is currently ${temperature} degrees. And there is a ${feelslike}% chance of rain.`,
        weatherDescription,
        temperature,
        feelslike,
      });
    });
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Section",
    name: "Roopesh Saravanan",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found!!!",
    name: "Roopesh Saravanan",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found!!!",
    name: "Roopesh Saravanan",
  });
});

app.listen(port, () => {
  console.log(`Server is successfully running on port ${port}`);
});
