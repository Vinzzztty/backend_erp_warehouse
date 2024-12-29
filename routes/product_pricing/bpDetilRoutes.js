const express = require("express");
const router = express.Router();
const buyingPriceDetailsController = require("../../controllers/product_pricing/bpDetilController");

// Create a new BuyingPriceDetails
router.post(
    "/buying-price-details",
    buyingPriceDetailsController.createBuyingPriceDetails
);

// Get all BuyingPriceDetails
router.get(
    "/buying-price-details",
    buyingPriceDetailsController.getAllBuyingPriceDetails
);

// Get a single BuyingPriceDetails by ID
router.get(
    "/buying-price-details/:id",
    buyingPriceDetailsController.getBuyingPriceDetailsById
);

// Update BuyingPriceDetails
router.put(
    "/buying-price-details/:id",
    buyingPriceDetailsController.updateBuyingPriceDetails
);

// Delete BuyingPriceDetails
router.delete(
    "/buying-price-details/:id",
    buyingPriceDetailsController.deleteBuyingPriceDetails
);

module.exports = router;
