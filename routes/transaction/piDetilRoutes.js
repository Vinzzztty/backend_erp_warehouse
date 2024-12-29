const express = require("express");
const router = express.Router();
const proformaInvoiceDetailsController = require("../../controllers/transaction/piDetilController");

// Create a new ProformaInvoiceDetail
router.post(
    "/proforma-invoice-details",
    proformaInvoiceDetailsController.createProformaInvoiceDetail
);

// Get all ProformaInvoiceDetails
router.get(
    "/proforma-invoice-details",
    proformaInvoiceDetailsController.getAllProformaInvoiceDetails
);

// Get a single ProformaInvoiceDetail by ID
router.get(
    "/proforma-invoice-details/:id",
    proformaInvoiceDetailsController.getProformaInvoiceDetailById
);

// Update a ProformaInvoiceDetail
router.put(
    "/proforma-invoice-details/:id",
    proformaInvoiceDetailsController.updateProformaInvoiceDetail
);

// Delete a ProformaInvoiceDetail
router.delete(
    "/proforma-invoice-details/:id",
    proformaInvoiceDetailsController.deleteProformaInvoiceDetail
);

module.exports = router;
