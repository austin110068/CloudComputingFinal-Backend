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
        Key: {
            recipeId
        },
    }

    return await dynamoClient.get(params).promise()
        .catch((error) => {
            console.log("error findAllUsersForAFavorite");
            console.log(error);
    });
}

const addFavoriteToMeal = async (info) => {
    const params = {
        TableName: TABLE_NAME,
        Item: {
            username: info.username,
            recipeId: info.recipeId,
        }
    }

    return await dynamoClient.put(params).promise()
        .catch((error) => {
            console.log("error addFavoriteToMeal");
            console.log(error);
        });;
}

const findAllFavoritesForAUser = async (username) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
           username
        },
    }

    return await dynamoClient.get(params).promise()
        .catch((error) => {
            console.log("error findAllFavoritesForAUser");
            console.log(error);
        });
}

const findAllFavorites = async () => {
    const params = {
        TableName: TABLE_NAME,
    }
    
    return await dynamoClient.scan(params).promise()
        .catch(e => {
        console.log("error finding all favorites");
        console.log(e);
        })
}

const findFavoriteForUserAndMealID = async (info) => {
    console.log("findFavoriteForUserAndMealID: ", info);
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
}

const deleteFavorite = async (info) => {
    console.log("deleteFavorite: ", info);
    const params = {
        TableName: TABLE_NAME,
        Key: {
            // 'username' : info.username,
            // 'recipeId' : info.recipeId
            info
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
