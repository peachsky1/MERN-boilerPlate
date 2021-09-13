const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// https://www.npmjs.com/package/bcrypt
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
});

//mongoose method
userSchema.pre("save", function(next) {
    var user = this;
    console.log(user.email);
    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                console.log(err);
                user.password = hash;
                // Store hash in your password DB.
                next();
            });
        });
        // encrypt using bcrypt
    } else {
        next();
    }
});

const User = mongoose.model("User", userSchema);
module.exports = { User };