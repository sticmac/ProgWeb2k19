const assert = require('assert');
const fetch = require("node-fetch");

const data = require("./utils/data");
const mongo = require('../modules/db/mongoClient');

describe('Nutri-score', function () {
    beforeEach(() => {
        mongo.init(data);
    });
    afterEach(() => {
        mongo.clean();
    });
    describe('Get nutri-score', function () {

        it('return one product', () => {
            return fetch('http://localhost:3000/nutriscore/item/0000000000031')
                .then(res => {
                    // console.log(res);
                    return res.json()
                })
                .then(json => {
                    assert.equal(0, json.nutriscore)
                });
        });

    });
});