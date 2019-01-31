const express = require('express');
const router = express.Router();
const db = require("../modules/db/mongoClient");
const nutriScore = require("../modules/nutriScore");

/* GET home page. */
router.get('/item/:id', (req, res, next) => {

    db.findOneBy("france", {
        _id: req.params.id
    })
        .then(value => {
            res.status(200);
            //TODO:: use promise
            console.log("************");
            console.log(value);
            console.log("************");
            const nutriscore = nutriScore.compute(value.nutriments);
            console.log(nutriscore);
            res.send({nutriscore: nutriscore})
        })
        .catch(reason => {
            console.error(reason);
            res.status(404);
            res.send({error: "Not Found"});
        })


});

module.exports = router;
