const assert = require('assert');
const fetch = require("node-fetch");
const mongo = require("../modules/db/mongoClient");
const data = require("./utils/data");


describe('User', function () {
    before(() => {
        try {
            mongo.init(data);
        } catch (e) {
            mongo.clean();
            mongo.init(data);
        }
    });
    after(() => {
        mongo.clean();
    });

    describe("Handle user accounts", function () {
        it('should create a new account', function () {
            return fetch("http://localhost:3000/account/", {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: "Test",
                    email: "test@tets.fr",
                    password: "123456789"

                })
            })
                .then(res => {
                    assert.equal(res.status, 200);
                    return res.json()
                })
                .then(json => {
                    assert.ok(json.token);
                    // console.log(json)
                })
        });

        it('should prevent the creation of second account with same email', function () {
            return fetch("http://localhost:3000/account/", {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: "Test",
                    email: "test@tets.fr",
                    password: "123456789"

                })
            })
                .then(() => {
                    return fetch("http://localhost:3000/account/", {
                        method: 'POST',
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: "Test",
                            email: "test@tets.fr",
                            password: "123456789"

                        })
                    })
                }).then(res => {
                    assert.equal(400, res.status);
                    return res.json()
                }).then(json => {
                    assert.equal(json.error, "Account already exists using email: test@tets.fr")
                })

        });

        it('get the token from the account', function () {
            return fetch("http://localhost:3000/token/", {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: "test@tets.fr",
                    password: "123456789"

                })
            })
                .then(res => {
                    assert.equal(res.status, 200);
                    return res.json()
                })
                .then(json => {
                    assert.ok(json.user.token);
                })
        });
    });

});