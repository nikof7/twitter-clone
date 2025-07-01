const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const formidable = require("formidable");

router.post("/", userController.store);

router.get("/", userController.index);

router.use(authMiddleware);
router.get("/:username", userController.show);
router.patch("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;
