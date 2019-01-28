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
        });

        it('should return first page of the list products', function () {
            return fetch('http://localhost:3000/products?pageLength=10&pageNumber=1')
                .then(res => res.json())
                .then(json => {
                    assert.equal(10, json.length)
                });
        });

        it('should return an error about query params', function () {
            return fetch('http://localhost:3000/products?pageLength=10')
                .then(res => {
                    assert.equal(400, res.status);
                    return res.json();
                })
                .then(json => {
                    assert.equal("Cannot use 'pageLength' without 'pageNumber'", json.error)
                })
        });

    });
});