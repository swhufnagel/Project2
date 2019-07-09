var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~GETS RECENT POSTS / COMMENTS~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Get most recent posts (based on limit)
  app.get("/api/post/", function(req, res) {
    // console.log("post request ",req);
    db.postTable
      .findAll({
        limit: 10,
        where: {
          //We need to find user id for this part.
          //This is where we would exlude posts made by the user
        },
        order: [["createdAt", "DESC"]]
      })
      .then(function(data) {
        res.json(data);
      });
  });

  // Get most recent posts (based on request (as either popularity all time or past days))
  app.get("/api/post/:pop/:time", function(req, res) {
    postTable
      .findAll({
        limit: 10,
        where: {
          //
          //This is where we would exlude posts made by the user, find out where we will post the user id.
        },
        //may need to put the req into quotes
        order: [[req.body.pop, "DESC"]]
      })
      .then(function(data) {
        res.json(data);
      });
  });

  //Gets comments on related posts
  app.get("/api/comments/:postId", function(req, res) {
    comments
      .findAll({
        where: {
          postTablepostId: req.params.postId //Needs to be the actual post id.,
        },
        order: [["createdAt", "DESC"]]
      })
      .then(function(data) {
        res.json(data);
      });
  });

  //THESE BELOW NEED TO BE UPDATED
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~CREATE NEW ACCOUNT/POST/COMMENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Create a new account/Post/Comment
  app.post("/api/account/add", function(req, res) {
    // console.log(req.body);
    db.userLogin
      .create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
      })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        console.log("What????");
        res.status(401).json(err);
      });
  });

  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    console.log("api post success!");
    res.json(req.user);
    // res.redirect("/home");
  });
  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
  function ensureAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
      console.log("authenticated and going home");
      res.redirect("/home");
      return next;
    }
    res.redirect("/");
  }
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      console.log("not logged in");
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.userId,
        userName: req.user.userName,
        userImg: req.user.userImg
      });
    }
  });
  // app.get("/api/user_data", ensureAuthenticated, function(req, res) {
  //   if (!req.user) {
  //     // The user is not logged in, send back an empty object
  //     console.log("Please login to continue");
  //     console.alert("Please login to continue");
  //     res.json({});
  //   } else {
  //     // Otherwise send back the user's email and id
  //     // Sending back a password, even a hashed password, isn't a good idea
  //     sendToFront();
  //   }
  // });

  //Create posts need a way to link to user.

  app.post("/api/post/add", function(req, res) {
    console.log("new post req", req.body);
    // console.log("res:", res);
    db.postTable
      .create({
        text: req.body.text,
        image: "",
        likes: 0,
        dislikes: 0,
        userLoginUserId: parseInt(req.body.userLoginUserId)
      })
      .then(function(data) {
        // res.status(status);
        console.log(data.postId);
        res.json(data);
        console.log("new post added");
      });
  });

  app.post("/api/comment/add", function(req, res) {
    db.comments
      .create({
        text: req.body.text,
        likes: 0,
        dislikes: 0,
        userLoginuserId: req.body.userId, //send help
        postTablepostId: req.body.postId
      })
      .then(function(dbComment) {
        res.json(dbComment);
      });
  });

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DELETE AN ACCOUNt/POST/COMMENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Delete an account/post/comment by id
  app.delete("/api/account/:id", function(req, res) {
    db.userLogin
      .destroy({ where: { id: req.params.id } })
      .then(function(Deleted) {
        res.json(Deleted);
      });
  });

  app.delete("/api/post/:id", function(req, res) {
    db.postTable
      .destroy({ where: { id: req.params.id } })
      .then(function(Deleted) {
        res.json(Deleted);
      });
  });

  app.delete("/api/comment/:id", function(req, res) {
    db.comments
      .destroy({ where: { id: req.params.id } })
      .then(function(Deleted) {
        res.json(Deleted);
      });
  });

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~UPDATE AN ACCOUNT/POST/COMMENT~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  app.put("/api/comment/upd", function(req, res) {
    db.comments
      .update(
        {
          likes: req.body.likes,
          dislikes: req.body.dislikes
        },
        {
          where: {
            id: req.body.id
          }
        }
      )
      .then(function(result) {
        res.json(result);
      });
  });

  app.put("/api/post/upd", function(req, res) {
    db.postTable
      .update(
        {
          likes: req.body.likes,
          dislikes: req.body.dislikes
        },
        {
          where: {
            id: req.body.id
          }
        }
      )
      .then(function(result) {
        res.json(result);
      });
  });
};
