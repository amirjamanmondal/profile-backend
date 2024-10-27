const fs = require("fs");
const multer = require("multer");

const avatarFilePath = "./uploaded";

const Accessed = fs.existsSync(avatarFilePath);
if (!Accessed) {
  fs.mkdirSync(avatarFilePath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, avatarFilePath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb({ Error: "Only PDF files are allowed" });
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB
  },
});

module.exports = upload;
