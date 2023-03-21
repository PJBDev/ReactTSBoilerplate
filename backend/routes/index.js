const express = require("express");
const router = express.Router();
const { protectedRoute } = require("../middleware");

const authRoutes = require("./auth");
const googleAuthRoutes = require("./auth/google");
const organizationRoutes = require("./organization");

// @route   /auth/*
// @desc    Routes for authentication
// @access  Public
router.use("/auth", authRoutes);

// @route   /auth/google/*
// @desc    Routes for Google authentication
// @access  Public
router.use("/auth/google", googleAuthRoutes);

// @route   /organization/*
// @desc    Routes for organizations
// @access  Private
router.use("/organization", protectedRoute, organizationRoutes);

module.exports = router;
