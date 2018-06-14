const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');
var SECRET = 'KEEEN-VT';
var moment = require('moment');
var User = require('../module/User/user');
var memCache = require('memory-cache');
var date = Date.now();
date = moment(date).format('DD-MM-YYYY');
var logger = require('../utils/logger');

router.post('/users/authenticate', (req, res, next) => {
    logger.write(req, 'debug', 'POST api/users/authenticate ');
    const username = req.body.user;
    const password = req.body.pwd;
    User.getUserByUsername(req, username, (err, pwd) => {
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
                memCache.put('user', data.user);
                memCache.put('sessionID', password);
                memCache.put('token', 'JWT' + token);
                // memCache.put(data.user, { sessionID: password, "token": 'JWT' + token }, date);
                logger.write(req, 'info', JSON.stringify({ status: 200, data: { data: data.user, token: 'JWT' + token }, resultCode: "success" }));
                // console.log(JSON.stringify({ status: 200, data: { data: data.user, token: 'JWT' + token }, resultCode: "success" }));
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