const sequelize = require("../config");
const { DataTypes } = require("sequelize");
const User = require("./user");

const Meme = sequelize.define("Meme", {
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
    isUrl: true
  }
});

// Meme.associate = function associate() {
//   Meme.belongsTo(User, {
//     foreignKey: {
//       allowNull: false
//     }
//   });
// };

// Meme.associate();

Meme.sync();

module.exports = Meme;
