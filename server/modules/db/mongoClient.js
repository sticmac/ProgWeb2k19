const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'off';

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