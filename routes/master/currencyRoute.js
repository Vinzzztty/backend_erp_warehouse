const express = require("express");
const router = express.Router();
const currencyController = require("../../controllers/master/currencyController");

// Define routes
router.post("/currencies", currencyController.createCurrency);
router.get("/currencies", currencyController.getAllCurrencies);
router.get("/currencies/:Code", currencyController.getCurrencyByCode);
router.put("/currencies/:Code", currencyController.updateCurrency);
router.delete("/currencies/:Code", currencyController.deleteCurrency);

module.exports = router;
