const express = require("express");
const router = express.Router();
const { protectedRoute } = require("../middleware");

const authRoutes = require("./auth");
const googleAuthRoutes = require("./auth/google");

// @route   /auth/*
// @desc    Routes for authentication
// @access  Public
router.use("/auth", authRoutes);

// @route   /auth/google/*
// @desc    Routes for Google authentication
// @access  Public
router.use("/auth/google", googleAuthRoutes);

module.exports = router;
