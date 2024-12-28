const express = require("express");
const router = express.Router();
const costController = require("../../controllers/master/costController");

// Define routes
router.post("/costs", costController.createCost);
router.get("/costs", costController.getAllCosts);
router.get("/costs/:Code", costController.getCostById);
router.put("/costs/:Code", costController.updateCost);
router.delete("/costs/:Code", costController.deleteCost);

module.exports = router;
