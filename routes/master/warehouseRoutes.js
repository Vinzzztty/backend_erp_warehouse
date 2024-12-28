const express = require("express");
const router = express.Router();
const warehouseController = require("../../controllers/master/warehouseController");

// Create a new warehouse
router.post("/warehouses", warehouseController.createWarehouse);

// Retrieve all warehouses
router.get("/warehouses", warehouseController.getAllWarehouses);

// Retrieve a single warehouse by ID
router.get("/warehouses/:id", warehouseController.getWarehouseById);

// Update a warehouse by ID
router.put("/warehouses/:id", warehouseController.updateWarehouse);

// Delete a warehouse by ID
router.delete("/warehouses/:id", warehouseController.deleteWarehouse);

module.exports = router;
