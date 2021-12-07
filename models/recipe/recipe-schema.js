const mongoose = require("mongoose")

const createRecipeSchema = mongoose.Schema({
    //_id: String,
    strMeal: String,
    strInstructions: String,
    strIngredient1: String,
    strIngredient2: String,
    strIngredient3: String,
    strIngredient4: String,
    strIngredient5: String,
    strMeasure1: String,
    strMeasure2: String,
    strMeasure3: String,
    strMeasure4: String,
    strMeasure5: String,
    strMealThumb: String,
    username: String,
    strArea: String,
    strCategory: String
}, {collection: 'recipes'})

module.exports = createRecipeSchema