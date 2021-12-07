const usersModel = require("../models/users-model")
// const profileModel = require("../models/profile/profile-model")

const findUserByUsername = (username) => {
    return usersModel.find({username: username})
}

const findAllUsers = () => {
    return usersModel.find()
}

const createUser = (newUser) => {
    return usersModel.create(newUser)
}

const findUserByCredentials = (credentials) => {
    return usersModel.findOne({username: credentials.username, password: credentials.password})
}

const findProfileByUsername = (username) => {
    return usersModel.find({username})
        .populate("profile")
        .exec()
}

const updateProfile = (username, profile) => {
    {console.log(profile)}
    return usersModel.updateOne({username: username}, {$set: profile})
}


//const findAllFavoritesForAUser = (username) = {
//    return usersModel.find({username: username})
//        .populate('users').exec()
//}


module.exports = {
    findUserByUsername,
    createUser,
    findUserByCredentials,
    findProfileByUsername,
    updateProfile,
    findAllUsers
}