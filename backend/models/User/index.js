const mongoose = require("mongoose");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const validator = require("mongoose-validator");
const stripe = require("stripe")(process.env.STRIPE_LIVE_KEY);

const nameValidator = [
  validator({
    validator: "isLength",
    arguments: [2, 50],
    message: "Name should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
  validator({
    validator: "isAlphanumeric",
    passIfEmpty: true,
    message: "Name should contain alpha-numeric characters only",
  }),
];

const emailValidator = [
  validator({
    validator: "isEmail",
    message: "Email is not valid",
  }),
];

const passwordValidator = [
  validator({
    validator: "isLength",
    arguments: [8, 50],
    message: "Password should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
  validator({
    validator: "matches",
    arguments: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,}$/,
    message:
      "Password should contain at least one uppercase letter, one lowercase letter and one number",
  }),
];

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid.v4,
      required: true,
    },
    avatar: {
      type: String,
    },
    firstName: {
      type: String,
      trim: true,
      minlength: 2,
      nameValidator,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      minlength: 2,
      nameValidator,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      minlength: 3,
      emailValidator,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      passwordValidator,
      required: true,
    },
    gmailRefreshToken: {
      type: String,
    },
    gmailAccessToken: {
      type: String,
    },
    organization: {
      type: String,
      ref: "Organization",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.__v;

  return userObject;
};

// Login with email and password
userSchema.statics.standardRegistration = async function (profile) {
  try {
    const { email, password, firstName, lastName } = profile;

    if ([email, password, firstName, lastName].some((field) => !field)) {
      const err = new Error("All fields are required");
      err.status = 422;
      err.message = "All fields are required";
      throw err;
    }

    // check if user is already in the database
    const userExist = await this.findOne({ email: profile.email });

    if (userExist) {
      const err = new Error("User already exists");
      err.status = 409;
      err.message = "User already exists";
      throw err;
    }

    // create stripe customer
    const customer = await stripe.customers.create({
      description: "Customer for " + email,
    });

    return this.create({
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      password: profile.password || uuid.v4(),
      stripeCustomerId: customer.id,
    });
  } catch (error) {
    console.log(error);
    return { error: error.message, status: error.status };
  }
};

// Sign up with Google
userSchema.statics.googleRegistration = async function (profile) {
  try {
    const { email, firstName, lastName, emailVerified } = profile;

    if ([email, firstName, lastName, emailVerified].some((field) => !field)) {
      const err = new Error("All fields are required");
      err.status = 422;
      err.message = "All fields are required";
      throw err;
    }

    // check if user is already in the database
    const userExist = await this.findOne({ email: profile.email });

    if (userExist) {
      const err = new Error("User already exists");
      err.status = 409;
      err.message = "User already exists";
      throw err;
    }

    // create stripe customer
    const customer = await stripe.customers.create({
      description: "Customer for " + email,
    });

    return this.create({
      avatar: profile.avatar,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      isEmailVerified: profile.emailVerified,
      stripeCustomerId: customer.id,
      password: uuid.v4(),
    });
  } catch (error) {
    console.log(error);
    return { error: error.message, status: error.status };
  }
};

// Sign in with Google
userSchema.statics.googleSignIn = async function (profile) {
  try {
    const { email } = profile;

    if ([email].some((field) => !field)) {
      const err = new Error("All fields are required");
      err.status = 422;
      err.message = "All fields are required";
      throw err;
    }

    // check if user is already in the database
    // const user = await this.findOne({ email: profile.email });
    const user = await this.findOne({ email: profile.email });

    if (!user) {
      const err = new Error("User does not exist");
      err.status = 404;
      err.message = "User does not exist";
      throw err;
    }

    return user;
  } catch (error) {
    console.log(error);
    return { error: error.message, status: error.status };
  }
};

module.exports = mongoose.model("User", userSchema);
