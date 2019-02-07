const express = require('express');
const router = express.Router();
const Recipe = require("../modules/db/model/Recipe");
const auth = require("./auth");


router.get("/", auth.optional, (req, res, next) => {
    if (!req.query.pageLength && req.query.pageNumber) {
        res.status(400);
        res.send({error: "Cannot use 'pageNumber' without 'pageLength'"});
    } else if (req.query.pageLength && !req.query.pageNumber) {
        res.status(400);
        res.send({error: "Cannot use 'pageLength' without 'pageNumber'"});
    }
    Recipe.findAll(req.query)
        .then(value => {
            res.status(200);
            res.send(value)
        })
        .catch(reason => {
            res.status(404);
            console.error(reason);
            res.send({error: "Not found"})
        })
});

router.get("/item/:id", auth.optional, (req, res, next) => {
    Recipe.get(req.params.id)
        .then(value => {
            res.status(200);
            res.send(value);
        })
        .catch(reason => {
            console.error(reason);
            res.status(404);
            res.send({error: "Not found"})
        });
});

router.post("/", auth.required, (req, res, next) => {

    Recipe.build(req.body.recipe).save()
        .then(value => {
            res.status(200);
            res.send(value);
        })
        .catch(reason => {
            res.status(400);
            console.error(reason);
            res.send({error: "Impossible to add this recipe."});
        })
});

router.put("/item/:id", auth.required, (req, res, next) => {
    Recipe.get(req.params.id).update(req.body.recipe)
        .then(value => {
            res.status(200);
            res.send(value);
        })
        .catch(reason => {
            res.status(400);
            res.send({error: "Impossible to update this recipe."});
            console.error(reason);
        })

});

module.exports = router;