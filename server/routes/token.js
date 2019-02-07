const express = require('express');
const router = express.Router();
const User = require("../modules/db/model/User");
const passport = require("passport");
const auth = require("./auth");

router.post("/", auth.optional, (req, res, next) => {
    const {email, password} = req.body;
    if (!email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if (!password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    passport.authenticate('local', {session: false}, (err, passportUser, info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            const user = passportUser;
            return res.json({user: user});
        }
        return res.status(400).info;
    })(req, res, next);
});

module.exports = router;