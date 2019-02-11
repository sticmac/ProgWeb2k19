const express = require('express');
const router = express.Router();
const db = require("../modules/db/mongoClient");
const auth = require("./auth");

function comparePrices(a, b) {
    return a.price - b.price;
}

router.get('/:id', auth.optional, (req, res, next) => {
    res.status(200);
    res.send([
        {price: 3.5, shop: "Neto"},
        {price: 25, shop: "Auchan"},
        {price: 17, shop: "Lidl"}
    ].sort(comparePrices));
});

module.exports = router;