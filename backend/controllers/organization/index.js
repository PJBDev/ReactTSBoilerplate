const { Organization, User, Subscription } = require("../../models");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// @route   POST /api/organization/
// @desc    Creates a new organization
// @access  Private
exports.createOrganization = async (req, res) => {
  try {
    // create stripe customer
    const customer = await stripe.customers.create({
      description: "Customer for " + email,
    });
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send(e.message);
  }
};

// @route   GET /api/organization/
// @desc    Gets all organizations
// @access  Private
exports.getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find({
      owner: req.user._id,
    }).populate("owner");

    if (!organizations) {
      const err = new Error("Could not find organizations.");
      err.status = 500;
      throw err;
    }

    return res.send(organizations);
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send(e.message);
  }
};

// @route   GET /api/organization/:id
// @desc    Gets a single organization
// @access  Private
exports.getOrganization = async (req, res) => {
  try {
    const organization = await Organization.findOne({
      _id: req.params.id,
      owner: req.user._id,
    }).populate("owner");

    if (!organization) {
      const err = new Error("Could not find organization.");
      err.status = 500;
      throw err;
    }

    return res.send(organization);
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send(e.message);
  }
};

// @route   PUT /api/organization/:id
// @desc    Updates an organization
// @access  Private
exports.updateOrganization = async (req, res) => {
  try {
    const { name, industry, size, subscription } = req.body;

    const organization = await Organization.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { name, industry, size, subscription },
      { new: true }
    );

    if (!organization) {
      const err = new Error("Could not update organization.");
      err.status = 500;
      throw err;
    }

    return res.send(organization);
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send(e.message);
  }
};

// @route   DELETE /api/organization/:id
// @desc    Deletes an organization
// @access  Private
exports.deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!organization) {
      const err = new Error("Could not delete organization.");
      err.status = 500;
      throw err;
    }

    return res.send(organization);
  } catch (e) {
    console.log(e);
    return res.status(e.status || 500).send(e.message);
  }
};
