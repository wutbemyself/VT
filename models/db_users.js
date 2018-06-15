'use strict';

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      allowNull: false,
      // autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "id"
    },
    title: {
      type: DataTypes.STRING,
      field: "title"
    },
    iscomplated: {
      type: DataTypes.BOOLEAN,
      field: "iscomplated"
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "createdAt"
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: "updatedAt"
    }
  }, {
      tableName: 'users'
    });
};
