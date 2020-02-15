const sequelize = require("../config");
const { DataTypes } = require("sequelize");
const Meme = require("./meme");

const Comment = sequelize.define("Comment", {
  text: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Comment.associate = function associate() {
  Comment.belongsTo(Meme, {
    foreignKey: {
      allowNull: false
    }
  });
};

Comment.associate();

Comment.sync();

module.exports = Comment;
