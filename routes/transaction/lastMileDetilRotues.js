const express = require("express");
const router = express.Router();
const lastMileDetailsController = require("../../controllers/transaction/lastMileDetilController");

// Create a new LastMileDetail
router.post(
    "/last-mile-details",
    lastMileDetailsController.createLastMileDetail
);

// Get all LastMileDetails
router.get(
    "/last-mile-details",
    lastMileDetailsController.getAllLastMileDetails
);

// Get a single LastMileDetail by ID
router.get(
    "/last-mile-details/:id",
    lastMileDetailsController.getLastMileDetailById
);

// Update a LastMileDetail
router.put(
    "/last-mile-details/:id",
    lastMileDetailsController.updateLastMileDetail
);

// Delete a LastMileDetail
router.delete(
    "/last-mile-details/:id",
    lastMileDetailsController.deleteLastMileDetail
);

module.exports = router;
