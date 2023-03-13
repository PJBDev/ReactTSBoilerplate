const express = require("express");
const router = express.Router();
const { protectedRoute } = require("../../middleware");
const { googleAuthController } = require("../../controllers");

// @route   POST api/auth/google/signin
// @desc    Sign in with Google
// @access  Public
router.post("/signin", googleAuthController.googleSignIn);

// @route   POST api/auth/google/register
// @desc    Register with Google
// @access  Public
router.post("/register", googleAuthController.googleRegister);

// @route   POST api/auth/google/callback/signin
// @desc    Sign in with Google
// @access  Public
router.post("/callback/signin", googleAuthController.googleSignInCallback);

// @route   POST api/auth/google/callback/register
// @desc    Register with Google
// @access  Public
router.post("/callback/register", googleAuthController.googleRegisterCallback);

// @route   POST api/auth/google/gmail
// @desc    Connect to Gmail - different from Sign in with Google
// @access  Public
router.post("/gmail", googleAuthController.googleGmail);

// @route   POST api/auth/google/gmail-callback
// @desc    Connect to Gmail - different from Sign in with Google
// @access  Public
router.post("/gmail-callback", googleAuthController.googleGmailCallback);

module.exports = router;
