const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
// const url = 'mongodb://localhost/off';
const url = "mongodb://root:toor123@ds159624.mlab.com:59624/mongo-vietnam";

// Database Name
const dbName = 'mongo-vietnam';

// Create a new MongoClient
const client = new MongoClient(url);
let db;

client.connect((err) => {
    if (err) {
        console.error(err);
    }
    db = client.db(dbName)
});


module.exports = {
    insertOne: (collection, document) => {
        return new Promise((resolve, reject) => {
            db.collection(collection)
                .insertOne(document, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });

        })
    },
    insertMany: (collection, documents) => {
        return new Promise((resolve, reject) => {
            db.collection(collection)
                .insertMany(documents, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });

        })
    },
    listCollection: () => {
        return new Promise((resolve, reject) => {
            db.listCollections().toArray(function (err, collInfos) {
                if (err) {
                    reject(err);
                }
                resolve(collInfos);
            });

        })
    },
    findBy: (collection, criteria) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).find(criteria).toArray((mongoError, objects) => {
                if (mongoError) {
                    reject(mongoError);
                }
                resolve(objects);
            })
        })
    },
    findByRegex: (collection, object_key, regex) => {
        const criteria = {};
        criteria[object_key] = {$regex: regex};
        console.log(criteria);
        return new Promise((resolve, reject) => {
            db.collection(collection).find(criteria).toArray((mongoError, objects) => {
                if (mongoError) {
                    reject(mongoError);
                }
                resolve(objects);
            })
        })
    },
    findAll: (collection) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).find({}).toArray((mongoError, objects) => {
                if (mongoError) {
                    reject(mongoError);
                }
                resolve(objects);
            })
        })
    },
    close: () => {
        client.close();
    }
};