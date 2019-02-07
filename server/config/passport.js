const User = require('../modules/db/model/User');
const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
    User.get(email)
        .then((user) => {
            if (!user || !user.validatePassword(password)) {
                return done(null, false, {errors: {'email or password': 'is invalid'}});
            }

            return done(null, user.toAuthJSON());
        })
        .catch(reason => {
            console.log(reason);
            done(reason);
        });
}));