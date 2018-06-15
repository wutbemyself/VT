'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      allowNull: false,
      // autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "id"
    },
    name: {
      type: DataTypes.STRING,
      field: "name"
    },
    user: {
      type: DataTypes.STRING,
      field: "user"
    },
    password: {
      type: DataTypes.STRING,
      field: "password"
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "created_at"
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      field: "updated_at"
    }
  }, {
      tableName: 'user'
    });
};
