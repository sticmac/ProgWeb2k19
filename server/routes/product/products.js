const express = require('express');
const router = express.Router();
const db = require("../../modules/db/mongoClient");

/* GET home page. */
router.get('/', (req, res, next) => {

    db.findAll("france")
        .then(value => {
            res.status(200);

            res.send(value.map(v =>
                ({
                    name: v.product_name,
                    ingredients: v.ingredients_text_with_allergens_en
                })))
        })
        .catch(reason => {
            console.error(reason);
            res.status(404);
            res.send("Not Found");
        })


});

router.get('/:key_words', (req, res, next) => {

    const keyWordArray = req.params.key_words.split("+");
    console.log(keyWordArray);
    Promise.all(
        keyWordArray.map(keyWord =>
            db.findByRegex("france", "product_name", ".*" + keyWord + ".*")
        )
    ).then((values) => {
        res.status(200);
        const entries = [];
        values.forEach(value => {
            value.forEach(entry => entries.push(entry))
        });
        res.send(entries.map(v => {
            return {
                id: v._id,
                name: v.product_name,
                ingredients: v.ingredients_text_with_allergens_en
            }
        }));
    }).catch(reason => {
        console.error(reason);
        res.status(404);
        res.send("Not Found");

    });

});

router.get('/id/:id', (req, res, next) => {
    db.findBy("france", {_id: req.params.id})
        .then(value => {
            console.log(value);
            res.status(200);
            res.send(value);
        })
        .catch(reason => {
            res.status(404);
            console.log(reason);
            res.send("Resource not found");
        })
});


module.exports = router;
