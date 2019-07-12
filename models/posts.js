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
      type: DataTypes.STRING,
      allowNull: true
    },
    hashtags: {
      type: DataTypes.STRING,
      allowNull: true
    }
    // likes: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: "0"
    // },
    // dislikes: {
    //   type: DataTypes.INTEGER,
    //   defaultValue: "0"
    // },
    // deletedAt: {
    //   type: DataTypes.DATE,
    //   allowNull: true
    // }
  });

  postTable.asociate = function(models) {
    postTable.belongsTo(models.userLogin, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return postTable;
};
