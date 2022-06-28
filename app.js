const express = require("express");
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, "public"))); 


app.set("view engine", "ejs");
app.set("views", "views");

const showAnswerRouter = require("./router/showAnswer");
app.use(showAnswerRouter.routes)

const addAnswerRouter = require("./router/addAnswer")
app.use("/admin",addAnswerRouter.routes)

app.use((req, res, next) => {
  res.render("404", {
    title: "404 Page",
  });
});


app.listen(3000);
