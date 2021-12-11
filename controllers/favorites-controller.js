const favoriteService = require("../services/favorites-service")

module.exports = (app, dynamoDB) => {
    const addFavoriteToMeal = (req, res) => {
        let info = req.body
        console.log(info)
        favoriteService.addFavoriteToMeal(info)
            .then(favorite => {
                console.log(favorite)
                res.send(favorite)
            })
    }

    const findAllUsersForAFavorite = (req, res) => {
        let recipeId = req.params.mealId
        favoriteService.findAllUsersForAFavorite(recipeId)
        .then(favo => {
            // console.log(favo)
            res.send(favo)
        })
    }

    const findAllFavoritesForAUser = (req, res) => {
        let username = req.params.username
        favoriteService.findAllFavoritesForAUser(username)
            .then(favo => {
                console.log(favo)
                res.send(favo)
            })
    }

    const findAllFavorites = (req, res) => {
        return favoriteService.findAllFavorites()
            .then(favo => {
                console.log(favo)
                res.send(favo)
            })
    }

    const findFavoriteForUserAndMealID = (req, res) => {
        let recipeId = req.params.mealId
        let username = req.params.username
        return favoriteService.findFavoriteForUserAndMealID({recipeId: recipeId, username: username})
            .then(favo => {
                console.log(favo)
                res.send(favo)
            })
    }

    const deleteFavoriteForUserAndMealID = (req, res) => {
        let recipeId = req.params.mealId
        let username = req.params.username
        return favoriteService.deleteFavorite({recipeId: recipeId, username: username})
        // .then(favo => {
        //     res.send(favo)
        // })
    }


app.post('/api/favorites', addFavoriteToMeal);
app.get('/api/favorites', findAllFavorites);
app.get('/api/favorites/id/:mealId', findAllUsersForAFavorite);
app.get('/api/favorites/:username', findAllFavoritesForAUser);
app.get('/api/favorites/:mealId/:username', findFavoriteForUserAndMealID);
app.delete('/api/favorites/:mealId/:username', deleteFavoriteForUserAndMealID)
}