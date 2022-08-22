const port = 3000;
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=> {
    res.sendFile(__dirname + "/index.html");
    // res.send("Server is running!");
});

app.post("/", (req, res)=> {
    const query = req.body.cityName;
    const apiKey = "ee209b530165edc961c1f49e89598afa";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + ",jp&units=" + unit + "&appid=" + apiKey;
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
})



app.listen(port, function() {
    console.log("Server is running on port " + port + ".");
});