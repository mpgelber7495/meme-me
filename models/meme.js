const sequelize = require("../config/config.json");
const { DataTypes } = require("sequelize");

let Meme;

module.exports = (sequelize, DataTypes) => {
  Meme = sequelize.define("Meme", {
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      isUrl: true
    }
  });

  //   Meme.associate = function associate() {
  //     Meme.belongsTo(User, {
  //       foreignKey: {
  //         allowNull: false
  //       }
  //     });
  //   };
  return Meme;
};
