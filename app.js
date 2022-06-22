const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const https = require('https');
const appId = "905a6d82017b6554a2f635f86f84da1a";
const units = "metric";

app.get("/", function (req, res) {
    res.sendFile(`${__dirname}/index.html`);
})

app.post("/", function(req, res) {
    const city = req.body.cityName;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=${units}`;
    getWeather(weatherUrl,res);
})

function getWeather(weatherUrl,res) {
    https.get(weatherUrl, function (resp) {
        console.log(resp.statusCode);
        console.log(resp.headers);

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            const weatherData = JSON.parse(chunk);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const geoLocation = weatherData.name;
            const icon = weatherData.weather[0].icon;
            const iconhref = `http://openweathermap.org/img/wn/${icon}@2x.png`;
            res.write(`<h1>The temperature in ${geoLocation} is ${temp} degrees Celcius </h1>`);
            res.write(`<h1>The weather is currently ${weatherDesc}</h1>`);
            res.write(`<img src='${iconhref}'/>`);
            res.send();
        });
        }).on("error", function (error) {
            console.log(JSON.parse(data).explanation);
        });

}

app.listen(3000, function () {
    console.log("Running on port 3000");
})