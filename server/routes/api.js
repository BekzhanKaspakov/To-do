const Router = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../db/userModel");
const Task = require("../db/taskModel");
const jwt = require("jsonwebtoken");

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

  const count = await Task.countDocuments();

  Task.find(queryObject)
    .sort(sortObject)
    .skip(currentPage * perPage)
    .limit(perPage)
    .lean()
    .exec(function (err, docs) {
      // docs are plain javascript objects instead of model instances
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json({ items: docs, totalCount: count });
      }
    });
});

router.post("/add-task", function (req, res) {
  const value = schema.validate(req.body);
  if (value.error) {
    res.status(400).send(value.error);
    return;
  }
  // const matchDocument = {
  //   username: value.value.username,
  //   email: value.value.email,
  //   task_text: value.value.task_text,
  //   isDone: value.value.isDone,
  // };

  const task = new Task({
    username: value.value.username,
    email: value.value.email,
    task_text: value.value.task_text,
    isDone: value.value.isDone,
  });
  task
    .save()
    .then((result) => {
      console.log(`Added a new match with id ${result._id}`);
      res.status(201).json({ id: result._id });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "Error inserting matches!", error: error });
    });
});

router.post("/register", function (req, res) {
  bcrypt
    .hash(req.body.password, 10)
    .then((hashedPassword) => {
      const user = new User({
        email: req.body.email,
        password: hashedPassword,
      });
      user
        .save()
        .then((result) => {
          res.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    .catch((e) => {
      res.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

router.post("/login", function (req, res) {
  // check if email exists
  User.findOne({ email: req.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(req.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return res.status(400).send({
              message: "Passwords does not match",
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          res.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          res.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      res.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

module.exports = router;
