const Router = require("express");
const Joi = require("joi");
const dbo = require("../db/conn");
const schema = Joi.object({
  username: Joi.string().min(3).max(30).required(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),

  task_text: Joi.string().required(),
});

var router = Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("Hello World");
});

router.get("/tasks", function (req, res, next) {
  const dbConnect = dbo.getDb();

  let sortBy = req.query.sortBy ?? "_id";
  let sort = req.query.sort === "desc" ? -1 : 1;
  let page = req.query.page ? Number(req.query.page) : 0;
  let pageSize = req.query.pageSize ? Number(req.query.pageSize) : 3;
  let queryObject = {};
  let sortObject = {};
  sortObject[sortBy] = sort;

  if (req.query.username) {
    queryObject["username"] = { $eq: req.query.username };
  }

  dbConnect
    .collection("tasks")
    .find(queryObject)
    .sort(sortObject)
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

router.post("/add-task", function (req, res, next) {
  const value = schema.validate(req.body);
  if (value.error) {
    res.status(400).send(value.error);
    return;
  }
  const dbConnect = dbo.getDb();
  const matchDocument = {
    username: req.body.username,
    email: req.body.email,
    task_text: req.body.task_text,
    isDone: false,
  };

  dbConnect
    .collection("tasks")
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting matches!");
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.status(204).send();
      }
    });
});

module.exports = router;
