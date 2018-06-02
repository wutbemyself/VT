const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var SECRET = 'KEEEN-VT';
const Mysql = require('../models/mysql');
const User = require('../module/User/user');


router.post('/users/register', (req, res) => {
    var data = [];
    data.push(req.body);
    var sql = "SELECT max(id) as MAX FROM `user` limit 1";
    User.cryptPassword(data[0].pwd, (err, pwd) => {
        Mysql.query(sql, function (err, id) {
            var id = parseInt(id[0].MAX) + 1;
            var sql = "INSERT INTO `user`(`id`, `user`, `password`) VALUES (";
            for (let i = 0; i < data.length; i++) {
                sql += `'` + (id + i) + `','` + data[i].user + `','` + pwd + `'`;
            }
            sql += `)`;
            Mysql.query(sql, function (err, users) {
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