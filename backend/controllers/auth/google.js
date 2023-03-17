const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const { User, RefreshToken } = require("../../models");
const { google } = require("googleapis");
const { getJWT } = require("./utils");

const { OAuth2Client } = require("google-auth-library");

const createOauth2Client = (redirectUrl) => {
  return new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: redirectUrl,
  });
};

// @route   POST /api/auth/google/signin
// @desc    Log in a user with Google
// @access  Public
exports.googleSignIn = async (req, res) => {
  try {
    const callbackUrl = `${process.env.PRODUCTION_URL}/auth/google/cb/signin`;
    const client = createOauth2Client(callbackUrl);

    const authUrl = client.generateAuthUrl({
      access_type: "offline",
      scope: ["email", "profile"],
      response_type: "id_token",
      nonce: uuid.v4(),
    });

    return res.send(authUrl);
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send(e.message);
  }
};

// @route   POST /api/auth/google/register
// @desc    Registers a new user with Google
// @access  Public
exports.googleRegister = async (req, res) => {
  try {
    const callbackUrl = `${process.env.PRODUCTION_URL}/auth/google/cb/register`;
    const client = createOauth2Client(callbackUrl);

    const authUrl = client.generateAuthUrl({
      access_type: "offline",
      scope: ["email", "profile"],
      response_type: "id_token",
      nonce: uuid.v4(),
    });

    return res.send(authUrl);
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send(e.message);
  }
};

// @route   POST /api/auth/google/callback/signin
// @desc    Log in a user with Google
// @access  Public
exports.googleSignInCallback = async (req, res) => {
  try {
    const callbackUrl = `${process.env.PRODUCTION_URL}/auth/google/cb/signin`;
    const client = createOauth2Client(callbackUrl);

    const ticket = await client.verifyIdToken({
      idToken: req.body.idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const user = await User.googleSignIn({
      email: payload.email,
    });

    if (!user || user.error) {
      console.log("User not found");
      return res.status(user.status || 500).send("User not found.");
    }

    const { accessToken, refreshToken } = getJWT(user);

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

// @route   POST /api/auth/google/callback/register
// @desc    Registers a new user with Google
// @access  Public
exports.googleRegisterCallback = async (req, res) => {
  try {
    const callbackUrl = `${process.env.PRODUCTION_URL}/auth/google/cb/register`;
    const client = createOauth2Client(callbackUrl);

    const ticket = await client.verifyIdToken({
      idToken: req.body.idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const user = await User.googleRegistration({
      avatar: payload.picture,
      firstName: payload.given_name,
      lastName: payload.family_name,
      email: payload.email,
      emailVerified: payload.email_verified,
      password: uuid.v4(),
    });

    if (!user || user.error) {
      console.log("User not found");
      return res.status(user.status || 500).send("Could not register user.");
    }

    const { accessToken, refreshToken } = getJWT(user);

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

// @route   POST /api/auth/google/gmail
// @desc    Connects a user's gmail account
// @access  Private
exports.googleGmail = async (req, res) => {
  try {
    const callbackUrl = `${process.env.PRODUCTION_URL}/auth/google/cb`;
    const client = createOauth2Client(callbackUrl);

    const authUrl = client.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      setAccessToken: true,
      setRefreshToken: true,
      scope: ["https://www.googleapis.com/auth/gmail.modify"],
      nonce: uuid.v4(),
    });

    return res.send(authUrl);
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send(e.message);
  }
};

// @route   POST /api/auth/google/gmail-callback
// @desc    Connects a user's gmail account
// @access  Public
exports.googleGmailCallback = async (req, res) => {
  try {
    const callbackUrl = `${process.env.PRODUCTION_URL}/auth/google/cb`;
    const client = createOauth2Client(callbackUrl);

    const { tokens } = await client.getToken(req.body.code);

    console.log(tokens);

    client.setCredentials(tokens);

    const gmail = google.gmail({ version: "v1", auth: client });

    // Retrieve a list of message IDs from the user's inbox
    const messages = await gmail.users.messages.list({
      userId: "me",
      maxResults: 2,
      q: "in:inbox",
    });

    const messageDetails = await Promise.all(
      messages.data.messages.map(async (message) => {
        const messageDetails = await gmail.users.messages.get({
          userId: "me",
          id: message.id,
          format: "full", // include the full message content, including the body
        });

        const messageBody = messageDetails.data.payload.body.data; // retrieve the message body

        const decodedMessageBody = Buffer.from(messageBody, "base64").toString(
          "utf-8"
        ); // decode the message body

        return {
          id: messageDetails.data.id,
          threadId: messageDetails.data.threadId,
          snippet: messageDetails.data.snippet,
          date: new Date(parseInt(messageDetails.data.internalDate)),
          from: messageDetails.data.payload.headers.find(
            (header) => header.name === "From"
          ).value,
          subject: messageDetails.data.payload.headers.find(
            (header) => header.name === "Subject"
          ).value,
          body: decodedMessageBody,
        };
      })
    );

    return res.send(messageDetails);
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send(e.message);
  }
};
