const mongoose = require("mongoose");

const InvalidTokenSchema = mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Please provide a Token!"],
      unique: [true, "Token Exist"],
    },
  },
  { timestamps: true }
);

InvalidTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

module.exports =
  mongoose.model.InvalidToken ||
  mongoose.model("InvalidToken", InvalidTokenSchema);
