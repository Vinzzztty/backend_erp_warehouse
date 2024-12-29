const express = require("express");
const router = express.Router();
const goodsReceiptDetilController = require("../../controllers/transaction/grDetilController");

// Create a new GoodsReceiptDetil
router.post(
    "/goods-receipt-detils",
    goodsReceiptDetilController.createGoodsReceiptDetil
);

// Get all GoodsReceiptDetils
router.get(
    "/goods-receipt-detils",
    goodsReceiptDetilController.getAllGoodsReceiptDetils
);

// Get a single GoodsReceiptDetil by ID
router.get(
    "/goods-receipt-detils/:id",
    goodsReceiptDetilController.getGoodsReceiptDetilById
);

// Update a GoodsReceiptDetil
router.put(
    "/goods-receipt-detils/:id",
    goodsReceiptDetilController.updateGoodsReceiptDetil
);

// Delete a GoodsReceiptDetil
router.delete(
    "/goods-receipt-detils/:id",
    goodsReceiptDetilController.deleteGoodsReceiptDetil
);

module.exports = router;
