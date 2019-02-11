const assert = require('assert');
const fetch = require("node-fetch");
const mongo = require("../../modules/db/mongoClient");
const data = require("../utils/data");
const User = require("../../modules/db/model/User");

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

    describe("User db tests", function () {
        it('should create a new account', function () {
            const user = User.build({
                name: "test",
                email: "test@test.fr",
                password: "1234565"
            });
            user.save();

            User.get("test@test.fr")
                .then(value => {
                    assert.ok(value);
                    assert.equal(user, value);

                });
        });
    });
});