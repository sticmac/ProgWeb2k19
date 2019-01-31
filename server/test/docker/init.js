const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGO_URL || "mongodb://localhost/mongo-vietnam";
const data = require("../utils/data");

const dbName = 'mongo-vietnam';

const client = new MongoClient(url);
let db;

client.connect((err) => {
    if (err) {
        console.error(err);
    }
    db = client.db(dbName);
    db.createCollection("france");
    db.createCollection("recipes");
    db.collection('france').insertMany(data.products, (err, docs) => {
        if (!err) {
            console.log("INIT OK");
        } else {
            console.log(err);
        }
    });
});

