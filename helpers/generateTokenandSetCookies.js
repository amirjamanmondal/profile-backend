const jwt = require("jsonwebtoken");

const generateTokenandSetCookies = async ({ id }, res) => {
  try {
    // Create a plain object with the id
    const token = jwt.sign({ id }, process.env.SECRET_KEY, {
      expiresIn: "5d",
    });

    res.cookie("token", token, {
      maxAge: 5 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = generateTokenandSetCookies;
