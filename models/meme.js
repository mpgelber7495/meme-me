const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const Meme = sequelize.definte("Meme", {
  image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id:
});
