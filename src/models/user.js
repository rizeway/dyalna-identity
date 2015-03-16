"use strict";
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    main: DataTypes.BOOLEAN,
    account: DataTypes.INTEGER,
    roles: DataTypes.ARRAY(DataTypes.STRING),
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    activationCode: {
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};
