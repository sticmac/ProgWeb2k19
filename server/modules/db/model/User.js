const {ObjectID} = require("mongodb");
const AbstractModel = require("./AbstractModel");
const db = require("../mongoClient");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const COLLECTION = "users";
const KEYS = ["id", "name", "password", "email"];

class User extends AbstractModel {

    constructor(object = null) {
        super();
        if (!!object) {
            this.id = new ObjectID();
            this.name = object.name;
            this.password = crypto.createHmac('sha256', object.password).digest('hex');
            this.email = object.email;
        }
    }


    toJson() {
        return {
            id: this.id,
            name: this.name,
            password: this.password,
            email: this.email
        }
    }

    save() {
        return db.insertOne(COLLECTION, this.toJson());
    }

    udpate(newValues) {
        return new Promise((resolve, reject) => {
            for (let key in newValues) {
                switch (key) {
                    case KEYS[0] :
                        throw Error("Cannot update Id");
                    case KEYS[1] :
                        this.name = newValues[key];
                        break;
                    case KEYS[2] :
                        this.password = newValues[key];
                        break;
                    case KEYS[3] :
                        this.email = newValues[key];
                        break;
                    default:
                        throw Error("'" + key + "' is not a property of Recipe.");
                }
            }
            db.updateOne(COLLECTION, id, this.toJson())
                .then(() => resolve(this))
                .catch(reason => reject(reason))
        });
    }

    delete() {
        return db.delete(COLLECTION, this._id);
    }


    validatePassword(password) {
        const hash = crypto.createHmac('sha256', password).digest('hex');
        return this.password === hash;
    };

    generateJWT() {
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(today.getDate() + 60);

        return jwt.sign({
            email: this.email,
            id: this._id,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        }, 'secret');
    }

    toAuthJSON() {
        return {
            _id: this._id,
            email: this.email,
            name: this.name,
            token: this.generateJWT(),
        };
    };
}

fromJson = (json) => {
    let user = new User();
    user.id = json.id;
    user.name = json.name;
    user.password = json.password;
    user.email = json.email;
    return user;
};

module.exports = {
    // fromJson: fromJson,
    get: (email) => {
        return new Promise((resolve, reject) =>
            db.findOneBy(COLLECTION, {email: email})
                .then(value => {
                    resolve(fromJson(value))
                })
                .catch(reason => reject(reason)))
    },
    build: (object) => {
        let missingKeys = [];
        KEYS.forEach(key => {
            if (key !== 'id' && !Object.keys(object).find(value => value === key)) {
                missingKeys.push(key);
            }
        });

        if (missingKeys.length > 0) {
            throw Error('Some attributes are missing : [' + missingKeys.join(",") + ']');
        }
        return new User(object);
    }
};