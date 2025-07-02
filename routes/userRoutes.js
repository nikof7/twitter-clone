const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const formidable = require("formidable");

router.post("/", userController.store);

router.use(authMiddleware);
router.get("/:username", userController.show);
router.post("/:id/following", userController.toggleFollowUser);

module.exports = router;
