const jwt = require("jsonwebtoken");
const User = require("../models/User");

const AuthUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Please login to access the content" });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const id = decodedToken.id;

    const user = await User.findById({ _id: id });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized user access!" });
    }

    if (Date.now() >= decodedToken.exp * 1000) {
      return res.status(401).json({ message: "Token expired!" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = AuthUser;
