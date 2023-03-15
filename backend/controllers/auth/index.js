const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

// @route   POST /api/auth/register
// @desc    Registers a new user
// @access  Public
exports.register = async (req, res) => {
  try {
    const user = req.body;

    console.log(user);

    return res.send({ user });
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send({ error: e.message });
  }
};

// @route   POST /api/auth/login
// @desc    Log in a user
// @access  Public
exports.login = async (req, res) => {
  try {
    const user = req.body;

    return res.send({ user });
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send({ error: e.message });
  }
};
