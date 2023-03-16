const mongoose = require("mongoose");
const uuid = require("uuid");

const RefreshTokenSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid.v4,
    },
    token: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// create refresh token in database
RefreshTokenSchema.statics.createRefreshToken = async function (
  userId,
  refreshToken
) {
  try {
    const expireAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const token = await this.create({
      token: refreshToken,
      user: userId,
      expireAt,
    });

    if (!token) {
      const err = new Error("Could not create refresh token");
      err.status = 510;
      err.message = "510: Could not create refresh token";
      throw err;
    }

    return token;
  } catch (e) {
    console.log(error);
    return { error: error.message, status: error.status };
  }
};

// delete refresh token from database
RefreshTokenSchema.statics.deleteRefreshToken = async function (user, token) {
  await this.findOneAndDelete({
    user,
    token,
  });

  return "Token deleted";
};

module.exports = mongoose.model("RefreshToken", RefreshTokenSchema);
