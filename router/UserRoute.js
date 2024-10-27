const express = require("express");
const { Signup, Login } = require("../controllers/UserController");
const AuthUser = require("../middleware/AuthUser");
const upload = require("../utils/fileUpload");

const fileUpload = require("../controllers/FileUpload");
const userRoute = express.Router();

userRoute.post("/signup", Signup);
userRoute.post("/login", Login);
userRoute.post("/resume", AuthUser, upload.single("pdf"), fileUpload);

module.exports = userRoute;
