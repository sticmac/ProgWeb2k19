const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
// const url = 'mongodb://localhost/off';
// "mongodb://root:toor123@ds159624.mlab.com:59624/mongo-vietnam"
const url = process.env.MONGO_URL || "mongodb://localhost/mongo-vietnam";

// Database Name
const dbName = 'mongo-vietnam';

// Create a new MongoClient
const client = new MongoClient(url);
let db;

client.connect((err) => {
    if (err) {
        console.error(err);
    }
    db = client.db(dbName);
});
//TODO:: use on connection by function to ensure the connection is reset each time.
//That would allow to not have to reboot server when connection is down for a few sec

function listCollections() {
    return new Promise((resolve, reject) => {
        db.listCollections().toArray(function (err, collInfos) {
            if (err) {
                reject(err);
            }
            resolve(collInfos);
        });

    })
}

function insertMany(collection, documents) {
    return new Promise((resolve, reject) => {
        db.collection(collection)
            .insertMany(documents, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });

    })
}

module.exports = {
    delete: (collection, id) => {
        return new Promise((resolve, reject) =>
            db.collection(collection)
                .deleteOne({_id: id},
                    (err, res) => {
                        if (!!err) {
                            reject(err);
                        }
                        resolve(res);
                    })
        )
    },
    updateOne: (collection, id, newValue) => {
        return new Promise((resolve, reject) =>
            db.collection(collection).update(id, {$set: newValue},
                (err, res) => {
                    if (!!err) {
                        reject(err);
                    }
                    resolve(res);
                }));
    },
    clean: () => {
        listCollections()
            .then(collections => {
                    collections.forEach(collection => {
                        db.collection(collection.name)
                            .deleteMany({});
                    })
                }
            );
    },
    init: (data) => {
        listCollections()
            .then(collections => {
                if (collections.length === 0) {
                    db.createCollection("france");
                    db.createCollection("user");
                    db.createCollection("recipes");
                }
                insertMany("france", data.products);
            });

    },
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
        return insertMany(collection, documents);
    },
    listCollections: () => {
        return listCollections();
    },
    findOneBy: (collection, criteria) => {
        return new Promise((resolve, reject) => {
            db.collection(collection).findOne(criteria, (mongoError, objects) => {
                if (mongoError) {
                    reject(mongoError);
                }
                if (!objects) {
                    reject({error: "Not Found."})
                }
                resolve(objects);
            })
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
    findByRegex: (collection, object_key, regex, params) => {
        const criteria = {};
        criteria[object_key] = {$regex: regex, $options: "i"};
        // console.log(criteria);
        return new Promise((resolve, reject) => {
            (!!params.pageLength && !!params.pageNumber ?
                    db.collection(collection).find(criteria).skip(params.pageLength * (params.pageNumber - 1)).limit(params.pageLength) :
                    db.collection(collection).find(criteria)
            ).toArray((mongoError, objects) => {
                if (mongoError) {
                    reject(mongoError);
                }
                resolve(objects);
            })
        })
    },
    findAll: (collection, params) => {
        return new Promise((resolve, reject) => {
            (params && !!params.pageLength && !!params.pageNumber ?
                    db.collection(collection).find({}).skip(params.pageLength * (params.pageNumber - 1)).limit(params.pageLength) :
                    db.collection(collection).find({})
            ).toArray((mongoError, objects) => {
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