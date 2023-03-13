const mongoose = require("mongoose");
const uuid = require("uuid");

const organizationSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid.v4,
    },
    owner: {
      type: String,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1001+"],
      required: true,
    },
    members: [
      {
        type: String,
        ref: "User",
      },
    ],
    projects: [
      {
        type: String,
        ref: "Project",
      },
    ],
    leads: [
      {
        type: String,
        ref: "Lead",
      },
    ],
    blueprints: [
      {
        type: String,
        ref: "Blueprint",
      },
    ],
    subscription: {
      type: String,
      ref: "Subscription",
      required: true,
    },
    stripeCustomerId: {
      type: String,
      trim: true,
    },
    stripeSubscriptionId: {
      type: String,
      trim: true,
    },
    stripePaymentMethodId: {
      type: String,
      trim: true,
    },
    stripeCardBrand: {
      type: String,
      trim: true,
    },
    stripePaymentLast4: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Organization", organizationSchema);
