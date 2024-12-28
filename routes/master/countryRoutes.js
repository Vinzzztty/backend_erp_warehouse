const express = require("express");
const router = express.Router();
const countryController = require("../../controllers/master/countryController");

// Create a new country
router.post("/countries", countryController.createCountry);

// Retrieve all countries
router.get("/countries", countryController.getAllCountries);

// Retrieve a single country by ID
router.get("/countries/:id", countryController.getCountryById);

// Update a country by ID
router.put("/countries/:id", countryController.updateCountry);

// Delete a country by ID
router.delete("/countries/:id", countryController.deleteCountry);

module.exports = router;
