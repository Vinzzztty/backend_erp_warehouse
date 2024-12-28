const express = require("express");
const router = express.Router();
const bankController = require("../../controllers/master/bankController");

// Define routes
router.post("/banks", bankController.createBank);
router.get("/banks", bankController.getAllBanks);
router.get("/banks/:Code", bankController.getBankById);
router.put("/banks/:Code", bankController.updateBank);
router.delete("/banks/:Code", bankController.deleteBank);

module.exports = router;
