const express = require('express');
const router = express.Router();
const User = require("../modules/db/model/User");
const auth = require("./auth");


router.post("/", auth.optional, (req, res, next) => {

    User.get(req.body.email)
        .then(() => {
            res.status(400);
            res.send({error: "Account already exists using email: " + req.body.email})
        })
        .catch(() => {
            try {
                const user = User.build(req.body);
                user.save();
                res.status(200);
                res.send(user.toAuthJSON())
            } catch (e) {
                console.error(e);
                res.status(400);
                res.send(e)
            }
        });

});

module.exports = router;