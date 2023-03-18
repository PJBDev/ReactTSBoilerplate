const mongoose = require("mongoose");
const uuid = require("uuid");

const verificationTokenSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid.v4,
      required: true,
    },
    owner: {
      type: String,
      required: true,
      ref: "User",
    },
    createdAt: {
      type: Date,
      expires: "1h",
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Generate a new token
verificationTokenSchema.statics.generateToken = async function (owner) {
  try {
    const verificationToken = await this.create({
      owner,
    });

    if (!verificationToken) {
      const err = new Error("Could not generate token.");
      err.status = 500;
      err.message = "Could not generate token.";
      throw err;
    }

    return verificationToken;
  } catch (error) {
    console.log(error);
    return { error: error.message, status: error.status };
  }
};

// Verify the users token
verificationTokenSchema.statics.checkToken = async function (token) {
  try {
    const verificationToken = await this.findOne({ _id: token });

    if (!verificationToken || verificationToken.isExpired) {
      const err = new Error("Invalid token.");
      err.status = 400;
      err.message = "Invalid token.";
      throw err;
    }

    console.log(verificationToken);

    return verificationToken;
  } catch (error) {
    console.log(error);
    return { error: error.message, status: error.status };
  }
};

module.exports = mongoose.model("VerificationToken", verificationTokenSchema);
