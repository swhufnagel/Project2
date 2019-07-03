require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const db = require("./models");

let PORT = process.env.PORT || 8080;

app.use(cors("*"));
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.json());

require("./routes")(app);

db.sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log("listening on ", PORT);
    });
  });