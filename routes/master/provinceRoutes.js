const express = require("express");
const router = express.Router();
const provinceController = require("../../controllers/master/provinceController");

// Create a new province
router.post("/provinces", provinceController.createProvince);

// Retrieve all provinces
router.get("/provinces", provinceController.getAllProvinces);

// Retrieve a single province by ID
router.get("/provinces/:id", provinceController.getProvinceById);

// Update a province by ID
router.put("/provinces/:id", provinceController.updateProvince);

// Delete a province by ID
router.delete("/provinces/:id", provinceController.deleteProvince);

module.exports = router;
