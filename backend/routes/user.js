const express = require("express");

// controller functions
const {
  signupUser,
  loginUser,
  getUser,
} = require("../controllers/usersController");

const router = express.Router();

// login route
router.post("/login", loginUser);

// signup route
router.post("/signup", signupUser);

router.get("/:id", getUser);

module.exports = router;
