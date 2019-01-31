const express = require('express');
const router = express.Router();
const db = require("../modules/db/mongoClient");

function buildImageURL(item) {
    // src="https://static.openfoodfacts.org/images/products/000/000/003/0113/ingredients_fr.17.200.jpg"
    if (!!item.images) {
        let str = "https://static.openfoodfacts.org/images/products/";
        if (item.images.front_fr) {
            let chunk = [];
            for (let i = 0; i < item._id.length; i += 3) {
                chunk.push(item._id.substring(i, i + 3));
            }
            if (chunk[chunk.length - 1].length < 3) {
                chunk[chunk.length - 2] += chunk[chunk.length - 1];
                chunk = chunk.filter((value, index) => index !== chunk.length - 1)
            }
            str += chunk.join("/") + "/front_fr";
            const front = item.images.front_fr;
            str += "." + front.rev + ".full.jpg";
            return str
        }
        return null;
    } else {
        return null;
    }


}

function getParams(req, res) {

    let params = {};

    if (!req.query.pageLength && req.query.pageNumber) {
        res.status(400);
        res.send({error: "Cannot use 'pageNumber' without 'pageLength'"});
        return null;
    } else if (req.query.pageLength && !req.query.pageNumber) {
        res.status(400);
        res.send({error: "Cannot use 'pageLength' without 'pageNumber'"});
        return null;
    }
    if (!!req.query.pageLength && !!req.query.pageNumber) {
        params.pageLength = parseInt(req.query.pageLength);
        params.pageNumber = parseInt(req.query.pageNumber);
    }
    if (params.pageNumber <= 0) {
        res.status(400);
        res.send({error: "Page number must superior or equal to '1'."})
        return null;
    }
    return params;
}


/* GET home page. */
router.get('/', (req, res, next) => {
    const params = getParams(req, res);
    if (!!params) {
        db.findAll("france", params)
            .then(value => {
                res.status(200);

                res.send(value.map(v => {
                        console.log({
                            id: v._id,
                            name: v.product_name || "unknown",
                            ingredients: v.ingredients_text_with_allergens_fr || v.ingredients_text_fr || "",
                            image_url: buildImageURL(v) || null
                        });
                        return ({
                            id: v._id,
                            name: v.product_name || "unknown",
                            ingredients: v.ingredients_text_with_allergens_fr || v.ingredients_text_fr || "",
                            image_url: buildImageURL(v) || null
                        })
                    }
                ))
            })
            .catch(reason => {
                console.error(reason);
                res.status(404);
                res.send("Not Found");
            })
    }


});

//TODO:: check should not be case sensible
router.get('/:key_words', (req, res, next) => {
    const params = getParams(req, res);
    if (!!params) {
        const keyWordArray = req.params.key_words.split("+");
        console.log(".*(" + keyWordArray.join("|") + ")+.*");
        const regex = keyWordArray.length > 1 ? ".*(" + keyWordArray.join("|") + ")+.*" : ".*" + keyWordArray[0] + ".*";
        db.findByRegex("france", "product_name", regex, params)
            .then((values) => {
                res.status(200);
                res.send(values.map(v => {
                    return {
                        id: v._id,
                        name: v.product_name || "unknown",
                        ingredients: v.ingredients_text_with_allergens_fr || v.ingredients_text_fr || "",
                        image_url: buildImageURL(v) || null

                    }
                }));
            })
            .catch(reason => {
                console.error(reason);
                res.status(404);
                res.send({error: "Not Found"});

            });
    }

});

router.get('/item/:id', (req, res, next) => {
    db.findOneBy("france", {_id: req.params.id})
        .then(value => {
            console.log("**********");
            console.log(req.params.id);
            console.log(value);
            console.log("**********");
            res.status(200);
            res.send(value);
        })
        .catch(reason => {
            console.error(reason);
            res.status(404);
            res.send({error: "Resource not found"});
        })
});


module.exports = router;
