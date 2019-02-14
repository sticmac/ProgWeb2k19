const express = require('express');
const router = express.Router();
const db = require("../modules/db/mongoClient");
const auth = require("./auth");

function getChunk(id) {
    let chunk = [];
    for (let i = 0; i < id.length; i += 3) {
        chunk.push(id.substring(i, i + 3));
    }
    if (chunk[chunk.length - 1].length < 3) {
        chunk[chunk.length - 2] += chunk[chunk.length - 1];
        chunk = chunk.filter((value, index) => index !== chunk.length - 1)
    }
    return chunk;
}

function buildImageURL(item) {
    // src="https://static.openfoodfacts.org/images/products/000/000/003/0113/ingredients_fr.17.200.jpg"
    if (!!item.images) {
        let str = "https://static.openfoodfacts.org/images/products/";
        // console.log(item);
        if (item._id.length === 13) {
            let chunk = getChunk(item._id);
            str += chunk.join("/") + "/";
        } else {
            str += item._id + "/";
        }
        let image = null, key = null;
        if (!!item.images.front_fr) {
            key = "front_fr";
            image = item.images.front_fr;
        } else {
            key = Object.keys(item.images).find(value => RegExp("front").test(value));
            image = item.images[key];
        }
        if (!image) {
            return null;
        }
        str += key + "." + image.rev + ".full.jpg";
        return str
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

function comparePrices(a, b) {
    return a.price - b.price;
}

function filterValues(values, allergens, price) {
    var result = values;
    if (allergens) {
        result = result.filter(v => !(new RegExp(allergens.split("+").join("|"), 'i').test(JSON.stringify(v))));
    }
    if (price) {
        console.log(result);
        result = result.filter(v => v.prices === null || v.prices ? v.prices.sort(comparePrices)[0].price < price : true);
    }
    return result;
}


/* GET home page. */
router.get('/', auth.optional, (req, res, next) => {
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

router.get('/:key_words', auth.optional, (req, res, next) => {
    const params = getParams(req, res);
    console.log(req.query);
    if (!!params) {
        const keyWordArray = req.params.key_words.split("+");
        console.log(".*(" + keyWordArray.join("|") + ")+.*");
        const regex = keyWordArray.length > 1 ? ".*(" + keyWordArray.join("|") + ")+.*" : ".*" + keyWordArray[0] + ".*";
        db.findByRegex("france", "product_name", regex, params)
            .then((values) => {
                
                res.status(200);
                res.send(filterValues(values, req.query.allergens, req.query.price).map(v => {
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

router.get('/item/:id', auth.optional, (req, res, next) => {
    db.findOneBy("france", {_id: req.params.id})
        .then(value => {
            res.status(200);
            res.send({
                id: value._id,
                name: value.product_name,
                ingredients: value.ingredients_text_with_allergens_fr,
                image_url: buildImageURL(value),
                quantity: value.quantity,
                brands: value.brands,
                nutriments: value.nutriments,
                packaging: value.packaging,
                categories: value.categories,
                categories_hierarchy: value.categories_hierarchy,
                serving_size: value.serving_size
            });
        })
        .catch(reason => {
            console.error(reason);
            res.status(404);
            res.send({error: "Resource not found"});
        })
});


module.exports = router;

