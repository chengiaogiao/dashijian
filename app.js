const express = require("express");
const cors = require("cors");
const path = require("path");
const expressJWT = require("express-jwt");
const app = express();
app.listen(3007, () => console.log("大事件接口启动"));
app.use(expressJWT({ secret: "bigevent" }).unless({ path: /^\/api/ }));

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require(path.join(__dirname, "routers", "login")));
app.use("/my/article", require(path.join(__dirname, "routers", "category")));
app.use("/my/article", require(path.join(__dirname, "routers", "article")));
app.use("/my", require(path.join(__dirname, "routers", "user")));
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("身份失败");
  }
});
