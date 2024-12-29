const express = require("express");
const router = express.Router();
const piPaymentDetailsController = require("../../controllers/transaction/piPaymentDetil");

// Create a new PiPaymentDetails
router.post(
    "/pi-payment-details",
    piPaymentDetailsController.createPiPaymentDetails
);

// Get all PiPaymentDetails
router.get(
    "/pi-payment-details",
    piPaymentDetailsController.getAllPiPaymentDetails
);

// Get a single PiPaymentDetails by ID
router.get(
    "/pi-payment-details/:id",
    piPaymentDetailsController.getPiPaymentDetailsById
);

// Update PiPaymentDetails
router.put(
    "/pi-payment-details/:id",
    piPaymentDetailsController.updatePiPaymentDetails
);

// Delete PiPaymentDetails
router.delete(
    "/pi-payment-details/:id",
    piPaymentDetailsController.deletePiPaymentDetails
);

module.exports = router;
