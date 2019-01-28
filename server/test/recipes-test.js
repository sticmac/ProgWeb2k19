const assert = require('assert');
const fetch = require("node-fetch");

describe('Recipes', function () {
    describe("Add and update receipes", function () {
        it('should add a new recipe in the db', function () {
            return fetch("http://localhost:3000/recipes/", {
                method: 'POST',
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
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
                    // console.log(res);
                    res.json()
                })
                .then(json => console.log(json))
        });
    });

    describe('Recipe search', function () {

        // it('List all', () => {
        //     return fetch('http://localhost:3000/recipes/')
        //         .then(res => res.json())
        //         .then(json => {
        //             assert.equal(1, json.length)
        //         });
        // });

    })
});