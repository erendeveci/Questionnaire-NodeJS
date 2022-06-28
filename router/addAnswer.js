const express = require("express");
const router = express.Router();

const conn = require("../util/connection");

const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/add-answer", (req, res, next) => {
  conn.getConnection(function (err) {
    if (err) throw err;
    conn.query("SELECT * FROM country", function (err, result, fields) {
      if (err) throw err;

      res.render("add-answer", {
        title: "Answer Page",
        path: "admin/add-answer",
        info: "Add answer",
        country: result,
      });
    });
  });
});

router.post("/add-answer", (req, res, next) => {
  console.log(req.body.studentPhone);
  const phone = parseInt(req.body.studentPhone, 10);
  const length = phone.toString().length;
  console.log(length);
  if (length === 10) {
    conn.getConnection(function (err) {
      if (err) throw err;
      conn.query(
        "SELECT phone FROM students WHERE phone ='" + phone + "'",
        function (err, result, fields) {
          if (err) throw err;
          if (result.length > 0) {
            conn.query("SELECT * FROM country", function (err, result, fields) {
              if (err) throw err;

              res.render("add-answer", {
                title: "Add answer",
                info: "Phone number already registered",
                country : result,
              });
            });
          } else {
            conn.getConnection(function (err) {
              if (err) throw err;
              console.log("Connected!");
              var sql =
                "INSERT INTO students (name,surname,phone,countryId) VALUES ('" +
                req.body.studentName +
                "' ,'" +
                req.body.studentSurname +
                "','" +
                req.body.studentPhone +
                "','" +
                req.body.studentSelect +
                "')";
              conn.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.redirect("/");
              });
            });
          }
        }
      );
    });
  } else {
    conn.query("SELECT * FROM country", function (err, result, fields) {
      if (err) throw err;

      res.render("add-answer", {
        title: "Add answer",
        info: "Data's couldn't add ,please entry true values",
        country: result,
      });
    });
  }
});

exports.routes = router;
