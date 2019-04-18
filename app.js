const express = require('express'),
    mysql = require('mysql2');
    path = require('path');

const app = express();

const createTables = require('./util/createTables');
const indexRoutes = require('./routes/index');
const registerRouters = require('./routes/register');

createTables();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/register', registerRouters);
app.use('/', indexRoutes);



app.listen(3000, () => {
    console.log('App listening on port 3000!');
});