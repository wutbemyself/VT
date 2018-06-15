const models = require('../../models');
var Sequelize = require('sequelize');

module.exports.query = function (req, sql, callback) {
    models.sequelize.query(sql,{ type:Sequelize.QueryTypes.SELECT}).then(response => {
        callback(null, response);
    })
}

module.exports.insert = function (req, data, callback) {
    models.User.create({ name: "Dang Thanh", user: "uuser", password: "1234", id: "2" }).then(response => { debugger
        response.forEach(dataValues => {
            data.push({
                createdAt: dataValues.createdAt,
                user: dataValues.user,
                id: dataValues.id,
                name: dataValues.name,
                password: dataValues.password,
                updatedAt: dataValues.updatedAt
            });
        });
        callback(null, data);
    })
}