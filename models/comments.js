module.exports = function(sequelize, DataTypes) {
  var comments = sequelize.define("comments", {
    commentId: {
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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  return comments;
};
