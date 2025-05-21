require("dotenv").config();
const express = require("express");
const connectDB = require("./config/mongodb");
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB()
  .then(() => console.log("MongoDB connection established successfully"))
  .catch((err) => console.log("MongoDB connection error: ", err));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
