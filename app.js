const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

//test db connection
const db = require('./config/database');

// Passport Config
require('./config/passport')(passport);

db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const app = express();

//handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//bodyparser
app.use(bodyParser.urlencoded({ extended: false }));


//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//express session middleware
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

//index router
//app.get('/', (req, res) => res.render('welcome', { layout: 'landing' }));
app.use('/', require('./routes/index'));
//route
//app.use('/', require('./routes/login'));
app.use('/users' ,require('./routes/users'));
app.use('/crop', require('./routes/crop'));
app.use('/flower', require('./routes/flower'));
app.use('/fertilizer', require('./routes/fertilizer'));
app.use('/machine', require('./routes/machine'));
app.use('/fruit', require('./routes/fruit'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server started on ${PORT}...`));