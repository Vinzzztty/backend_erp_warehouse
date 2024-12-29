const express = require("express");
const router = express.Router();
const goodsReceiptController = require("../../controllers/transaction/grController");

// Create a new GoodsReceipt
router.post("/goods-receipts", goodsReceiptController.createGoodsReceipt);

// Retrieve all GoodsReceipts
router.get("/goods-receipts", goodsReceiptController.getAllGoodsReceipts);

// Retrieve a single GoodsReceipt by ID
router.get("/goods-receipts/:id", goodsReceiptController.getGoodsReceiptById);

// Update a GoodsReceipt
router.put("/goods-receipts/:id", goodsReceiptController.updateGoodsReceipt);

// Delete a GoodsReceipt
router.delete("/goods-receipts/:id", goodsReceiptController.deleteGoodsReceipt);

module.exports = router;
