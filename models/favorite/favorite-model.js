const mongoose = require('mongoose')
const favoritesSchema = require('./favorite-schema')

const favoritesModel = mongoose.model(
    "favoritesModel",
    favoritesSchema
)

module.exports = favoritesModel