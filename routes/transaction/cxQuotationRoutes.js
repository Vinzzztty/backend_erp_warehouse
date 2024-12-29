const express = require("express");
const router = express.Router();
const cxQuotationController = require("../../controllers/transaction/cxQuotationController");

// Create a new CxQuotation
router.post("/cx-quotations", cxQuotationController.createCxQuotation);

// Get all CxQuotations
router.get("/cx-quotations", cxQuotationController.getAllCxQuotations);

// Get a single CxQuotation by ID
router.get("/cx-quotations/:id", cxQuotationController.getCxQuotationById);

// Update a CxQuotation by ID
router.put("/cx-quotations/:id", cxQuotationController.updateCxQuotation);

// Delete a CxQuotation by ID
router.delete("/cx-quotations/:id", cxQuotationController.deleteCxQuotation);

module.exports = router;
