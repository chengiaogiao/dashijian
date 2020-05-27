const express = require("express");
const path = require("path");
const utility = require("utility");
const jsonwebtoken = require("jsonwebtoken");
const router = express.Router();
const db = require(path.join(__dirname, "../utils/db"));
// 注册的接口
router.post("/reguser", async (req, res) => {
  req.body.password = utility.md5(req.body.password);
  let r = await db("insert into user set ?", req.body);
  if (r && r.affectedRows > 0) {
    res.send({ status: 0, message: "注册成功" });
  } else {
    res.send({ status: 1, message: "注册失败" });
  }
});
router.post("/login", async (req, res) => {
  console.log(req.body);
  // db("insert")
  let username = req.body.username;
  let password = utility.md5(req.body.password);
  let r = await db("select * from user where username=? and password=?", [
    username,
    password,
  ]);
  console.log(r, r.affectrRows);
  if (r && r.length > 0) {
    res.send({
      status: 0,
      message: "登录成功",
      token:
        "Bearer " +
        jsonwebtoken.sign({ username: username, id: r[0].id }, "bigevent", {
          expiresIn: "1h",
        }),
    });
  } else {
    res.send({ status: 1, message: "登录失败" });
  }
});
module.exports = router;
