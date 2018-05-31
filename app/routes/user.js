var logger = require('logger').createLogger();
const bcrypt = require('bcrypt');
var mysql = require('mysql');
var ConMysql = require('../config/Connection');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'mean'

});
connection.connect();
module.exports.getUserById = function (id, callback) {
    debugger
    callback(id);
}

module.exports.getUserByUsername = function (username, callback) {
    var sql = `select password from user where user='` + username + `'`;
    logger.info(sql);
    connection.query(sql, (err, data) => { 
        if (err) {
            callback('false',false);
        }
        callback(null, data[0].password);
    })
    // callback(username);
}

module.exports.getUserById = function (id, callback) {
    debugger
    callback(id);
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
    bcrypt.hash(candidatePassword, 10, function (err, hash) {
        if (err) { throw (err); }
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) {
                throw err;
            }
            callback(null, isMatch);
        })
    })
}