'use strict';
// _ - reference to lodash
module.exports = function (_, passport, User, validator){
    return {
        SetRouting: function (router){
          router.get('/', this.indexPage);
          router.get('/signup', this.getSignUp);

          router.get('/auth/facebook', this.getFacebookLogin);
          router.get('/auth/facebook/callback', this.facebookLogin);


         // router.post('/signup', User.SignUpValidation, this.postSignUp);
            router.post('/signup', [
                validator.check('username').not().isEmpty().isLength({min: 5}).withMessage('Username is required and must be at leadt 5 characters'),
            validator.check('email').not().isEmpty().isEmail().withMessage('Email is invalid'),
                validator.check('password').not().isEmpty().withMessage("Password is required")
            ], this.postValidation, this.postSignUp);
            router.post('/', [
                validator.check('email').not().isEmpty().isEmail().withMessage('Email is invalid'),
                validator.check('password').not().isEmpty().withMessage("Password is required")
            ], this.postValidation, this.postLogin);
         // router.post('/', User.LoginValidation, this.postLogin);
        },
        indexPage: function(req,res){
            const errors = req.flash('error');
            return res.render('index', {title: "Messenger | Login", messages: errors, hasErrors: errors.length >0});
        },
        getSignUp: function (req, res){
            const errors = req.flash('error');
            console.log(errors);
          return res.render('signup', {title: "Messenger | SignUp", messages: errors, hasErrors: errors.length >0});
        },
        getFacebookLogin: passport.authenticate('facebook', {
            scope: 'email'
        }),
        facebookLogin: passport.authenticate('facebook', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),
        postValidation: function(req,res,next) {
            const err = validator.validationResult(req);
            const reqErrors = err.array();
            const errors = reqErrors.filter(e => e.msg !== 'Invalid value');
            const messages = [];
            errors.forEach((error) => {
                messages.push(error.msg);
            });
            //req.flash('error', messages);
            if(messages.length >0 ){
                req.flash('error', messages);
                if(req.url === '/signup'){
                    res.redirect('/signup');
                }else if(req.url === '/'){
                    res.redirect('/');
                }
            }

            return next();
            // console.log(err);
        },
        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '',
            failureFlash: true
        }),
        postLogin: passport.authenticate('local.login', {
            successRedirect: '/home',
            failureRedirect: '',
            failureFlash: true
        })
    }
}