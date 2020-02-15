const sequelize = require("../config/config.json");
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const Model = Sequelize.Model;

module.exports = function(connection, Sequelize) {
  var Meme = connection.define("meme", { image_url: DataTypes.STRING });
  return Meme;
};

// module.exports = (sequelize, DataTypes) => {
//   Meme = sequelize.define("Meme", {
//     image_url: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       isUrl: true
//     }
//   });

//   Meme.associate = function associate() {
//     Meme.belongsTo(User, {
//       foreignKey: {
//         allowNull: false
//       }
//     });
//   };
//   return Meme;
// };
