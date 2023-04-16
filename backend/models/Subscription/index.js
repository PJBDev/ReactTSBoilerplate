const mongoose = require("mongoose");
const uuid = require("uuid");

const subscriptionSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid.v4,
    },
    plan: {
      type: String,
      enum: ["trial", "starter", "professional", "enterprise"],
      default: "free",
    },
    frequency: {
      type: String,
      required: true,
      enum: ["monthly", "yearly"],
      default: "monthly",
    },
    status: {
      type: String,
      enum: ["active", "inactive", "cancelled", "past_due"],
      default: "active",
    },
    currentPeriodEnd: {
      type: Date,
      required: true,
      default: Date.now() + 14 * 24 * 60 * 60 * 1000,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create a subscription
subscriptionSchema.statics.createSubscription = async function (
  subscriptionData
) {
  try {
    const { plan, status, startDate, endDate } = subscriptionData;

    const subscription = await this.create({
      plan,
      status,
      startDate,
    });

    if (!subscription) {
      const err = new Error("Could not create subscription.");
      err.status = 500;
      throw err;
    }

    return subscription;
  } catch (e) {
    console.log(e);
    return { error: error.message, status: error.status };
  }
};

module.exports = mongoose.model("Subscription", subscriptionSchema);
