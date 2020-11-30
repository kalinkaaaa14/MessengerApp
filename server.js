const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('flash');
const passport = require('passport');

//./ - тому що в одній директорії як server.js
const container = require('./container');


//adding configuration for the app
container.resolve(function (users){
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/messengerApp');

    const app = SetupExpress();

    function SetupExpress(){
        const app = express();
        const server = http.createServer(app);
        server.listen(3000, function(){
            console.log("Listening on port 3000");
        });

        ConfigureExpress(app);

        //setup router
        const router = require('express-promise-router')();
        users.SetRouting(router);

        app.use(router);
    }


    function ConfigureExpress(app){
        //render every file in public folder
        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:false}));

        app.use(validator());
        app.use(session({
            secret: 'thisisasecretkey',
            resave: true,
            saveInitialized: true,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }));

        app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    }
});