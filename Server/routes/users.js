const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middlewares/auth");
const _ = require("lodash");

// Get All Users Details
router.get("/", auth, async (req, res) => {
  try {
    let user = await User.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("Error in get Users");
  }
});

module.exports = router;
