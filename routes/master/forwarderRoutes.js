const express = require("express");
const router = express.Router();
const forwarderController = require("../../controllers/master/forwarderController");

// Create a new forwarder
router.post("/forwarders", forwarderController.createForwarder);

// Retrieve all forwarders
router.get("/forwarders", forwarderController.getAllForwarders);

// Retrieve a single forwarder by ID
router.get("/forwarders/:id", forwarderController.getForwarderById);

// Update a forwarder by ID
router.put("/forwarders/:id", forwarderController.updateForwarder);

// Delete a forwarder by ID
router.delete("/forwarders/:id", forwarderController.deleteForwarder);

module.exports = router;
