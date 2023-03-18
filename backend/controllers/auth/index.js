const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { User, RefreshToken, VerificationToken } = require("../../models");
const { sendAccountVerificationEmail } = require("../../utils/automatedEmails");
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
