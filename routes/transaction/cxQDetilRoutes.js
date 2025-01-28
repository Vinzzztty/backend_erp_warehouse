const express = require("express");
const router = express.Router();
const cxQuotationDetailsController = require("../../controllers/transaction/cxQDetilController");

// Create a new CxQuotationDetail
router.post(
    "/cx-quotation-details",
    cxQuotationDetailsController.createCxQuotationDetail
);

// Get all CxQuotationDetails
router.get(
    "/cx-quotation-details",
    cxQuotationDetailsController.getAllCxQuotationDetails
);

// Get a single CxQuotationDetail by ID
router.get(
    "/cx-quotation-details/:id",
    cxQuotationDetailsController.getCxQuotationDetailById
);

// Get CxQuotationDetails by CxQuotationId
router.get(
    "/cx-quotation-details/by-cx-quotation/:CxQuotationId",
    cxQuotationDetailsController.getCxQuotationDetailsByCxQuotationId
);

// Update a CxQuotationDetail
router.put(
    "/cx-quotation-details/:id",
    cxQuotationDetailsController.updateCxQuotationDetail
);

// Delete a CxQuotationDetail
router.delete(
    "/cx-quotation-details/:id",
    cxQuotationDetailsController.deleteCxQuotationDetail
);

module.exports = router;
