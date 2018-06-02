var mysql = require('mysql');
var con = require('../config/Connection.json');
var connection = mysql.createConnection(con.mysql);
connection.connect((err) => {
    if (err) {
        console.log('Disconnect to database [ERROR]: ' + err);
    }
});
module.exports.query = function (sql, callback) {
    console.log(sql);
    connection.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            callback(err, false);
        }
        callback(null, data);
    })
}