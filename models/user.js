const sequelize = require("../config");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User", {
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
  profile_img: {
    type: DataTypes.STRING,
    isUrl: true
  },
  password: DataTypes.STRING
});

User.sync();

module.exports = User;
