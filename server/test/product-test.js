const assert = require('assert');
const fetch = require("node-fetch");
const data = require("./utils/data");
const mongo = require('../modules/db/mongoClient');

describe('Product', function () {
    beforeEach(() => {
        mongo.init(data);
    });
    afterEach(() => {
        mongo.clean();
    });
    describe('product search', function () {

        it('return one product', () => {
            return fetch('http://localhost:3000/products/Cacao')
                .then(res => res.json())
                .then(val => {
                    assert.equal(1, val.length)
                });
        });

        it('should get more than one product', () => {
            return fetch('http://localhost:3000/products/Cacao+pouet')
                .then(res => res.json())
                .then(json => {
                    assert.equal(2, json.length)
                });
        });

        it("should return the entire item", () => {
            return fetch('http://localhost:3000/products/item/0000000000031')
                .then(res => {
                    return res.json()
                })
                .then(json => {
                    assert.ok(!!json)
                })
        });

        it('should return first page of the list products', function () {
            return fetch('http://localhost:3000/products?pageLength=10&pageNumber=1')
                .then(res => res.json())
                .then(json => {
                    assert.equal(2, json.length)
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