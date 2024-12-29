const express = require("express");
const router = express.Router();
const settingPriceController = require("../../controllers/product_pricing/spController");

// Create a new SettingPrice
router.post("/setting-prices", settingPriceController.createSettingPrice);

// Get all SettingPrices
router.get("/setting-prices", settingPriceController.getAllSettingPrices);

// Get a single SettingPrice by ID
router.get("/setting-prices/:id", settingPriceController.getSettingPriceById);

// Update a SettingPrice
router.put("/setting-prices/:id", settingPriceController.updateSettingPrice);

// Delete a SettingPrice
router.delete("/setting-prices/:id", settingPriceController.deleteSettingPrice);

module.exports = router;
