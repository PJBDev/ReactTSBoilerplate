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

// @route   POST /api/auth/resend-verification-email
// @desc    Resend a user's verification email
// @access  Public
router.post(
  "/resend-verification-email",
  authController.resendVerificationEmail
);

// @route   POST /api/auth/forgot-password
// @desc    Send a password reset email to a user
// @access  Public
router.post("/forgot-password", authController.forgotPassword);

// @route   POST /api/auth/reset-password
// @desc    Reset a user's password
// @access  Public
router.post("/reset-password", authController.resetPassword);

// @route   POST /api/auth/refresh-token
// @desc    Refresh a user's access token
// @access  Public
router.post("/refresh-token", authController.refreshToken);

module.exports = router;
