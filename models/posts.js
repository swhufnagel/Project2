var users = require("./userLogin.js");
var comments = require("./comments.js");
module.exports = function(sequelize, DataTypes) {
  var postTable = sequelize.define("postTable", {
    postId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 255]
      }
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });


  return postTable;
};
