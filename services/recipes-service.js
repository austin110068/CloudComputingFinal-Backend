// const recipesModel = require('../models/recipe/recipe-model')

require('dotenv').config();  // local development

const AWS = require('aws-sdk');
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'recipes';

const createRecipe = (name, recipe) => {
    return recipesModel
        .create(recipe)
    // const params = {
    //     TableName: TABLE_NAME,
    //     Item: recipe
    // }
}

const findAllRecipe = () =>
    recipesModel.find()

const findRecipe = (name) =>
     recipesModel.find({strMeal: name})

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