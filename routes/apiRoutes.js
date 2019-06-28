var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/account", function(req, res) {
    db.userLogin.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/account", function(req, res) {
    db.userLogin.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/account/:id", function(req, res) {
    db.userLogin
      .destroy({ where: { id: req.params.id } })
      .then(function(dbExample) {
        res.json(dbExample);
      });
  });
};
