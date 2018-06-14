'use strict';
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('product', {
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
    description: {
      type: DataTypes.STRING,
      field: "description"
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
      tableName: 'product'
    });
};
