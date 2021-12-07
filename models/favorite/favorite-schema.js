const mongoose = require("mongoose")

const favoritesSchema = mongoose.Schema({
//    id: String,
    username: String,
    recipeId: String
}, {collection: 'favorites'})

module.exports = favoritesSchema