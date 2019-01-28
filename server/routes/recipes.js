const {ObjectID} = require("mongodb");

const express = require('express');
const router = express.Router();
const db = require("../modules/db/mongoClient");
const COLLECTION = "receipes";

router.get("/", (req, res, next) => {
    if (!req.query.pageLength && req.query.pageNumber) {
        res.status(400);
        res.send({error: "Cannot use 'pageNumber' without 'pageLength'"});
    } else if (req.query.pageLength && !req.query.pageNumber) {
        res.status(400);
        res.send({error: "Cannot use 'pageLength' without 'pageNumber'"});
    }
    db.findAll(COLLECTION, req.query)
        .then(value => {
            res.status(200);
            res.send(value)
        })
        .catch(reason => {
            res.status(404);
            console.log(reason);
            res.send({error: "Not found"})
        })
});

router.get("/item/:id", (req, res, next) => {
    db.findOneBy(COLLECTION, {_id: new ObjectID(req.params.id)})
        .then(value => {
            res.status(200);
            console.log(value);
            res.send(value);
        })
        .catch(reason => {
            console.log(reason);
            res.status(404);
            res.send({error: "Not found"})
        });
});

router.post("/", (req, res, next) => {
    console.log(req);
    db.insertOne(COLLECTION, req.body.recipe)
        .then(value => {
            res.status(200);
            console.log("POST: " + value);
            res.send(value);
        })
        .catch(reason => {
            res.status(400);
            console.log(reason);
            res.send({error: "Impossible to add this recipe."});
        })
});

router.put("/item/:id", (req, res, next) => {
    db.updateOne(COLLECTION, new ObjectID(req.params.id), req.body.recipe)
        .then(value => {
            res.status(200);
            res.send(value);
        })
        .catch(reason => {
            res.status(400);
            res.send({error: "Impossible to update this recipe."});
            console.log(reason);
        })

});

module.exports = router;