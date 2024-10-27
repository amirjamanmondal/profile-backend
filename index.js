const express = require("express");
const path = require("path");
const fs = require("fs");
const userRoute = require("./router/UserRoute");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3000;

app.use(express.json())

app.set("view engine", "ejs");

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.render("index", { message: "Hello, world!" });
});

// Serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, "uploaded")));

// Serve PDF files
app.get("/pdf/:filename", (req, res) => {});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

mongoose
  .connect(process.env.DB_CONNECTION_URI)
  .then((res) => console.log("database connected"))
  .catch((err) => console.log(err.message));
