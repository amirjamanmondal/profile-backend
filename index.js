const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: ["http://localhost:4000", "http://localhost:3000",], // Allow requests from this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};

// Middleware

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.set("view engine", "ejs");

// Routes
const userRoute = require("./router/UserRoute");
app.use("/user", userRoute);

// Serve static files
app.use("/resume", express.static("./uploaded"));

// Database connection
mongoose
  .connect(process.env.DB_CONNECTION_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err.message));

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
