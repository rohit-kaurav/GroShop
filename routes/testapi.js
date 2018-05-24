const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').objectId;
const app = express();

const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/grocery-shop', (err, db) => {
        if (err) return console.log(err);

        closure(db.db());
    });
};

const sendError = (err, res) => {
    response.status = 501,
        response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
}

let response = {
    status: 200,
    data: [],
    message: null
};

router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users').find().toArray().then((users) => {
            response.data = users;
            res.send(response);
        }).catch((err) => {
            sendError(err, res);
        });
    });
});

module.exports = router;