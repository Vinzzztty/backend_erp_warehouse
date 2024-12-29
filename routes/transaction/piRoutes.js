const express = require("express");
const router = express.Router();
const proformaInvoiceController = require("../../controllers/transaction/piController");

// Create a new ProformaInvoice
router.post(
    "/proforma-invoices",
    proformaInvoiceController.createProformaInvoice
);

// Get all ProformaInvoices
router.get(
    "/proforma-invoices",
    proformaInvoiceController.getAllProformaInvoices
);

// Get a single ProformaInvoice by ID
router.get(
    "/proforma-invoices/:id",
    proformaInvoiceController.getProformaInvoiceById
);

// Update a ProformaInvoice
router.put(
    "/proforma-invoices/:id",
    proformaInvoiceController.updateProformaInvoice
);

// Delete a ProformaInvoice
router.delete(
    "/proforma-invoices/:id",
    proformaInvoiceController.deleteProformaInvoice
);

module.exports = router;
