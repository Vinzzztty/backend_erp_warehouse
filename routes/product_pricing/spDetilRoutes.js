const express = require("express");
const router = express.Router();
const settingPriceDetailsController = require("../../controllers/product_pricing/spDetilController");

// Create a new SettingPriceDetails
router.post(
    "/setting-price-details",
    settingPriceDetailsController.createSettingPriceDetails
);

// Get all SettingPriceDetails
router.get(
    "/setting-price-details",
    settingPriceDetailsController.getAllSettingPriceDetails
);

// Get a single SettingPriceDetails by ID
router.get(
    "/setting-price-details/:id",
    settingPriceDetailsController.getSettingPriceDetailsById
);

// Update a SettingPriceDetails
router.put(
    "/setting-price-details/:id",
    settingPriceDetailsController.updateSettingPriceDetails
);

// Delete a SettingPriceDetails
router.delete(
    "/setting-price-details/:id",
    settingPriceDetailsController.deleteSettingPriceDetails
);

module.exports = router;
