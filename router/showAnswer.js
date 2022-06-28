const express = require("express");
const router = express.Router();

const connection = require("../util/connection");
router.get("/", (req, res, next) => {
  connection.getConnection(function (err) {
    if (err) throw err;
    connection.query("SELECT * FROM students s INNER JOIN country c ON s.countryId=c.idCountry order by id ", function (err, result, fields) {
      if (err) throw err;
      console.log(result);

      res.render("show-answer", {
        title: "Answer List",
        path: "/",
        students: result,
        country:""
      });
    });
  });
});



exports.routes = router;
