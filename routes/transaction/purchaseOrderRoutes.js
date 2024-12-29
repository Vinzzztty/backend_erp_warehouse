const express = require("express");
const router = express.Router();
const purchaseOrderController = require("../../controllers/transaction/purchaseOrderController");

// Create a new Purchase Order
router.post("/purchase-orders", purchaseOrderController.createPurchaseOrder);

// Get all Purchase Orders
router.get("/purchase-orders", purchaseOrderController.getAllPurchaseOrders);

// Get a Purchase Order by ID
router.get(
    "/purchase-orders/:id",
    purchaseOrderController.getPurchaseOrderById
);

// Update a Purchase Order
router.put("/purchase-orders/:id", purchaseOrderController.updatePurchaseOrder);

// Delete a Purchase Order
router.delete(
    "/purchase-orders/:id",
    purchaseOrderController.deletePurchaseOrder
);

module.exports = router;
