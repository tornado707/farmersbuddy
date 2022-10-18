const User = require('../models/User');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            User.findOne({
                where: {
                    email: email
                }
            }).then(user => {
                if (user.role === "Admin") {
                    return done(null, user);
                } else {
                    res.send("Not Admin");
                    return done(null, false, { message: 'Not  Admin' });
                }

            });
        })
    );

    //serialize
    passport.serializeUser(function(user, done) {

        done(null, user.id);

    });

    // deserialize user 
    passport.deserializeUser(function(id, done) {

        User.findByPk(id).then(function(user) {

            if (user) {

                done(null, user.get());

            } else {

                done(user.errors, null);

            }

        });

    });
};