// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/database');
var mysql = require('mysql');
var ConMysql= require('../config/Connection');
var con = mysql.createConnection(ConMysql);
con.connect();

module.exports.getUserById = function (id, callback) {
    debugger
    var sql = "select * from user where "
    return con.query(sql, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    var sql = "select * from user "
    return con.query(sql, callback);

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
    debugger
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) {
            throw err;
        }
        callback(null, isMatch);
    })
}