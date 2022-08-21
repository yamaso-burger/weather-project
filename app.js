const port = 3000;
const express = require("express");

const app = express();

app.get("/", (req, res)=> {
    res.send("Server is up and running!!");
});

app.listen(port, function() {
    console.log("Server is running on port " + port + ".");
});