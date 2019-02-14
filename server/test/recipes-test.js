const assert = require('assert');
const fetch = require("node-fetch");
const mongo = require("../modules/db/mongoClient");
const data = require('./utils/data');
const User = require("../modules/db/model/User");
let user = null;


function login() {
    return new Promise(resolve => {
        fetch("http://localhost:3000/token/", {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user.email,
                password: "123456"
            })
        })
            .then(res => res.json().then(json => resolve(json.user.token)))
    });
}


describe('Recipes', function () {
    before(() => {
        mongo.init(data);
        user = User.build({
            name: "Test",
            password: "123456",
            email: "test@test.fr"
        });
        user.save();
    });
    after(() => {
        mongo.clean();
    });
    describe("Add and update receipes", function () {
        it('should add a new recipe in the db', function () {
            return login()
                .then(token => {
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
                        .then(json => console.log("RES : " + JSON.stringify(json)))
                })

        });

        it('List all', () => {
            return fetch('http://localhost:3000/recipes/')
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    assert.equal(1, json.length)
                });
        });
    });

});