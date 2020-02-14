const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Meme = (sequelize, DataTypes) => {
  sequelize.definte("Meme", {
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      isUrl: true
    }
  });

  Meme.associate = function associate() {
    Meme.belongsTo(User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Meme;
};

// Meme.sync();

module.exports = Meme;
