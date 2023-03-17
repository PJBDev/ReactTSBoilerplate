const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { User, RefreshToken } = require("../../models");

exports.getJWT = async (user) => {
  try {
    const accessToken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    const refreshToken = jwt.sign(
      {
        _id: user._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_EXPIRES_IN,
      }
    );

    // Save refresh token to database
    const isTokenSaved = await RefreshToken.createRefreshToken(
      user._id,
      refreshToken
    );

    if (!isTokenSaved || isTokenSaved.error) {
      const error = new Error("Could not save refresh token");
      error.status = 500;
      throw error;
    }

    return {
      accessToken,
      refreshToken,
    };
  } catch (e) {
    console.log(e);
    return { error: e.message, status: e.status || 500 };
  }
};
