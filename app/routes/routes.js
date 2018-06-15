const express = require('express');
const router = express.Router();
const models = require('../../models');
var Sequelize = require('sequelize');
var logger = require('../../app/utils/logger');
const User = require('../module/User/user');


router.post('/users/register', (req, res) => {
    try {
        var user = req.body.user;
        var password = req.body.password;
        var sql = "SELECT max(id) as MAX FROM `user` limit 1";
        User.cryptPassword(password, (err, pwd) => {
            models.sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT }).then(response => {
                var id;
                (response[0] && response[0].MAX ? id = parseInt(response[0].MAX) + 1 : id = 1);
                var data = {
                    id: id,
                    name: user,
                    user: user,
                    password: pwd
                };
                models.User.create(data).then(response => {
                    response = {
                        resultCode: 200,
                        data: response,
                        resultDescription: 'success'
                    };
                    logger.write(req, 'info', JSON.stringify(response));
                    res.json(response);
                });
            });
        });
    } catch (error) {
        logger.write(req, 'error', 'Error Register : ' + error);
        res.json({ resultCode: 500, resultDescription: error });
    }
});

module.exports = router;