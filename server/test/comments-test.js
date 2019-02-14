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

function createRecipe(token) {
    const recipe = {
        name: "Test",
        price: 2,
        time_required: 15,
        description: "Lorem ipsum",
        image: ""
    }
    return new Promise(resolve =>
        fetch("http://localhost:3000/recipes/", {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "authorization": "Token " + token
            },
            body: JSON.stringify({recipe: recipe})
        })
            .then(res => {
                res.json().then(json => {
                    resolve(json)
                });
            }))
}


describe('Recipes', function () {
    beforeEach(() => {
        mongo.init(data);
        user = User.build({
            name: "Test",
            password: "123456",
            email: "test@test.fr"
        });
        user.save();
    });
    afterEach(() => {
        mongo.clean();
    });
    describe("Add comment to recipes", function () {
        it('should add a comment to a recipe', function () {
            return login()
                .then(token => {
                    return createRecipe(token)
                        .then(recipe => {
                            console.log("recipe " + JSON.stringify(recipe));
                            return fetch("http://localhost:3000/recipes/" + recipe._id + "/comment",
                                {
                                    method: 'POST',
                                    mode: "cors",
                                    headers: {
                                        "Content-Type": "application/json",
                                        "authorization": "Token " + token
                                    },
                                    body: JSON.stringify({
                                        author: user.name,
                                        content: "C'est super bon wallah",
                                        date: "12/03/2019"
                                    })
                                })
                                .then(res => {
                                    console.log(res.status);
                                    assert.equal(200, res.status);
                                    return res.json()
                                })
                                .then(json => {
                                    // console.log("JSON : " + json);
                                })
                        })
                });
        });
    });

})
;