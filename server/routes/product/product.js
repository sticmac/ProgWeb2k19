const express = require('express');
const router = express.Router();
const db = require("../../modules/db/mongoClient");

/* GET home page. */
router.get('/:key_word', (req, res, next) => {

    db.findByRegex("products", "product_name", ".*" + req.params.key_word + ".*").then(value => {
            res.status(200);
            if (value.length === 0) {
                res.send({msg: "Nothing found."})
            } else {
                res.send(value.map(v =>
                    ({
                        name: v.product_name,
                        ingredients: v.ingredients_text_with_allergens_en
                    })))
            }
        }
    ).catch(reason => {
        console.error(reason);
        res.status(404);
        res.send("Not Found");
    })


});


module.exports = router;
