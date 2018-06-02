const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var SECRET = 'KEEEN-VT';
const Mysql = require('../../models/mysql');
const User = require('../../module/User/user');

module.exports.Authenticate = function (req, res) {
    const username = req.body.user;
    const password = req.body.pwd;
    User.getUserByUsername(username, res, (err, pwd) => {
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
                res.writeHead({ status: 200, data: { data: data.user, token: 'JWT' + token }, resultCode: "success" });
            } else {
                console.log({
                    status: 500,
                    resultCode: 'Wrong password.'
                });
                res.json({
                    status: 500,
                    resultCode: 'Wrong password.'
                })
            }
        })
    })
}

