const assert = require('assert');
const fetch = require("node-fetch");

describe('Product', function () {
    describe('product search', function () {

        it('return one product', function () {
            return fetch('http://localhost:3000/products/lignaform')
                .then(res => res.json())
                .then(val => {
                    assert.equal(1, val.length)
                });
        });

        it('should get more than one product', function () {
            return fetch('http://localhost:3000/products/lignaform+Farine')
                .then(res => res.json())
                .then(json => {
                    console.log(json.length);
                    assert.equal(38, json.length)
                });
        });

        // it('should list all products', function () {
        //     fetch('http://localhost:3000/products')
        //         .then(res => res.json())
        //         .then(json => console.log(json));
        // });

    });
});