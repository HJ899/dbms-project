const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');
const dbConfig = require('../config/database_config');

module.exports = (passport) => {
    passport.use('signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, function(email, password, done){
        User.findByEmail(email).then(([rows, fieldData]) => {
            if(!rows.length){
                return done(null, false, { message: 'That e-mail is not registered'});
            }
            bcrypt.compare(password, rows[0].Password, (err, res) => {
                if(err){
                    done(err);
                }else{
                    if(res) { done(null, rows[0], { message: 'Logged In Successfully' }) }
                    else { done(null, false, { message: 'Incorrect Password'}) }
                }
            })
        }).catch(err => done(err));
    }));
    passport.use('signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req,email,password,done){
        const newUser = new User(email, null , req.body.firstName, req.body.lastName, req.body.contact, req.body.role);
        bcrypt.hash(password, 10)
            .then((hashPassword) => {
                newUser.password = hashPassword;
                return newUser.save()
            })
            .then(() => done(null, newUser))
            .catch(err => done(err));
    }));
    passport.serializeUser((user, done) => {
        done(null, user[dbConfig.User.attr.email]); 
    });

    passport.deserializeUser((email, done) => {
        User.findByEmail(email)
        .then(([rows, fieldData]) => {
            done(null, rows[0])
        })
        .catch(err => done(err));
    })
}