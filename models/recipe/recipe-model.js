const mongoose = require('mongoose')

const recipesSchema = require('./recipe-schema')

const recipesModel = mongoose.model(
    "RecipesModel",
    recipesSchema
)

module.exports = recipesModel