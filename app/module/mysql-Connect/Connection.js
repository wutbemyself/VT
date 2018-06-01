
var mysql = require('mysql');
var con = require('../../config/Connection.json');
var connection = mysql.createConnection(con.mysql);
function MysqlConnection() {
    this.connect = function () {
        var connection = mysql.createConnection(con.mysql);
        return connection.connect((err) => {
            if (err) {
                console.log('Disconnect to database ' + err);
            }
            else {
                console.log('Database Connectto Mysql successfully.');
            }
        });
    }
};
module.exports = MysqlConnection;