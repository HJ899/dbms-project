const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authenticate');
const passport = require('passport')

router.get('/register', authMiddleWare.getRegister);

router.get('/register/:role', authMiddleWare.getRegisterWithRole);

router.post('/register', authMiddleWare.validateForm, passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true,
    successFlash: true
}))

router.get('/login', authMiddleWare.getLogin);

router.post('/login', passport.authenticate('signin', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: true
}));

router.get('/logout', authMiddleWare.logout);

module.exports = router;