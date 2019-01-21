const express = require('express');
const router = express.Router();
const db = require("../modules/db/mongoClient");

router.get('/', (req, res, next) => {
  res.sendFile("public/index.html");
});

/* GET home page. */
router.get('/example', (req, res, next) => {
    db.listCollection().then(value => {
        db.findAll("vietnam").then(value1 => {
            tmp = "";
            value1.forEach((v, id) => tmp += id + ' : ' + JSON.stringify(v) + "<br/><br/>");
            res.send(JSON.stringify(value) + "<br/><br/><br/><br/>" + tmp);
        })
    });

});

module.exports = router;
