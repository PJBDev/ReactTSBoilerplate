const mongoose = require("mongoose");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const validator = require("mongoose-validator");
const stripe = require("stripe")(process.env.STRIPE_LIVE_KEY);
// const { RefreshToken } = require("../RefreshToken");

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

userSchema.statics.register = async function (profile) {
  const { email, pw, firstName, lastName } = profile;

  if ([email, pw, firstName, lastName].some((field) => !field)) {
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
    password: profile.pw || uuid.v4(),
    stripeCustomerId: customer.id,
  });
};

exports.User = mongoose.model("User", userSchema);
