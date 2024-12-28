const express = require("express");
const router = express.Router();
const variantController = require("../../controllers/master/variantController");

// Create a new Variant
router.post("/variants", variantController.createVariant);

// Get all Variants
router.get("/variants", variantController.getAllVariants);

// Get a Variant by ID
router.get("/variants/:id", variantController.getVariantById);

// Update a Variant
router.put("/variants/:id", variantController.updateVariant);

// Delete a Variant
router.delete("/variants/:id", variantController.deleteVariant);

module.exports = router;
