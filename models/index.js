"use strict";

var fs = require("fs");
require("dotenv").config();
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../config/config.json")[env];

var db = {};
var sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    process.env.mySQL_ID,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

//Associations for table, they should all be linked now!
db.comments.belongsTo(db.userLogin);
db.postTable.hasMany(db.comments);
db.postTable.belongsTo(db.userLogin);
db.userLogin.hasMany(db.postTable);
db.comments.belongsTo(db.postTable);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
