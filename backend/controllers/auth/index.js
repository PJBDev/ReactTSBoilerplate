const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { User, RefreshToken, VerificationToken } = require("../../models");
const {
  sendAccountVerificationEmail,
  sendResetPasswordEmail,
} = require("../../utils/automatedEmails");
const { getJWT } = require("./utils");

// @route   POST /api/auth/register
// @desc    Registers a new user
// @access  Public
exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const [firstName, lastName] = fullName.split(" ");

    const profile = {
      firstName,
      lastName,
      email,
      password,
    };

    const user = await User.standardRegistration(profile);

    if (!user || user.error) {
      return res
        .status(user.status || 500)
        .send(user.error || "Could not register user.");
    }

    const token = await VerificationToken.generateToken(user._id);

    if (!token || token.error) {
      return res
        .status(token.status || 500)
        .send(token.error || "Could not generate verification token.");
    }

    await sendAccountVerificationEmail(user.firstName, user.email, token._id);

    return res.send(user.toJSON());
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send(e.message);
  }
};

// @route   POST /api/auth/login
// @desc    Log in a user
// @access  Public
exports.login = async (req, res) => {
  try {
    const user = await User.standardLogin(req.body);

    if (!user || user.error) {
      return res
        .status(user.status || 500)
        .send(user.error || "Invalid credentials.");
    }

    // Omit access token if user has not verified their email
    if (!user.isEmailVerified) {
      return res.status(200).send({
        user: user.toJSON(),
        message: "Please verify your email address.",
      });
    }

    const { accessToken, refreshToken } = await getJWT(user);

    if (!accessToken || !refreshToken) {
      return res.status(500).send("Could not generate tokens.");
    }

    res.cookie("refresh_token", refreshToken, {
      secure: process.env.NODE_ENV !== "development",
    });

    return res.send({
      accessToken,
      user: user.toJSON(),
    });
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send(e.message);
  }
};

// @route   POST /api/auth/forgot-password
// @desc    Sends a user a password reset email
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send("No email provided.");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).send("Password reset email sent.");
    }

    const token = await VerificationToken.generateToken(user._id);

    if (!token || token.error) {
      return res
        .status(token.status || 500)
        .send(token.error || "Could not generate verification token.");
    }

    await sendResetPasswordEmail(user.email, token._id);

    return res.status(200).send("Password reset email sent.");
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send(e.message);
  }
};

// reset password
// @route   POST /api/auth/reset-password
// @desc    Resets a users password
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || !password || !confirmPassword) {
      return res.status(400).send("Invalid request.");
    }

    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match.");
    }

    const verificationToken = await VerificationToken.checkToken(token);

    if (!verificationToken || verificationToken.error) {
      return res
        .status(verificationToken.status || 500)
        .send(
          verificationToken.error ||
            "Could not verify email address. Please try again."
        );
    }

    const owner = await User.findOne({ _id: verificationToken.owner });

    if (!owner) {
      return res.status(500).send("Could not reset password.");
    }

    const updatedPassword = await User.updatePassword({
      _id: owner._id,
      password,
    });

    if (!updatedPassword || updatedPassword.error) {
      return res
        .status(updatedPassword.status || 500)
        .send(
          updatedPassword.error || "Could not reset password. Please try again."
        );
    }

    return res.status(200).send("Password reset successful.");
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send(e.message);
  }
};

// @route   POST /api/auth/verify-email
// @desc    Verifies a users email address
// @access  Public
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).send("No token provided.");
    }

    const verificationToken = await VerificationToken.checkToken(token);

    if (!verificationToken || verificationToken.error) {
      return res
        .status(verificationToken.status || 500)
        .send(
          verificationToken.error ||
            "Could not verify email address. Please try again."
        );
    }

    const user = await User.findOneAndUpdate(
      { _id: verificationToken.owner },
      { isEmailVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(500).send("Could not verify email address.");
    }

    return res.send(user.toJSON());
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send(e.message);
  }
};

// @route   POST /api/auth/resend-verification-email
// @desc    Resends a user's verification email
// @access  Public
exports.resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send("No email provided.");
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).send("Verification email will be sent.");
    }

    const token = await VerificationToken.generateToken(user._id);

    await sendAccountVerificationEmail(user.firstName, user.email, token._id);

    return res.status(200).send("Verification email sent.");
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send(e.message);
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
    return res.status(e.status || 500).send(e.message);
  }
};
