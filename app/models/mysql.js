var mysql = require('mysql');
var con = require('../config/Connection.json');
var logger = require('../utils/logger');
var connection = mysql.createConnection(con.mysql);
connection.connect((err) => {
    if (err) {
        console.log('Disconnect to database [ERROR]: ' + err);
    }
});
module.exports.query = function (req,sql, callback) { 
    // console.log(sql); 
    // logger.write(req, 'info', '##  monitoring-WorkOrderSummary findByFilter  ##');
    
    logger.write(req, 'info', 'api query call by ');
    connection.query(sql, (err, data) => {
        if (err) {
            console.log(err);
            callback(err, false);
        }
        callback(null, data);
    })
}