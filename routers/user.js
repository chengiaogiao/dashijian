const express = require("express");
const router = express.Router();
const path = require("path");
const db = require(path.join(__dirname, "../utils/db"));
router.get("/userinfo", async (req, res) => {
  console.log(req.user.id);
  let r = await db("select * from user where id=?", req.user.id);

  res.send({});
});
module.exports = router;
