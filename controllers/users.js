'use strict';
// _ - reference to lodash
module.exports = function (_, passport){
    return {
        SetRouting: function (router){
          router.get('/', this.indexPage);
          router.get('/signup', this.getSignUp);
          router.get('/home', this.getHomePage);
          router.post('/signup', this.postSignUp);
        },
        indexPage: function(req,res){
            return res.render('index');
        },
        getSignUp: function (req, res){
          return res.render('signup');
        },
        getHomePage: function (req,res){
            return res.render('home');
        },
        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        })
    }
}