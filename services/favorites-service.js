const favoritesModel = require("../models/favorite/favorite-model")

const findAllUsersForAFavorite = (recipeId) => {
    return favoritesModel.find({recipeId: recipeId})
    .populate('favorites').exec()
}

const addFavoriteToMeal = (info) => {
    console.log(info)
    return favoritesModel.create(info)
}

const findAllFavoritesForAUser = (username) => {
    return favoritesModel.find({username: username})
        .populate('favorites').exec()
}

const findAllFavorites = () => {
    return favoritesModel.find()
}

const findFavoriteForUserAndMealID = (info) => {
    return favoritesModel.findOne(info)
}

const deleteFavorite = (info) =>
    favoritesModel.deleteOne(info)



module.exports = {
    findAllUsersForAFavorite,
    addFavoriteToMeal,
    findAllFavoritesForAUser,
    findAllFavorites,
    findFavoriteForUserAndMealID,
    deleteFavorite
    // removeFavorite,
}