const express = require('express');
const router = express.Router();
const db = require("../modules/db/mongoClient");
const auth = require("./auth");

router.get('/', auth.optional, (req, res, next) => {
    res.sendFile("public/index.html");
});

/* GET home page. */
router.get('/example', auth.optional, (req, res, next) => {
    db.listCollections().then(value => {
        db.findAll("france").then(value1 => {
            let tmp = "";
            value1.forEach((v, id) => tmp += id + ' : ' + JSON.stringify(v) + "<br/><br/>");
            res.send(JSON.stringify(value) + "<br/><br/><br/><br/>" + tmp);
        })
    });

});

module.exports = router;
