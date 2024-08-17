import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const defaultPort = 3000;

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
    console.log(response.data.results[0]);
    res.render("index.ejs", { cityData: response.data.results });
  } catch (err) {
    console.log(err);
  }
});

app.listen(defaultPort, () => {
  console.log(`App is running on port: ${defaultPort}`);
});
