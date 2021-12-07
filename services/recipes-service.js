const recipesModel = require('../models/recipe/recipe-model')

const createRecipe = (name, recipe) => {
    return recipesModel
        .create(recipe)
}

const findAllRecipe = () =>
    recipesModel.find()

const findRecipe = (name) =>
     recipesModel.find({strMeal: name})
    // recipesModel.find({$text: {$search: name}})

const findRecipeById = (id) => {
    return recipesModel.find({_id: id})
}


const deleteRecipe = (name, recipe) =>
    recipesModel.deleteOne({strMeal: name})

module.exports = {
    createRecipe,
    findAllRecipe,
    findRecipe,
    findRecipeById,
    deleteRecipe
}