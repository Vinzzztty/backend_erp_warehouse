const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/master/categoryController");

// Create a new Category
router.post("/categories", categoryController.createCategory);

// Retrieve all Categories
router.get("/categories", categoryController.getAllCategories);

// Retrieve a single Category by ID
router.get("/categories/:id", categoryController.getCategoryById);

// Update a Category by ID
router.put("/categories/:id", categoryController.updateCategory);

// Delete a Category by ID
router.delete("/categories/:id", categoryController.deleteCategory);

module.exports = router;
