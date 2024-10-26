const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      firstName: {
        type: String,
        trim: true,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
