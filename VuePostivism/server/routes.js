//import { register } from "./controllers/AuthenticationController";
// export default function (app) {
//app.post("/#/",register);
// }
const path = require("path");

module.exports = function(app){
  app.get("/test", (req, res)=> res.json({ msg: "IT WORKED"}));







  app.get("*", (req, res)=> {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });
};