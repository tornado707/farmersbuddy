const express = require('express');
const router = express.Router();
const exphbs = require('express-handlebars');
const db = require('../config/database');
const User = require('../models/User');
const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const passport = require('passport');


router.get('/login', (req,res) => {
	res.render('login' ,{layout : 'cleaner'});
});

router.get('/register', (req,res) => {
	res.render('register' ,{layout : 'cleaner'});
});

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields.  ' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match.  ' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters.  ' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
      layout : 'cleaner'
    });
  } else {
    User.findOne({where: { email: email }}).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists.  ' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
          layout : 'cleaner'
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          role: "Admin"
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
              	req.flash('success_msg' , 'You can now log in');
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;