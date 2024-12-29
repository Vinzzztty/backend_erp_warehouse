const express = require("express");
const router = express.Router();
const piPaymentController = require("../../controllers/transaction/piPaymentController");

// Create a new PiPayment
router.post("/pi-payments", piPaymentController.createPiPayment);

// Get all PiPayments
router.get("/pi-payments", piPaymentController.getAllPiPayments);

// Get PiPayment by ID
router.get("/pi-payments/:id", piPaymentController.getPiPaymentById);

// Update PiPayment
router.put("/pi-payments/:id", piPaymentController.updatePiPayment);

// Delete PiPayment
router.delete("/pi-payments/:id", piPaymentController.deletePiPayment);

module.exports = router;
