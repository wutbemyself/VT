'use strict';
// module.exports = (sequelize, DataTypes) => {
//   var user = sequelize.define('user', {
//     title: DataTypes.STRING,
//     iscomplated: DataTypes.BOOLEAN
//   }, {});
//   user.associate = function(models) {
//     // associations can be defined here
//   };
//   return user;
// };

/* jshint indent: 2 */

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
