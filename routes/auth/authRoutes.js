const express = require("express");
const authController = require("../../controllers/auth/authController");
const router = express.Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.login);

router.get("/users", authController.getAllUsers);
router.get("/users/:id", authController.getUserById);
router.put("/users/:id", authController.updateUser);
router.delete("/users/:id", authController.deleteUser);

module.exports = router;
