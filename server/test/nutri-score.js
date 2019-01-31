const assert = require('assert');
const fetch = require("node-fetch");

describe('Nutri-score', function () {
    describe('Get nutri-score', function () {

        it('return one product', () => {
            return fetch('http://localhost:3000/nutriscore/item/00')
                .then(res => res.json())
                .then(json => {
                    assert.ok(!!json.nutriscore)
                });
        });

    });
});