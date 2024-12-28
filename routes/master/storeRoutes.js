const express = require("express");
const router = express.Router();
const storeController = require("../../controllers/master/storeController");

// Create Store
router.post("/stores", storeController.createStore);

// Get all Stores
router.get("/stores", storeController.getAllStores);

// Get Store by ID
router.get("/stores/:id", storeController.getStoreById);

// Update Store
router.put("/stores/:id", storeController.updateStore);

// Delete Store
router.delete("/stores/:id", storeController.deleteStore);

module.exports = router;
