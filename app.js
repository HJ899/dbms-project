//LIBRARY INCLUDES
const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const passport = require('passport');
const configurePassport = require('./util/passport');

//OWN INCLUDES
const createTables = require('./util/createTables');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/authenticate');

configurePassport(passport);
createTables();

//SETTING EJS AS TEMPLATING ENGINE
app.set('view engine', 'ejs');
app.set('views', 'views');

//SOME BASIC MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

//CONFIGURING PASSPORT
app.use(session({
    secret: 'Hotel Management System',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//SETTING RES.LOCALS
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash('error');
    next();
});

//ROUTES CONFIGURE
app.use(authRoutes)
app.use(indexRoutes);

//CATCH ALL ROUTE
app.get('*', (req,res,next) => {
    res.render('page-not-found', { pageTitle: "Page Not Found", counterTime: 5 });
})

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});