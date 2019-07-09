const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const isNotAuthenticated = require("../config/middleware/isNotAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", isAuthenticated, function(req, res) {
    db.userLogin.findAll({}).then(function(dbAccount) {
      res.render("index", {
        account: dbAccount
      });
    });
  });

  app.get("/home", isNotAuthenticated, function(req, res) {
    db.userLogin.findAll({}).then(function(dbAccount) {
      db.postTable.findAll({
        limit: 5,
        order: [
          ["postId", "DESC"]
        ]
      }).then(function(data) {
        console.log(data);
        res.render("home", { account: data });
      });

      // console.log(dbAccount);
    });
  });

  // Load example page and pass in an example by id
  app.get("/account/:id", isAuthenticated, function(req, res) {
    db.userLogin
      .findOne({ where: { id: req.params.id } })
      .then(function(dbAccount) {
        res.render("example", {
          account: dbAccount
        });
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
