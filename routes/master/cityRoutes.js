const express = require("express");
const router = express.Router();
const cityController = require("../../controllers/master/cityController");

// Create a new city
router.post("/cities", cityController.createCity);

// Retrieve all cities
router.get("/cities", cityController.getAllCities);

// Retrieve a single city by ID
router.get("/cities/:id", cityController.getCityById);

// Update a city by ID
router.put("/cities/:id", cityController.updateCity);

// Delete a city by ID
router.delete("/cities/:id", cityController.deleteCity);

module.exports = router;
