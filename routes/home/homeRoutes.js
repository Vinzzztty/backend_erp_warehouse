const express = require("express");
const router = express.Router();
const homeController = require("../../controllers/home/homeController");

// Define route for fetching totals
router.get("/totals", homeController.getTotals);

module.exports = router;
