require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

// ----------------------------------------------------
// THIS IS THE PART YOU WERE MISSING
app.get("/api/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});
// ----------------------------------------------------

// Register User
app.post("/register", async (req, res) => {
  try {
    const { name, email, gstin, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await pool.query(
      "INSERT INTO users (name, email, gstin, password) VALUES ($1,$2,$3,$4)",
      [name, email, gstin, hashedPassword]
    );
    
    res.json({ message: "User Registered Successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

// Login User
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }

    res.json({ message: "Login Successful", user: user.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server error");
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});