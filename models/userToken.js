const {Schema, model} = require('mongoose');


const tokenScheme = new Schema ({
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    refreshToken: {
        type: String,
        required: true
    }
});

module.exports = model("Token", tokenScheme);

// async function main() {
//     //connect DB
//     await mongoose.connect("mongodb://localhost:27017/MessengerDB");
//     //save module
//     await users.save();
//     console.log("Users Save", users);
//     //disconnect DB
//     await mongoose.disconnect();
// }
// //start
// main().catch(console.log);



