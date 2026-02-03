const express = require("express");
const router = express.Router();
const user = require("../models/user_account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.get("/auth/me", auth, async (req, res) => {
  try {
    const u = await user.findById(req.user.id).select("_id name").lean();
    if (!u) return res.status(404).json({ message: "User not found" });
    res.json({ id: String(u._id), name: u.name });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const exist = await user.findOne({ email });

    if (!exist) {
      return res.status(400).json({ message: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, exist.password);

    if (!isMatch) {
      return res.status(400).json({ message: "password not match" });
    }
    const token = jwt.sign({ _id: exist._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("jwt_id", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "login success" });
    
  } catch (error) {
    console.log(error, "user not get");
    res.status(500).json({ message: "user not get go and create account" });
  }
});

module.exports = router;
