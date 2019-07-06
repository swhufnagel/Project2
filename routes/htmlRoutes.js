var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.userLogin.findAll({}).then(function(dbAccount) {
      res.render("index", {
        msg: "Social Media!",
        account: dbAccount
      });
    });
  });

  app.get("/home", function(req, res) {
    db.userLogin.findAll({}).then(function(dbAccount) {
      res.render("home", {
        account: dbAccount
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/account/:id", function(req, res) {
    db.userLogin
      .findOne({ where: { id: req.params.id } })
      .then(function(dbAccount) {
        res.render("example", {
          account: dbAccount
        });
      });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
