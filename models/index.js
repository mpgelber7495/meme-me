const Meme = require("./meme");
const User = require("./user");
const Comment = require("./comment");
const Like = require("./like");

User.associate = function associate() {
  User.hasMany(Meme, {
    foreignKey: { allowNull: false }
  });
  User.hasMany(Comment, {
    foreignKey: { allowNull: false }
  });
  User.hasMany(Like, {
    foreignKey: { allowNull: false }
  });
};

Meme.associate = function associate() {
  Meme.belongsTo(User, {
    foreignKey: {
      allowNull: false
    }
  });
  Meme.hasMany(Comment, {
    foreignKey: {
      allowNull: false
    }
  });
};

Comment.associate = function associate() {
  Comment.belongsTo(Meme, {
    foreignKey: {
      allowNull: false
    }
  });
  Comment.belongsTo(User, { foreignKey: { allowNull: false } });
};

Like.associate = function associate() {
  Like.belongsTo(Comment, {
    foreignKey: {
      allowNull: false
    }
  });
  Like.belongsTo(User, {
    foreignKey: {
      allowNull: false
    }
  });
};

function runAssociations() {
  User.associate();
  Meme.associate();
  Comment.associate();
  Like.associate();
}

module.exports = runAssociations;
