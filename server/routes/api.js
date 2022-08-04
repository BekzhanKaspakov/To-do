const Router = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../db/userModel");
const Task = require("../db/taskModel");
const InvalidToken = require("../db/invalidTokenModel");
const jwt = require("jsonwebtoken");
const func = require("../modules/func");
const dotenv = require("dotenv");

dotenv.config();

const schema = Joi.object({
  _id: Joi.string(),

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

const registerSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  password: Joi.string().min(3).required(),
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

router.post("/edit-task", func.authenticateToken, function (req, res) {
  const value = schema.validate(req.body);
  if (value.error) {
    res.status(400).send(value.error);
    return;
  }

  const query = { _id: req.body._id };
  const newTask = {
    _id: req.body._id,
    username: value.value.username,
    email: value.value.email,
    task_text: value.value.task_text,
    isDone: value.value.isDone,
  };

  Task.findOneAndUpdate(query, newTask, { upsert: true }, function (err, doc) {
    if (err) {
      res.status(500).json({ message: "Error editing matches!", error: err });
    }
    res.status(200).json({ id: doc._id });
  });
});

router.post("/register", function (req, res) {
  const value = registerSchema.validate(req.body);
  if (value.error) {
    res.status(400).send(value.error);
    return;
  }
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

          const jwtSignObject = {
            userId: user._id,
            userEmail: user.email,
          };
          if (user.role) {
            jwtSignObject["role"] = user.role;
          }
          //   create JWT token
          const token = jwt.sign(jwtSignObject, process.env.TOKEN_SECRET, {
            expiresIn: "24h",
          });

          //   return success response
          const responseObject = {
            message: "Login Successful",
            id: user._id,
            email: user.email,
            token,
          };
          if (user.role != null && user.role.length > 0) {
            console.log(user.role);
            responseObject["role"] = user.role;
          }
          res.status(200).send(responseObject);
        })
        // catch error if password does not match
        .catch((error) => {
          console.log(error);
          res.status(400).send({
            message: "No combinations of this email and password found",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      res.status(404).send({
        message: "No combinations of this email and password found",
        e,
      });
    });
});

router.post("/logout", function (req, res) {
  const invalidToken = new InvalidToken({
    token: req.body.token,
  });
  invalidToken
    .save()
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error creating user",
        error,
      });
    });
});

module.exports = router;
