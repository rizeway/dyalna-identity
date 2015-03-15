"use strict";
module.exports = function(sequelize, DataTypes) {
  var Session = sequelize.define("Session", {
    username: DataTypes.STRING,
    token: {
      type: DataTypes.STRING,
      unique: true
    },
    expireAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Session;
};
