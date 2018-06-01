var logger = require('logger').createLogger();
const bcrypt = require('bcrypt');
// var MysqlConnection = require('../module/mysql-Connect/Connection'); 
// var connection = new MysqlConnection();
var mysql = require('mysql');
var con = require('../config/Connection.json');
var connection = mysql.createConnection(con.mysql);
// connection.connect();
var log4js = require('log4js');
var logger = log4js.getLogger('KEEEN-VT');
connection.connect((err) => {
    if (err) {
        logger.debug('Disconnect to database ' + err);
    }
    else {
        logger.error('Database Connectto Mysql successfully.');
    }
});

module.exports.getUserByUsername = function (username, callback) { 
    var sql = `select password from user where user='` + username + `'`;
    console.log(sql);
    connection.query(sql, (err, data) => { 
        if (err) {
            callback('false',false);
        }
        callback(null, data[0].password);
    })
    // callback(username);
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

module.exports.comparePassword = function (candidatePassword, hash, callback) { debugger
    bcrypt.hash(candidatePassword, 10, function (err, hash) {
        if (err) { throw (err); } debugger
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => { 
            if (err) {
                throw err;
            }
            callback(null, isMatch);
        })
    })
}