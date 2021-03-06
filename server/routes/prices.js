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
        console.log(value);
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

router.post('/:id', auth.required, (req, res, next) => {
    console.log("body", req.body);
    db.pushToOneArray("france", {
        _id: req.params.id
    }, "prices", req.body)
    .then(value => {
        res.status(200);
        res.send();
    })
    .catch(err => {
        console.error(err);
        res.status(404);
        res.send({error: "Not Found"});    
    })
});

module.exports = router;