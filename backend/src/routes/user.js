const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");

const User = require("../models/User");

/**
 * @method - POST
 * @param - /signup
 * @description - User Signup
 */
router.post(
  "/signup",
  [
    check("username", "Please Enter a Valid Username").not().isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { username, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      console.log("1");
      if (user) {
        return res.status(400).json({
          message: "User Already Exists",
        });
      }
      console.log("2");
      user = User({ username, email, password });

      const salt = await bcrypt.genSalt(10);
      console.log("3");
      user.password = await bcrypt.hash(password, salt);
      console.log("4");
      await user.save();
      console.log("5");
      const payload = { user: { id: user.id } };

      jwt.sign(payload, "randomString", { expiresIn: 10000 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in saving");
    }
  }
);

/**
 * @method - POST
 * @param - /login
 * @description - User Login
 */
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User Does Not Exists." });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message: "Incorrect Password!",
        });
      }

      const payload = {
        user: { id: user.id },
      };

      console.log(payload);

      jwt.sign(payload, "randomString", { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      });
    } catch (e) {
      console.log(error(e));
      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

/**
 * @method - GET
 * @param - /user/me
 * @description - Get LoggedIn User
 */
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user." });
  }
});

module.exports = router;
