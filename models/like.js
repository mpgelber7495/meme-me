const sequelize = require("../config");
const { DataTypes } = require("sequelize");
const Comment = require("./comment");
const User = require("./user");

const Like = sequelize.define("Like", {
  up_or_down: { type: DataTypes.BOOLEAN, allowNull: false }
});

// Like.associate = function associate() {
//   Like.belongsTo(Comment, {
//     foreignKey: {
//       allowNull: false
//     }
//   });
//   Like.belongsTo(User, {
//     foreignKey: {
//       allowNull: false
//     }
//   });
// };

// Like.associate();

Like.sync();

module.exports = Like;
