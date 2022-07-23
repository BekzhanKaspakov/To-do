const Router = require("express");
const dbo = require("../db/conn");

var router = Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Hello World");
});

router.get("/tasks", function (req, res, next) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("tasks")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

module.exports = router;
