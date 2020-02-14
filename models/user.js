const sequelize = require("../models");
const { DataTypes } = require("sequelize");

let User;

module.exports = (sequelize, DataTypes) => {
  User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
      unique: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: DataTypes.STRING,
    profile_pic: { type: DataTypes.STRING, isUrl: true }
  });
  return User;
};
