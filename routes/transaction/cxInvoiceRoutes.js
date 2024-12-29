const express = require("express");
const router = express.Router();
const cxInvoiceController = require("../../controllers/transaction/cxInvoiceController");

// Create a new CxInvoice
router.post("/cx-invoices", cxInvoiceController.createCxInvoice);

// Retrieve all CxInvoices
router.get("/cx-invoices", cxInvoiceController.getAllCxInvoices);

// Retrieve a single CxInvoice by ID
router.get("/cx-invoices/:id", cxInvoiceController.getCxInvoiceById);

// Update a CxInvoice
router.put("/cx-invoices/:id", cxInvoiceController.updateCxInvoice);

// Delete a CxInvoice
router.delete("/cx-invoices/:id", cxInvoiceController.deleteCxInvoice);

module.exports = router;
