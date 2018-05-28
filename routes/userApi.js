const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').objectId;
const app = express();
const jwt = require('jsonwebtoken');

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
    // status: 200,
    data: []
    // message: null
};

let User = {
    firstname: '',
    lastname: '',
    age: null,
    username: '',
    password: '',
    email: '',
    isAdmin:false
}

router.post('/username_exists',(req,res) => {
    connection((db) => {
        db.collection('users')
            .find({ 'username' : req.body.username })
            .toArray()
            .then(user => {
                if(user.length){
                    console.log("User not available ");
                    res.status(200).send({
                        message : "User already present"
                    })
                }
                res.status(200).send({
                    message : "User available"
                })
            })
    })
});
router.post('/email_exists',(req,res) => {
    connection((db) => {
        db.collection('users')
            .find({ 'email' : req.body.email })
            .toArray()
            .then(user => {
                if(user.length){
                    res.status(200).send({
                        message : "Email already present"
                    })
                }
                res.status(200).send({
                    message : "Email available"
                })
            })
    })
});

router.post('/login', (req, res, body) => {
    connection((db) => {
        db.collection('users')
            .find({ 'username': req.body.username, 'password': req.body.password })
            .toArray()
            .then((user) => {
                if (user.length) {
                    User.firstname = user[0].firstname;
                    User.lastname = user[0].lastname;
                    User.username = user[0].username;
                    User.age = user[0].age;
                    User.email = user[0].email;
                    User.password = null;
                    User.isAdmin = user[0].admin;
                    let token = jwt.sign(User, 'grocery-shop', { expiresIn: 30 });
                    return res.status(200).send({
                        token: token,
                        id: user[0]._id
                    });
                }
                res.status(400).send({
                    token: null,
                    id: null
                });
            }).catch((err) => {
                sendError(err, res);
            });
    });
});

router.post('/signup', (req, resp, body) => {
    User.firstname = req.body.firstname;
    User.lastname = req.body.lastname;
    User.age = req.body.age;
    User.username = req.body.username;
    User.password = req.body.password;
    User.email = req.body.email;
    connection((db) => {
        db.collection('users')
            .insertOne(User, (err, res) => {
                if (err) console.log(err);
                console.log("Documented Inserted Successfully",res);
                resp.status(200).send({
                    message:"User Registration Successful",
                    data:res
                })
            });
    });
});



module.exports = router;