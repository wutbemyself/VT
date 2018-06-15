const bcrypt = require('bcrypt');
const Mysql = require('../../models/mysql');
var logger = require('../../utils/logger');

module.exports.getUserByUsername = function (req, username, callback) {
    var sql = `select password from user where user='` + username + `'`;
    Mysql.query(req, sql, (err, data) => {
        if (err) {
            console.log(err);
            callback('false', false);
        }
        callback(null, data[0].password);
    })
}

exports.cryptPassword = function (password, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        if (err)
            return callback(err);

        bcrypt.hash(password, salt, function (err, hash) {
            return callback(err, hash);
        });
    });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    try {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) {
                throw err;
            }
            callback(null, isMatch);
        })
    } catch (error) {
        logger.write('error', 'error', 'Error Login : ' + error);
        callback(null, 'error');
    }
}
