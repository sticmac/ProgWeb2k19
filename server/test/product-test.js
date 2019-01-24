const assert = require('assert');
const fetch = require("node-fetch");

describe('Product', function () {
    describe('product search', function () {

        it('return one product', () => {
            return fetch('http://localhost:3000/products/lignaform')
                .then(res => res.json())
                .then(val => {
                    assert.equal(1, val.length)
                });
        });

        it('should get more than one product', () => {
            return fetch('http://localhost:3000/products/lignaform+Farine')
                .then(res => res.json())
                .then(json => {
                    assert.equal(38, json.length)
                });
        });

        it("should return the entire item", () => {
            return fetch('http://localhost:3000/products/id/00')
                .then(res => res.json())
                .then(json => {
                    assert.ok(!!json)
                })
        })

        // it('should list all products', function () {
        //     fetch('http://localhost:3000/products')
        //         .then(res => res.json())
        //         .then(json => console.log(json));
        // });

    });
});