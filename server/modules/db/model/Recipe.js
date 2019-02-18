const mongoClient = require("../mongoClient");
const {ObjectID} = require("mongodb");
const AbstractModel = require("./AbstractModel");
const KEYS = ["id", "name", "image", "description", "price", "time_required", "products", "comments"];
const COLLECTION = "recipes";

class Recipe extends AbstractModel {

    //TODO:: store image as binaries
    constructor(object = null) {
        super();
        if (!!object) {
            this._id = new ObjectID();
            this.name = object.name;
            this.image = object.image;
            this.description = object.description;
            this.price = object.price;
            //TODO: compute price using products prices
            this.time_required = object.time_required;
            this.products = object.products;
            this.comments = [];
        }

    }

    toJson() {
        return {
            _id: this._id,
            name: this.name,
            image: this.image,
            description: this.description,
            price: this.price,
            time_required: this.time_required,
            products: this.products,
            comments: this.comments,
        }
    }

    save() {
        return new Promise((resolve, reject) => mongoClient.insertOne(COLLECTION, this.toJson())
            .then(value => {
                resolve(this.toJson())
            })
            .catch(reason => reject(reason)));
    }

    update(newValues) {
        return new Promise((resolve, reject) => {
            for (let key in newValues) {
                switch (key) {
                    case KEYS[0] :
                        throw Error("Cannot update Id");
                    case KEYS[1] :
                        this.name = newValues[key];
                        break;
                    case KEYS[2] :
                        this.image = newValues[key];
                        break;
                    case KEYS[3] :
                        this.description = newValues[key];
                        break;
                    case KEYS[4] :
                        this.price = newValues[key];
                        break;
                    case KEYS[5] :
                        this.time_required = newValues[key];
                        break;
                    case KEYS[6] :
                        this.products = newValues[key];
                        break;
                    case KEYS[7] :
                        this.comments = newValues[key];
                        break;
                    default:
                        throw Error("'" + key + "' is not a property of Recipe.");
                }
            }
            mongoClient.updateOne(COLLECTION, this._id, this.toJson())
                .then(() => resolve(this))
                .catch(reason => reject(reason))
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            mongoClient.delete(COLLECTION, this._id)
                .then(() => resolve())
                .catch(reason => reject(reason))
        })
    }

    addComment(comment) {
        return new Promise((resolve, reject) =>
            mongoClient.pushToOneArray(COLLECTION, this._id, comments, {
                id: new ObjectID(),
                content: comment.content,
                author: comment.author,
                date: comment.date
            })
                .then(value => resolve(this.toJson()))
                .catch(reason => reject(reason)));
    }
}

function fromJson(json) {
    let recipe = new Recipe();
    recipe._id = json._id;
    recipe.name = json.name;
    recipe.image = json.image;
    recipe.description = json.description;
    recipe.price = json.price;
    recipe.time_required = json.time_required;
    recipe.products = json.products;
    recipe.comments = [];
    return recipe;
}

module.exports = {
    get: (id) => {
        return new Promise((resolve, reject) =>
            mongoClient.findOneBy(COLLECTION, {_id: new ObjectID(id)})
                .then(value => resolve(fromJson(value)))
                .catch(reason => reject(reason)))
    },
    build: (object) => {
        let missingKeys = [];
        if (!Object.keys(object).find(value => value === "products")) {
            object.products = []
        }
        if (!Object.keys(object).find(value => value === "comments")) {
            object.comments = []
        }

        KEYS.forEach(key => {
            if (key !== 'id' && !Object.keys(object).find(value => value === key)) {
                missingKeys.push(key);
            }
        });
        if (missingKeys.length > 0) {
            throw Error({
                error: 'Some attributes are missing.'
                , missingAttributes: missingKeys
            })
        }
        return new Recipe(object);
    },
    findAll: (params) => {
        return new Promise((resolve, reject) => {
            mongoClient.findAll(COLLECTION, params)
                .then(values => {
                    resolve(values.map(v => fromJson(v)))
                })
                .catch(reason => reject(reason))
        });
    }
};