const express = require("express");

const app = express();

app.use(express.static('src'));

app.get("/", (req, res) => {
    res.send("Welcome to Wave function collapse server");
});

app.listen(3000, err => {
    if (err) {
        return console.error("error" + err.stack);
    }
    console.info("Server started at port : 3000");
});