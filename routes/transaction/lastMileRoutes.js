const express = require("express");
const router = express.Router();
const lastMileController = require("../../controllers/transaction/lastMileController");

// Create a new LastMile
router.post("/last-mile", lastMileController.createLastMile);

// Get all LastMile entries
router.get("/last-mile", lastMileController.getAllLastMile);

// Get LastMile by ID
router.get("/last-mile/:id", lastMileController.getLastMileById);

// Update LastMile
router.put("/last-mile/:id", lastMileController.updateLastMile);

// Delete LastMile
router.delete("/last-mile/:id", lastMileController.deleteLastMile);

module.exports = router;
