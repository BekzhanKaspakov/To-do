const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: "false",
  },

  username: {
    type: String,
    required: [true, "Please provide a Username!"],
    unique: false,
  },

  task_text: {
    type: String,
    required: [true, "Please provide an Task Text!"],
    unique: false,
  },

  isDone: {
    type: Boolean,
    required: [true, "Please provide a isDone!"],
    unique: false,
  },
});

module.exports = mongoose.model.Tasks || mongoose.model("Tasks", TaskSchema);
