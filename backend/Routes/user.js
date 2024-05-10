const express = require("express");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const bcrypt = require("bcryptjs");
const { User } = require("../db");

require("dotenv").config();
const userRouter = express.Router();

const validation = zod.object({
  username: zod.string(),
  phoneno: zod.string().min(10),
  email: zod.string(),
  password: zod.string().min(6),
});

// for signup
userRouter.post("/signup", async (req, res) => {
  const body = req.body;
  const valid = validation.safeParse(body);

  if (!valid) {
    res.status(403).json({ msg: "invalid data" });
  }

  const salt = await bcrypt.genSalt(6);
  const securePass = await bcrypt.hash(body.password, salt);

  const check = await User.findOne({
    email: body.email,
  });

  if (check) {
    res.status(403).json({ msg: "email already exist" });
  }

  try {
    const response = await User.create({
      username: body.username,
      phoneno: body.phoneno,
      email: body.email,
      password: securePass,
    });

    const token = jwt.sign(response._id.toHexString(), process.env.SECRET);

    return res.json({
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({ msg: "error while signing up" });
  }
});

//for Signin
userRouter.post("/signin", async (req, res) => {
  const body = req.body;
  const valid = validation.safeParse(body);

  if (!valid) {
    return res.status(403).json({ msg: "invalid data" });
  }

  try {
    const check = await User.findOne({
      email: body.email,
    });

    if (!check) {
      return res.status(403).json({ msg: "incorrect email" });
    }

    const passcmpr = await bcrypt.compare(body.password, check.password);
    if (passcmpr) {
      const token = jwt.sign(check._id.toHexString(), process.env.SECRET);

      return res.json({
        token: token,
      });
    } else {
      return res.status(403).json({ msg: "incorrect password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({ msg: "error while signing in" });
  }
});

module.exports = userRouter;
