const port = 3000;
const express = require("express");
const https = require("https");

const app = express();

app.get("/", (req, res)=> {

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Tokyo,jp&units=metric&appid=ee209b530165edc961c1f49e89598afa";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = "<img src='http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png'>";
            console.log(temp + "degree, " + description);

            //If you want to do additional res.send(), you can use res.write
            res.write("<h1>The weather is currently " + description + "</h1>");
            res.write(icon);
            res.write("<h1>The temperature in Osaka is " + temp + " degrees Celcius.</h1>");
            res.send();
        });
    });


    // res.send("Server is running!");
});

app.listen(port, function() {
    console.log("Server is running on port " + port + ".");
});