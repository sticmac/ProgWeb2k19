const express = require('express');
const router = express.Router();
const db = require("../modules/db/mongoClient");
const auth = require("./auth");

function comparePrices(a, b) {
    return a.price - b.price;
}

router.get('/:id', auth.optional, (req, res, next) => {
    db.findOneBy("france", {
        _id: req.params.id
    })
    .then(value => {
        res.status(200);
        if (!value.prices){
            res.send([]);
        } else {
            res.send(value.prices.sort(comparePrices));
        }
    })
    .catch(err => {
        console.error(err);
        res.status(404);
        res.send({error: "Not Found"});
    })
});

module.exports = router;