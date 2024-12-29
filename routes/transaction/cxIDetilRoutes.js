const express = require("express");
const router = express.Router();
const cxInvoiceDetailsController = require("../../controllers/transaction/cxIDetilController");

// Create a new CxInvoiceDetail
router.post(
    "/cx-invoice-details",
    cxInvoiceDetailsController.createCxInvoiceDetail
);

// Get all CxInvoiceDetails
router.get(
    "/cx-invoice-details",
    cxInvoiceDetailsController.getAllCxInvoiceDetails
);

// Get a single CxInvoiceDetail by ID
router.get(
    "/cx-invoice-details/:id",
    cxInvoiceDetailsController.getCxInvoiceDetailById
);

// Update a CxInvoiceDetail
router.put(
    "/cx-invoice-details/:id",
    cxInvoiceDetailsController.updateCxInvoiceDetail
);

// Delete a CxInvoiceDetail
router.delete(
    "/cx-invoice-details/:id",
    cxInvoiceDetailsController.deleteCxInvoiceDetail
);

module.exports = router;
