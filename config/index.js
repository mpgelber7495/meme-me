const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.JAWSDB_URL ||
    "mysql://kwaiaxop31ise0iw:hn4587d4onq66wkd@ctgplw90pifdso61.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/vnpbblpzq9s4zjsj"
);

module.exports = sequelize;
