const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var SECRET = 'KEEEN-VT';
var Mysql = require('../models/mysql');
var User = require('../module/User/user');

const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
}

router.post('/users/authenticate', (req, res, next) => {
    
    const username = req.body.user;
    const password = req.body.pwd;
    User.getUserByUsername(req,username, (err, pwd) => {
        if (err) throw err
        if (!pwd) {
            return res.json({
                status: 500,
                resultCode: 'User not found.'
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

module.exports = router;