const express = require("express");
const router = express.Router();
const ppnSettingController = require("../../controllers/master/ppnSettingController");

// Define routes
router.post("/ppn-settings", ppnSettingController.createPPNSetting);
router.get("/ppn-settings", ppnSettingController.getAllPPNSettings);
router.get("/ppn-settings/:id", ppnSettingController.getPPNSettingById);
router.put("/ppn-settings/:id", ppnSettingController.updatePPNSetting);
router.delete("/ppn-settings/:id", ppnSettingController.deletePPNSetting);

module.exports = router;
