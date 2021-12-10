require('dotenv').config();  // local development

const AWS = require('aws-sdk');
AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'users';

const findUserByUsername = async (username) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            username,
        },
    }

    return await dynamoClient.get(params).promise().catch((error) => {
        console.log("error finding user");
        console.log(error);
    });
};

const findAllUsers = async () => { 
    const params = {
        TableName: TABLE_NAME,
    }

    return await dynamoClient.scan(params).promise().catch((error) => {
        console.log("error finding all users");
        console.log(error);
    });
}

const createUser = async (newUser) => {
    const params = { 
        TableName: TABLE_NAME,
        Item: newUser,
    }

    return await dynamoClient.put(params).promise().catch((error) => {
        console.log("error creating user");
        console.log(error);
    });
}

const findUserByCredentials = async (credentials) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            username: credentials.username,
            password: credentials.password,
        },
    }
    return await dynamoClient.get(params).promise();
}

const updateProfile = async (userName, profile) => {
    const params = { 
        TableName: TABLE_NAME,
        Item: {
            username: userName,
            email: profile.email,
            gender: profile.gender,
            area: profile.area,
            bio: profile.bio,
            flavor: profile.flavor,
            portrait: profile.portrait,
        },
    }

    return await dynamoClient.put(params).promise().catch((error) => {
        console.log("error updating profile");
        console.log(error);
    });
}

// createUser({
//     username: "testing",
//     password: "pass"
// })

// createUser({
//     username: "testing2",
//     email: "email",
//     credentials: {

//     },
// })
// findAllUsers();
// findUserByUsername("testing2")
// updateProfile("testing2", {
//     email: 'updateEmail',
//     gender: 'updateGender',
//     area: 'updateArea',
//     bio: 'updateBio',
//     flavor: 'updateFlavor',
//     portrait: 'updatePortrait',
// })

module.exports = {
    findUserByUsername,
    createUser,
    findUserByCredentials,
    updateProfile,
    findAllUsers
} 