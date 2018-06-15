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

router.post('/users/authenticate', (req, res) => {
    try {
        logger.write(req, 'debug', 'POST api/users/authenticate ');
        const username = req.body.user;
        const password = req.body.password;
        User.getUserByUsername(req, username, (err, pwd) => {
            if (err) throw err
            if (!pwd) {
                return res.json({ status: 500, resultCode: 'User not found.' });
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
                    });
                    memCache.put('user', data.user);
                    memCache.put('sessionID', password);
                    memCache.put('token', 'JWT' + token);
                    logger.write(req, 'info', JSON.stringify({ resultCode: 200, data: { data: data.user, token: 'JWT' + token }, resultDescription: "success" }));
                    res.json({ resultCode: 200, data: { data: data.user, token: 'JWT' + token }, resultDescription: "success" });
                } else {
                    logger.write(req, 'error', JSON.stringify({ resultCode: 500, resultDescription: 'Wrong password.' }));
                    return res.json({ resultCode: 500, resultDescription: 'Wrong password.' })
                }
            })
        })
    } catch (error) {
        logger.write(req, 'error', 'Error Login : ' + error);
        res.json({ resultCode: 500, resultDescription: error });
    }
});

module.exports = router;