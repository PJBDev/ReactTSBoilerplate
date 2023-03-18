const express = require("express");
const router = express.Router();
const { protectedRoute } = require("../../middleware");
const { authController } = require("../../controllers");

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", authController.register);

// @route   POST api/auth/login
// @desc    Log in a user
// @access  Public
router.post("/login", authController.login);

// @route   POST /api/auth/verify-email
// @desc    Verify a user's email address
// @access  Public
router.post("/verify-email", authController.verifyEmail);

module.exports = router;
