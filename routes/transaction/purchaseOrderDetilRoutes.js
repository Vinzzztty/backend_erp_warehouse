const express = require("express");
const router = express.Router();
const purchaseOrderDetailsController = require("../../controllers/transaction/purchaseOrderDetilController");

// Create a new PurchaseOrderDetail
router.post(
    "/purchase-order-details",
    purchaseOrderDetailsController.createPurchaseOrderDetail
);

// Get all PurchaseOrderDetails
router.get(
    "/purchase-order-details",
    purchaseOrderDetailsController.getAllPurchaseOrderDetails
);

// Get a single PurchaseOrderDetail by ID
router.get(
    "/purchase-order-details/:id",
    purchaseOrderDetailsController.getPurchaseOrderDetailById
);

// Update a PurchaseOrderDetail by ID
router.put(
    "/purchase-order-details/:id",
    purchaseOrderDetailsController.updatePurchaseOrderDetail
);

// Delete a PurchaseOrderDetail by ID
router.delete(
    "/purchase-order-details/:id",
    purchaseOrderDetailsController.deletePurchaseOrderDetail
);

module.exports = router;
