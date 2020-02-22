const sequelize = require("../config");
const { DataTypes } = require("sequelize");
const Comment = require("./comment");
const User = require("./user");

const Like = sequelize.define("Like", {
  up_or_down: { type: DataTypes.BOOLEAN, allowNull: false }
});

Like.sync();

module.exports = Like;
