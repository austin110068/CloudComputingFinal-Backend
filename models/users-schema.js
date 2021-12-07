const mongoose = require("mongoose")
const userRegisterSchema = mongoose.Schema({
    username : String,
    password : String,
    email : String,
    role : {type: String, enum: ["Client", "Chef", "Admin"]},
    birthday : String,
    gender: {type: String, enum: ["Male", "Female", "Other", "Don't want answer"]},
    area: String,
    bio: String,
    flavor: String,
    portrait: String,
    favorites: [String]
    // profile: [{
    //     type: String,
    //     ref: 'profileModel'
    // }]
}, {collection: "users"})

module.exports = userRegisterSchema