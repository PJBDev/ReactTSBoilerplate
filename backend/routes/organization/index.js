const express = require("express");
const router = express.Router();
const organizationController = require("../../controllers/organization");

// @route   POST api/organiation/
// @desc    Creates a new organization
// @access  Private
router.post("/", organizationController.createOrganization);

// @route   GET api/organization/
// @desc    Gets all organizations
// @access  Private
router.get("/", organizationController.getOrganizations);

// @route   GET api/organization/:id
// @desc    Gets a single organization
// @access  Private
router.get("/:id", organizationController.getOrganization);

// @route   PUT /api/organization/:id
// @desc    Updates a single organization
// @access  Private
router.put("/:id", organizationController.updateOrganization);

// @route   DELETE /api/organization/:id
// @desc    Deletes a single organization
// @access  Private
router.delete("/:id", organizationController.deleteOrganization);

module.exports = router;
