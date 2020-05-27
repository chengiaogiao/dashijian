const express = require("express");
const path = require("path");
const app = express();
app.listen(3000, () => console.log("大事件接口启动"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/api", require(path.join(__dirname, "routers", "login")));
app.use("/my/article", require(path.join(__dirname, "routers", "category")));
app.use("/my/article", require(path.join(__dirname, "routers", "article")));
app.use("/my", require(path.join(__dirname, "routers", "user")));
