const roles = require('../config/roles');
const validator = require('validator');
const User = require('../models/User');

exports.getRegister = (req,res,next) => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.redirect('/register/user');
};

exports.getRegisterWithRole = (req,res,next) => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    const role = req.params.role;
    let check = false;
    for(let role_check of roles.roles){
        if(role_check == role){
            check = true;
        }
    }
    if(!check){
        return res.redirect('/register');
    }
    res.render('register', {
        pageTitle: 'Register',
        role: role,
        path: '/register'
    });
};

exports.getLogin = (req,res,next) => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.render('login', {
        pageTitle: 'Login',
        path: '/login'
    })
}
exports.logout = (req,res,next) => {
    if(!req.isAuthenticated()){
        return res.redirect('/');
    }
    req.logout();
    req.flash('success', 'Logged you out');
    res.redirect('/');
}

exports.validateForm = (req,res,next) => {
    errors = [];
    if(validator.isEmpty(req.body.firstName)){
        errors.push("Please enter your name");
    }
    if(validator.isEmpty(req.body.lastName)){
        errors.push('Please enter your last name');
    }
    if(!validator.isEmail(req.body.email)){
        errors.push('Email entered is Invalid');
    }
    if(!validator.isLength(req.body.password, { max: 60, min:6 })){
        errors.push('Password must be between 6-60 characters long');
    }   
    if( req.body.password !== req.body.passwordConf){
        errors.push('Passwords do not match');
    }
    if(!(validator.isNumeric(req.body.contact) && req.body.contact.length == 10)){
        errors.push('Invalid Phone Number');
    }
    if(errors.length > 0){
        return res.render('/register/' + req.body.role, {
            errors: errors, 
            path: '/register',
            pageTitle: 'Register'
        })
    }
    User.findByEmail(req.body.email).then(([rows, fielData]) => {
        if(rows.length){
            errors.push('Email already exists')
            res.render('/register/' + req.body.role, {
                errors: errors,
                path: '/register',
                pageTitle: 'Register',
            })
        }else{
            next();
        }
    }).catch(err => res.redirect('/'))
}