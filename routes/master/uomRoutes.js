const express = require("express");
const router = express.Router();
const uomController = require("../../controllers/master/uomController");

// Create a new UoM
router.post("/uoms", uomController.createUoM);

// Get all UoMs
router.get("/uoms", uomController.getAllUoMs);

// Get UoM by Code
router.get("/uoms/:code", uomController.getUoMByCode);

// Update UoM by Code
router.put("/uoms/:code", uomController.updateUoM);

// Delete UoM by Code
router.delete("/uoms/:code", uomController.deleteUoM);

module.exports = router;
