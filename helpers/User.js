'use strict';

module.exports = function(){
    return {
        // SignUpValidation: (req, res, next) => {
        //     req.check('username', 'Username is Required').notEmpty();
        //     req.check('username', 'Username Must Not Be Less Than 5').isLength({min: 5});
        //     req.check('email', 'Email is Required').notEmpty();
        //     req.check('email', 'Email is Invalid').isEmail();
        //     req.check('password', 'Password is Required').notEmpty();
        //     req.check('password', 'Password Must Not Be Less Than 5').isLength({min: 5});
        //
        //     req.getValidationResult()
        //         .then((result) => {
        //             const errors = result.array();
        //             const messages = [];
        //             errors.forEach((error) => {
        //                 messages.push(error.msg);
        //             });
        //
        //             req.flash('error', messages);
        //             res.redirect('/signup');
        //         })
        //         .catch((err) => {
        //             return next();
        //         })
        // },
        //
        // LoginValidation: (req, res, next) => {
        //     req.checkBody('email', 'Email is Required').notEmpty();
        //     req.checkBody('email', 'Email is Invalid').isEmail();
        //     req.checkBody('password', 'Password is Required').notEmpty();
        //     req.checkBody('password', 'Password Must Not Be Less Than 5').isLength({min: 5});
        //
        //     req.getValidationResult()
        //         .then((result) => {
        //             const errors = result.array();
        //             const messages = [];
        //             errors.forEach((error) => {
        //                 messages.push(error.msg);
        //             });
        //
        //             req.flash('error', messages);
        //             res.redirect('/');
        //         })
        //         .catch((err) => {
        //             return next();
        //         })
        // }
    }
}

