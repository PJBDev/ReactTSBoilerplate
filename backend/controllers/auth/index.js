const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { User, RefreshToken } = require("../../models");

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

// @route   POST /api/auth/refresh-token
// @desc    Refreshes a users access token
// @access  Public
exports.refreshToken = async (req, res) => {
  try {
    const refreshToken =
      req.cookies.refresh_token || req.cookie || req.body.refresh_token;

    if (!refreshToken) {
      return res.status(440).send({
        error: "Unauthorized",
        message: "No token provided",
      });
    }

    // check the database to see if refresh token is still in the database
    const isValidRefreshToken = await RefreshToken.findOne({
      token: refreshToken,
    });

    if (!isValidRefreshToken) {
      return res.status(440).send({
        error: "Unauthorized",
        message: "Invalid token",
      });
    }

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (error, decoded) => {
        if (error) {
          return res.status(440).send({
            error: "Unauthorized",
            message: "Invalid token",
          });
        }

        const user = await User.findById(decoded._id);

        if (!user) {
          return res.status(440).send({
            error: "Unauthorized",
            message: "Invalid token",
          });
        }

        const accessToken = jwt.sign(
          {
            _id: user._id,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          }
        );

        return res.send({ accessToken });
      }
    );
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send({ error: e.message });
  }
};
