const express = require('express');
const router = express.Router();
const Recipe = require("../modules/db/model/Recipe");
const auth = require("./auth");

router.post("/:id/comment", auth.required, (req, res, next) => {
    const comment = req.body;
    if (!Object.keys(comment).find(k => k === "author" || k === "content" || k === "date")) {
        res.status(400);
        res.send({error: "A comment must be contain : {author, date, content}."})
    } else {
        Recipe.get(req.params.id)
            .then(recipe => {
                recipe.addComment(comment)
                    .then(value => {
                        res.status(200);
                        res.send(value.toJson());
                    })
                    .catch(reason => {
                        res.status(500);
                        res.send(JSON.stringify(reason))
                    })
            })
            .catch(reason => {
                console.error(reason);
                res.status(404);
                res.send({error: "Not found"})
            })
    }
});

router.get("/:id/comments", auth.optional, (req, res, next) => {
    Recipe.get(req.params.id)
        .then(value => {
            res.status(200);
            console.log(value.comments);
            res.send(value.comments)
        })
        .catch(reason => {
            res.status(404);
            console.error(reason);
            res.send({error: "Not found"})
        })
});

module.exports = router;