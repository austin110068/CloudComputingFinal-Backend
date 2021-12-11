const favoritesModel = require("../models/favorite/favorite-model")

require('dotenv').config();  // local development

const AWS = require('aws-sdk');
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'favorites';

const findAllUsersForAFavorite = async (recipeId) => {
    const params = {
        TableName: TABLE_NAME,
        key: {
            recipeId
        },
    }

    return await dynamoClient.get(params).promise()
        .catch((error) => {
            console.log("error favorite");
            console.log(error);
    });
    // return favoritesModel.find({recipeId: recipeId})
    // .populate('favorites').exec()
}

const addFavoriteToMeal = (info) => {
    console.log(info)
    return favoritesModel.create(info)
}

const findAllFavoritesForAUser = async (username) => {
    const params = {
        TableName: TABLE_NAME,
        key: {
           username
        },
    }

    return await dynamoClient.get(params).promise()
        .catch((error) => {
            console.log("error favorite");
            console.log(error);
        });
    // return favoritesModel.find({username: username})
    //     .populate('favorites').exec()
}

const findAllFavorites = async () => {
    const params = {
        TableName: TABLE_NAME,
    }

    return await dynamoClient.scan(params).promise()
        .catch(e => {
        console.log("error finding all users");
        console.log(e);
        })

    // return favoritesModel.find()
}

const findFavoriteForUserAndMealID = async (info) => {
    const params = {
        TableName: TABLE_NAME,
        FilterExpression : 'username = :username and recipeId = :recipeId',
        ExpressionAttributeValues : {
            ':username' : info.username,
            ':recipeId' :  info.recipeId
        }
    }

    return await dynamoClient.scan(params).promise()
        .catch((error) => {
            console.log("error finding favorite by user and meal id");
            console.log(error);
    });;
    // return favoritesModel.findOne(info)
}

const deleteFavorite = async (info) => {
    const params = {
        TableName: TABLE_NAME,
        FilterExpression : 'username = :username and recipeId = :recipeId',
        ExpressionAttributeValues : {
            ':username' : info.username,
            ':recipeId' :  info.recipeId
        }
    }

    return await dynamoClient.delete(params).promise()
        .catch((error) => {
            console.log("error deleting favorite by user and meal id");
            console.log(error);
        });;
}
    // favoritesModel.deleteOne(info)



module.exports = {
    findAllUsersForAFavorite,
    addFavoriteToMeal,
    findAllFavoritesForAUser,
    findAllFavorites,
    findFavoriteForUserAndMealID,
    deleteFavorite
}