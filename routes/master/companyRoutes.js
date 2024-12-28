const express = require("express");
const router = express.Router();
const companyController = require("../../controllers/master/companyController");

// Define routes
router.post("/companies", companyController.createCompany);
router.get("/companies", companyController.getAllCompanies);
router.get("/companies/:Code", companyController.getCompanyById);
router.put("/companies/:Code", companyController.updateCompany);
router.delete("/companies/:Code", companyController.deleteCompany);

module.exports = router;
