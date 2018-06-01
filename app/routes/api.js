const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var SECRET = 'KEEEN-VT';
const User = require('./user')
var mysql = require('mysql');
var con = require('../config/Connection.json');
var connection = mysql.createConnection(con.mysql);
connection.connect();
// var MysqlConnection = require('../module/mysql-Connect/Connection'); 
// var connection = new MysqlConnection();
// // ============================= MYSQL =========================================
// var mysql = require('mysql');
// var ConMysql = require('../config/Connection');
// var connection = mysql.createConnection(ConMysql);
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'mean'

// });
// connection.connect((err) => {
//     if (err) {
//         console.log('Disconnect to database ' + err);
//     }
// });
// // ============================= MYSQL =========================================
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
}

let response = {
    status: 200,
    data: [],
    resultCode: null
}


// router.get('/users', (req, res) => { 
//     connection.query('select * from user ', function (err, users) { 
//         if (err) { throw err; }
//         response.data = users;
//         res.json(response);
//     });
// });

router.post('/users/authenticate', (req, res, next) => {
    const username = req.body.user;
    const password = req.body.pwd;
    User.getUserByUsername(username, (err, pwd) => {
        if (err) throw err
        if (!pwd) {
            return res.json({
                success: false,
                msg: 'User not found.'
            });
        }
        User.comparePassword(password, pwd, (err, isMatch) => {
            if (err) throw err;
            var data = {
                user: username,
                password: pwd,
            }
            if (isMatch) {
                const token = jwt.sign(data, SECRET, {
                    expiresIn: 604800
                })
                console.log(JSON.stringify({ status: 200, data: { data: data.user, token: 'JWT' + token }, resultCode: "success" }));
                res.json({ status: 200, data: { data: data.user, token: 'JWT' + token }, resultCode: "success" });
            } else {
                console.log({
                    status: 500,
                    resultCode: 'Wrong password.'
                });
                return res.json({
                    status: 500,
                    resultCode: 'Wrong password.'
                })
            }
        })
    })
});


router.post('/users/register', (req, res) => {
    var data = [];
    data.push(req.body);
    var sql = "SELECT max(id) as MAX FROM `user` limit 1";
    User.cryptPassword(data[0].pwd, (err, pwd) => {
        connection.query(sql, function (err, id) {
            var id = parseInt(id[0].MAX) + 1;
            var sql = "INSERT INTO `user`(`id`, `user`, `password`) VALUES (";
            for (let i = 0; i < data.length; i++) {
                sql += `'` + (id + i) + `','` + data[i].user + `','` + pwd + `'`;
            }
            sql += `)`;
            connection.query(sql, function (err, users) {
                if (err) {
                    throw err;
                }
                response = {
                    status: 200,
                    data: data,
                    resultCode: 'success'
                };
                console.log("Insert data successfuly.");
                console.log(JSON.stringify({ status: 200, data: response, resultCode: "success" }));
                res.json({ status: 200, data: response, resultCode: "success" });

            });
        });
    });
});
module.exports = router;