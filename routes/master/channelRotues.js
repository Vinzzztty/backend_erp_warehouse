const express = require("express");
const router = express.Router();
const channelController = require("../../controllers/master/channelController");

// Create a new channel
router.post("/channels", channelController.createChannel);

// Get all channels
router.get("/channels", channelController.getAllChannels);

// Get channel by ID
router.get("/channels/:id", channelController.getChannelById);

// Update channel by ID
router.put("/channels/:id", channelController.updateChannel);

// Delete channel by ID
router.delete("/channels/:id", channelController.deleteChannel);

module.exports = router;
