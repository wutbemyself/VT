const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var log4js = require('log4js');
var logger = log4js.getLogger();
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var SECRET = 'KEEEN-VT';
logger.level = 'info';
const User = require('./user')
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
connection.connect((err) => {
    if (err) {
        console.log('Disconnect to database ' + err);
    }
});
// ============================= MYSQL =========================================
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
                logger.info(JSON.stringify({ success: true, token: 'JWT' + token }));
                res.json({ success: true, token: 'JWT' + token })
            } else {
                logger.info({
                    success: false,
                    msg: 'Wrong password.'
                });
                return res.json({
                    success: false,
                    msg: 'Wrong password.'
                })
            }
        })
    })
});

router.post('/users/insert', (req, res) => {
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
});

router.post('/users/register', (req, res) => {

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
            logger.info(JSON.stringify(response.data));
            res.json(response);

        });
    });

});

module.exports = router;