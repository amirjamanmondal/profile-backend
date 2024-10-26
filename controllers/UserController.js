const User = require("../models/User");
const bcrypt = require("bcrypt");

const Signup = async (req, res) => {
  try {
    const {
      name: { firstName, lastName },
      email,
      password,
    } = req.body;

    const saltRound = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, saltRound);

    const user = new User({
      name: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: hashed,
    });

    if (user) {
      await user.save();
    } else {
      return res.status(404).json({ message: "All fields are required" });
    }

    res.status(200).json({ message: "user created successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { Signup };
