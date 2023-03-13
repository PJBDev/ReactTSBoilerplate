const mongoose = require("mongoose");
const uuid = require("uuid");

const subscriptionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid.v4,
    },
    organization: {
      type: String,
      ref: "Organization",
      required: true,
    },
    plan: {
      type: String,
      enum: ["trial", "starter", "professional", "enterprise"],
      default: "free",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "cancelled", "past_due"],
      default: "active",
    },
    startDate: Date,
    endDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
