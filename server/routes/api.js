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

  isDone: Joi.boolean().default(false),
});

const getSchema = Joi.object({
  currentPage: Joi.number().greater(0),

  perPage: Joi.number().greater(0),

  sortBy: Joi.string().valid("username", "email", "task_text", "_id", "isDone"),

  sortOrder: Joi.string().valid("asc", "desc"),
})
  .with("currentPage", "perPage")
  .with("sortOrder", "sortBy");

var router = Router();

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("Hello World");
});

router.get("/tasks", async (req, res) => {
  const value = getSchema.validate(req.query);
  if (value.error) {
    res.status(400).send(value.error);
    return;
  }
  const dbConnect = dbo.getDb();

  let sortBy = req.query.sortBy ?? "_id";
  let sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
  let currentPage = req.query.currentPage
    ? Number(req.query.currentPage) - 1
    : 0;
  let perPage = req.query.perPage ? Number(req.query.perPage) : 3;
  let queryObject = {};
  let sortObject = {};
  sortObject[sortBy] = sortOrder;

  if (req.query.username) {
    queryObject["username"] = { $eq: req.query.username };
  }

  const count = await dbConnect.collection("tasks").countDocuments();

  dbConnect
    .collection("tasks")
    .find(queryObject)
    .sort(sortObject)
    .skip(currentPage * perPage)
    .limit(perPage)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json({ items: result, totalCount: count });
      }
    });
});

router.post("/add-task", function (req, res) {
  const value = schema.validate(req.body);
  if (value.error) {
    res.status(400).send(value.error);
    return;
  }
  const dbConnect = dbo.getDb();
  const matchDocument = {
    username: value.value.username,
    email: value.value.email,
    task_text: value.value.task_text,
    isDone: value.value.isDone,
  };

  dbConnect
    .collection("tasks")
    .insertOne(matchDocument, function (err, result) {
      if (err) {
        res.status(400).send("Error inserting matches!");
      } else {
        console.log(`Added a new match with id ${result.insertedId}`);
        res.status(201).json({ id: result.InsertedID });
      }
    });
});

module.exports = router;
