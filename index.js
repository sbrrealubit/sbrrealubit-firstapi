const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const studentRoutes = require("./routes/studentRoutes");

app.use("/students", studentRoutes);

// database
const db = require("./db/db");

// test db route
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS test");
    res.json({ message: "Database connected", rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message, code: error.code });
  }
});

// test route
app.get("/", (req, res) => {
  res.send("Student API is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
