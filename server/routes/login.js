const express = require("express");
const router = express.Router();
const User = require("../models/user_account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// ✅ GET CURRENT USER
router.get("/auth/me", auth, async (req, res) => {
  try {
    const u = await User.findById(req.user.id)
      .select("_id name")
      .lean();

    if (!u) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: String(u._id),
      name: u.name,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ LOGIN
router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const exist = await User.findOne({ email });
    if (!exist) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, exist.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { _id: exist._id }, // 👈 keep _id consistent
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🔥 CRITICAL COOKIE FIX
    res.cookie("jwt_id", token, {
      httpOnly: true,
      secure: true,       // REQUIRED on Render
      sameSite: "none",   // REQUIRED for Vercel ↔ Render
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login success" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

// ✅ LOGOUT (recommended)
router.post("/auth/logout", (req, res) => {
  res.clearCookie("jwt_id", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.json({ message: "Logged out" });
});

module.exports = router;
