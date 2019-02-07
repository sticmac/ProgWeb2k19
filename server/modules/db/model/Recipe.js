const mongoClient = require("../mongoClient");
const {ObjectID} = require("mongodb");
const AbstractModel = require("./AbstractModel");
const KEYS = ["id", "name", "image", "description", "price", "time_required", "products"];
const COLLECTION = "recipes";

class Recipe extends AbstractModel {

    //TODO:: store image as binaries
    constructor(object) {
        super();
        this._id = new ObjectID();
        this.name = object.name;
        this.image = object.image;
        this.description = object.description;
        this.price = object.price;
        //TODO: compute price using products prices
        this.time_required = object.time_required;
        this.products = object.products;

    }

    toJson() {
        return {
            id: this._id,
            name: this.name,
            image: this.image,
            description: this.description,
            price: this.price,
            time_required: this.time_required,
            products: this.products
        }
    }

    save() {
        return mongoClient.insertOne(COLLECTION, this.toJson());
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
                    default:
                        throw Error("'" + key + "' is not a property of Recipe.");
                }
            }
            mongoClient.updateOne(COLLECTION, id, this.toJson())
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

}

module.exports = {
    get: (id) => {
        return new Promise((resolve, reject) =>
            mongoClient.findOneBy(COLLECTION, {_id: id})
                .then(value => resolve(new Recipe(value)))
                .catch(reason => reject(reason)))
    },
    build: (object) => {
        let missingKeys = [];
        for (let key in KEYS) {
            if (!(key in object)) {
                missingKeys.push(key);
            }
        }

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
                .then(values =>
                    resolve(values.map(v => new Recipe(v))))
                .catch(reason => reject(reason))
        });
    }
};