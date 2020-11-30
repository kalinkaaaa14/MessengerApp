'use strict';
const passport = require('passport');
const User =require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

//gets the user id and saves it in the session
passport.serializeUser((user, done) =>{
    done(null, user.id);
});

passport.deserializeUser((id,done) => {
    User.findById(id, (err, user) =>{
        done(err, user);
    });
});
