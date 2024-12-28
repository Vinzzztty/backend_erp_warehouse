const express = require("express");
const router = express.Router();
const SupplierController = require("../../controllers/master/supplierController");

// Create Supplier
router.post("/suppliers", SupplierController.createSupplier);

// Get all Suppliers
router.get("/suppliers", SupplierController.getAllSuppliers);

// Get Supplier by ID
router.get("/suppliers/:id", SupplierController.getSupplierById);

// Update Supplier by ID
router.put("/suppliers/:id", SupplierController.updateSupplier);

// Delete Supplier by ID
router.delete("/suppliers/:id", SupplierController.deleteSupplier);

module.exports = router;
