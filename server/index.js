const express = require("express");

const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const http = require("http").Server(app);
const mongoose = require("mongoose");
const User = require("./models/userModel");
const PORT = 5000;
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const attachTokenMiddleware = require("./middlewears/authMiddlewear");
const { default: axios } = require("axios");
// Configure body-parser middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static("public"));
// MongoDB connection
const MONGODB_URI =
  "mongodb+srv://emad-map-quiz:xngzn4g4tIO4PjDv@cluster0.m0x9uxn.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
//Route to the homepage of the application
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.get("/api/auth/user", attachTokenMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.send({ email: user.email, userId: user._id });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user data" });
  }
});
app.get("/api/quizes", async (req, res) => {
  try {
    const res = await axios.get(
      "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz",
      { headers: { "Content-Type": "application/json" } }
    );
    console.log(res.data);
    if (res.data) {
      res.send(res.data);
    } else {
      return res.status(401).json({ message: "fetching failed" });
    }
  } catch (error) {
    return res.status(401).json({ message: error });
  }
});
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const token = jwt.sign({ userId: user._id }, "geo-app", {
      expiresIn: "1h",
    });
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.log("error: ", error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request" });
  }
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({
      email,
      password,
    });

    // You don't need to call `user.save()` after using `User.create()`
    res.status(201).json(user); // Use status 201 for successful resource creation
  } catch (error) {
    console.error("Error while registering user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while registering the user." });
  }
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
