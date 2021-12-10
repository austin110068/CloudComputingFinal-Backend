const express = require('express')
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const session = require('express-session')
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

require('dotenv').config();
const cors = require('cors');

// Local Development
app.use(cors({credentials: true, origin: 'http://localhost:3000' }));

// Production Development
// app.use(cors({credentials: true, origin: 'https://wbdv-sp21-mealfortoday.herokuapp.com' }));

const dynamoDB = require('aws-sdk');
dynamoDB.config.update({region: process.env.AWS_REGION})

// Configures CORS
app.use(function (req, res, next) {
    // Local Development
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Production Development
    // res.header('Access-Control-Allow-Origin', 'https://wbdv-sp21-mealfortoday.herokuapp.com');

    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


require('./controllers/demos.controller')(app, dynamoDB)
require('./controllers/user-controller')(app, dynamoDB)
require('./controllers/recipes-controller')(app, dynamoDB)
require('./controllers/favorites-controller')(app, dynamoDB)

app.listen(process.env.PORT || 4000)