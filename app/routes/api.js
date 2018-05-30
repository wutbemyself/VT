const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var log4js = require('log4js');
var logger = log4js.getLogger();
// logger.level = 'debug';
logger.level = 'info';

// ============================= MYSQL =========================================
var mysql = require('mysql');
var ConMysql = require('../config/Connection');
// var con = mysql.createConnection(ConMysql);
// con.connect();
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mean'

});
connection.connect();
// ============================= MYSQL =========================================
// ============================= MONGO =========================================
// const connecttion = (closure) => {
//     return MongoClient.connect("mongodb://localhost:27017/mean", (err, db) => {
//         if (err) return console.log("connected failed." + err);
//         closure(db);
//     });
// }

// const sendError = (err, res) => {
//     response.status = 501;
//     response.message = typeof err == 'object' ? err.message : err;
//     res.status(501).json(response);
// }

// router.get('/users', (req, res) => {
//     connecttion((db) => {
//         db.collection('users')
//             .find()
//             .toArray()
//             .then((users) => {
//                 response.data = users;
//                 res.json(response);
//             })
//             .catch((err) => {
//                 sendError(err, res);
//             });
//     });
// });
// ============================= MONGO =========================================
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
}

let response = {
    status: 200,
    data: [],
    message: null
}


router.get('/users', (req, res) => {
    connection.query('select * from user ', function (err, users) {
        if (err) { throw err; }
        response.data = users;
        res.json(response);
    });
});

router.post('/users/insert', (req, res) => {
    var data = [];
    data.push(req.body);
    var sql = "SELECT max(id) as MAX FROM `user` limit 1"
    connection.query(sql, function (err, id) {
        var id = parseInt(id[0].MAX) + 1;
        var sql = "INSERT INTO `user`(`id`, `user`, `password`) VALUES (";
        for (let i = 0; i < data.length; i++) {
            sql += `'` + (id + i) + `','` + data[i].user + `','` + data[i].pwd + `'`;
        }
        sql += `)`;
        connection.query(sql, function (err, users) {
            if (err) {
                throw err;
            }
            response.data = {
                status: 200,
                data: data,
                resultCode: 'success'
            }
            logger.info("Insert data successfuly.");
            logger.debug(JSON.stringify(response.data));
            res.json(response);
            
        });
    });
});

module.exports = router;