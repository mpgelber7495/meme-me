const sequelize = require("../config");
const { DataTypes } = require("sequelize");
const Meme = require("./meme");
const User = require("./user");

const Comment = sequelize.define("Comment", {
  text: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Comment.sync();

module.exports = Comment;
