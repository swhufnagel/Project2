app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      console.log("not logged in");
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      console.log("logged in sending info to front ", res);
      res.json({
        email: req.user.email,
        id: req.user.userId,
        userName: req.user.userName
      });
    }
  });