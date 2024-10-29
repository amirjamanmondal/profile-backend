const jwt = require("jsonwebtoken");
const User = require("../models/User");
const File = require("../models/File");

const UploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(404).json({ message: "no file choosen " });
    }

    const user = req.user;

    const image = new File({
      fileName: req.file.filename,
      pathUrl: `/resume/${req.file.filename}`,
      userName: user.email,
    });
    await image.save();

    res.status(200).json({ message: `your image is uploaded `, image });
  } catch (error) {
    const errorMessage = error.message;
    res.status(500).json(errorMessage);
    console.error(errorMessage);
  }
};

module.exports = UploadImage;
