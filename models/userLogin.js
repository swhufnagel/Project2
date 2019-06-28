module.exports = function(sequelize, DataTypes) {
  var userLogin = sequelize.define("userLogin", {
    userId: {
      type:DataTypes.INTEGER,
      autoIncrement : true,
      primaryKey : true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [3,20]
      }

    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [3,20]
      }

    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2,20]
      }

    },
    email:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3,40]
      }

    },
    password:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8,20]
      }

    }
  });
  return userLogin;
};
