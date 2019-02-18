const assert = require('assert');
const fetch = require("node-fetch");
const mongo = require("../modules/db/mongoClient");
const data = require('./utils/data');
const User = require("../modules/db/model/User");
const Recipe = require("../modules/db/model/Recipe");
let token = null;


function login() {
    return new Promise((resolve, reject) => {
        fetch("http://localhost:3000/token/", {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: "recipe@test.fr",
                password: "123456"
            })
        })
            .then(res => {
                res.text().then(json => {
                    resolve(JSON.parse(json).user.token)
                })
            })
    });
}


describe('Recipes', function () {

    before(() => {
        return mongo.init(data)
            .then(() => {
                let user = User.build({
                    name: "Test",
                    password: "123456",
                    email: "recipe@test.fr"
                });
                return user.save()
                    .then(() => {
                        return login()
                            .then(value => {
                                token = value;
                            })
                    });
            });

    });

    after(() => {
        mongo.clean();
    });

    describe("Add and update recipes", function () {


        it('should return the specified recipe', function () {
            return fetch("http://localhost:3000/recipes/", {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Token " + token
                },
                body: JSON.stringify({
                    recipe: {
                        name: "Test",
                        price: 2,
                        time_required: 15,
                        description: "Lorem ipsum",
                        image: ""
                    }
                })
            })
                .then(res => res.json())
                .then(recipe => {
                    return fetch('http://localhost:3000/recipes/item/' + recipe._id)
                        .then(res => {
                            assert.equal(res.status, 200);
                            return res.json()
                        })
                        .then(json => {
                            assert.equal(json._id, recipe._id);
                        })
                })
        });

        it('should add a new recipe in the db', function () {
            return fetch("http://localhost:3000/recipes/", {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": "Token " + token
                },
                body: JSON.stringify({
                    recipe: {
                        name: "Test",
                        price: 2,
                        time_required: 15,
                        description: "Lorem ipsum",
                        image: ""
                    }
                })
            })
                .then(res => {
                    assert.equal(200, res.status);
                    return res.json()
                })
                .then(json => {
                    console.log("RES : " + JSON.stringify(json))
                })

        });

        it('List all', () => {
            Recipe.build({
                "_id": {
                    "$oid": "5c65270ae7179a27eb606a0c"
                },
                "id": "5c652437aa3b532021193327",
                "name": "Test",
                "image": "",
                "description": "Lorem ipsum",
                "price": 2,
                "time_required": 15,
            }).save();
            return fetch('http://localhost:3000/recipes/')
                .then(res => res.json())
                .then(json => {
                    assert.equal(3, json.length)
                });
        });

    });

});