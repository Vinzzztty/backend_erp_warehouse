const express = require("express");
const router = express.Router();
const buyingPriceController = require("../../controllers/product_pricing/bpController");

// Create a new BuyingPrice
router.post("/buying-prices", buyingPriceController.createBuyingPrice);

// Get all BuyingPrices
router.get("/buying-prices", buyingPriceController.getAllBuyingPrices);

// Get a single BuyingPrice by ID
router.get("/buying-prices/:id", buyingPriceController.getBuyingPriceById);

// Update a BuyingPrice
router.put("/buying-prices/:id", buyingPriceController.updateBuyingPrice);

// Delete a BuyingPrice
router.delete("/buying-prices/:id", buyingPriceController.deleteBuyingPrice);

module.exports = router;
