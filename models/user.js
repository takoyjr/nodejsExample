const {Schema, model} = require('mongoose');


const userScheme = new Schema ({
    login: {
        type: String,
        min: [3, "min 3 max 15"],
        max: 15,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

module.exports = model("User", userScheme);