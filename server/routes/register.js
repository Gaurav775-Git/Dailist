const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

const user = require("../models/user_account.js");
const userprofile = require("../models/user_profile.js");
router.post("/register", async (req, res) => {
  const { name, email, password, phone, date } = req.body;

  const exist = await user.findOne({ email });
  if (exist) {
    return res.status(400).json({ message: "email already exist" });
  }
  const salt = await bcrypt.genSalt(10);

  const hashedpassword = await bcrypt.hash(password, salt);

  const userdetails = await user.create({
    name,
    email,
    password: hashedpassword,
    phone,
    date,
  });

  await userprofile.create({
    user_id: userdetails._id,
    username: name,
    bio: " ",
    image: " ",
  });

  const usertoken = jwt.sign({ _id: userdetails._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("jwt_id", usertoken, {

    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
  
  res.status(200).json
  ({
      message: "user created",
      user: {
        _id: userdetails._id,
        name: userdetails.name,
        email: userdetails.email,
      },
    });
});
module.exports = router;
