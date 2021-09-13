const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { User } = require("./models/User");
const config = require("./config/key");
const app = express();

// https://stackoverflow.com/questions/24330014/bodyparser-is-deprecated-express-4
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// application/json
app.use(express.json());
const port = 3000;
mongoose
    .connect(config.mongoURI)
    .then(() => console.log("Connected!"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Hello World!");
});
// register router
app.post("/register", (req, res) => {
    // adding client signup info into DB
    const user = new User(req.body);
    // mongoDB save
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});