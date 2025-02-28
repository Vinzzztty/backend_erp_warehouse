const express = require("express");
const multer = require("multer");
const router = express.Router();
const productController = require("../../controllers/master/productController");

// Multer setup for handling file uploads
const storage = multer.memoryStorage(); // Store files in memory as buffer
const upload = multer({ storage });

// Create a new product (with image upload support)
router.post(
    "/products",
    upload.array("images", 8),
    productController.createProduct
);

// Get all products
router.get("/products", productController.getAllProducts);

// Get product by ID
router.get("/products/:id", productController.getProductById);

// Update a product (with image upload support)
router.put(
    "/products/:id",
    upload.single("file"),
    productController.updateProduct
);

// Delete a product
router.delete("/products/:id", productController.deleteProduct);

module.exports = router;
