const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const User = (sequelize, DataTypes) => {
  sequelize.define("User", {
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
  //   return User;
};
User.sync();

module.exports = User;
