const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
mongoose
    .connect(
        "mongodb+srv://jasonlee:abcd1234@boilerplate.mal6y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected!"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});