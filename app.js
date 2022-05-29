const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res){
    const query = req.body.cityName;
    const appid = "7314b13399e61499e45e1ed1f0176f4b";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appid +"&units="+ unit;
    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data){
            const WeatherData = JSON.parse(data);
            const temp = WeatherData.main.temp;
            const weatherDescription = WeatherData.weather[0].description;
            const icon = WeatherData.weather[0].icon;
            var iconUrl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
            res.write("<h1>The temperature in "+ query + " is " + temp + " in degrees celcius.</h1>");
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<img src=" + iconUrl + ">");
            res.send();
        });
    });
});

// const query = "mumbai";
//     const appid = "7314b13399e61499e45e1ed1f0176f4b";
//     const unit = "metric";

//     const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appid +"&units="+ unit;
//     https.get(url, function (response) {
//         console.log(response.statusCode);

//         response.on("data", function (data){
//             const WeatherData = JSON.parse(data);
//             const temp = WeatherData.main.temp;
//             const weatherDescription = WeatherData.weather[0].description;
//             const icon = WeatherData.weather[0].icon;
//             var iconUrl = "http://openweathermap.org/img/wn/"+ icon + "@2x.png";
//             res.write("<h1>The temperature in mumbai is " + temp + " in degrees celcius.</h1>");
//             res.write("<p>The weather is currently " + weatherDescription + "</p>");
//             res.write("<img src=" + iconUrl + ">");
//             res.send();
//         });
//     });

app.listen(3000, function (){
    console.log("The server 3000 has started.");
})