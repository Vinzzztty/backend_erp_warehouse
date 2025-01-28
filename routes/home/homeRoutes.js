const express = require("express");
const router = express.Router();
const homeController = require("../../controllers/home/homeController");

// Define route for fetching totals
router.get("/total-masters", homeController.getTotalsMaster);
router.get("/total-transactions", homeController.getTransactionTotals);

module.exports = router;
