const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateTokenandSetCookies = require("../helpers/generateTokenandSetCookies");

const Signup = async (req, res) => {
  try {
    console.log(req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(404).json({ message: "all fields are required" });
    }

    const saltRound = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, saltRound);

    const user = new User({
      name: name,
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

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const find = await User.findOne({ email: email });

    const id = find._id;

    if (find || (await bcrypt.compare(password, find?.password || " "))) {
      generateTokenandSetCookies( id , res);
    } else {
      return res
        .status(404)
        .json({ message: "User not found or incorrect email or password" });
    }
    res.status(200).json({ message: "Login successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { Signup, Login };
