var controller = require("./controllers/AuthenticationController");
// export default function (app) {

// }
const path = require("path");

module.exports = function(app){
  app.get("/test", (req, res)=> res.json({ msg: "IT WORKED"}));
  app.post("/api/account",function(req,res){
    console.log("response", req + " " + res);
  });
  app.get("*", (req, res)=> {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
};