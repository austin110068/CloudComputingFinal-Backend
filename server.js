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
app.use(cors({credentials: true, origin:'https://wbdv-sp21-mealfortoday.herokuapp.com' }));
// 'https://wbdv-sp21-mealfortoday.herokuapp.com'
const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/project-db',
//     {useNewUrlParser: true, useUnifiedTopology: true})

// mongoose.connect('mongodb://localhost:27017/project-db',
//     {useNewUrlParser: true, useUnifiedTopology: true})
// "mongodb+srv://xiang:zhang@whiteboard-a8.bd3rw.mongodb.net/projectdb?retryWrites=true&w=majority"

const mongoAtlasUri = "mongodb+srv://xiang:zhang@whiteboard-a8.bd3rw.mongodb.net/projectdb?retryWrites=true&w=majority";
mongoose.connect(mongoAtlasUri,
    {useNewUrlParser: true, useUnifiedTopology: true});


//Configures CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://wbdv-sp21-mealfortoday.herokuapp.com');
    res.header('Access-Control-Allow-Headers',
        'Content-Type, X-Requested-With, Origin');
    res.header('Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


require('./controllers/demos.controller')(app)
require('./controllers/user-controller')(app)
require('./controllers/recipes-controller')(app)
require('./controllers/favorites-controller')(app)

app.listen(process.env.PORT || 4000)