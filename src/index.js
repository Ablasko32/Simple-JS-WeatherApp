import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const defaultPort = 3000;
const weatherApiKey = "76605bccce9c05d9a36b433e5dc8d9d6";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/get-geocode", async (req, res) => {
  const cityName = req.body.cityName;
  try {
    const response = await axios.get(
      "https://geocoding-api.open-meteo.com/v1/search?name=" + cityName
    );
    res.render("index.ejs", { cityData: response.data.results });
  } catch (err) {
    console.log(err);
  }
});

app.post("/get-weather", async (req, res) => {
  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${weatherApiKey}`
    );
    res.render("weather.ejs", { data: result.data });
  } catch (err) {
    console.log(err);
  }
});

app.listen(defaultPort, () => {
  console.log(`App is running on port: ${defaultPort}`);
});
