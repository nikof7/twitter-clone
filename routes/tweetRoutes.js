const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);
router.get("/", tweetController.index);
router.post("/", tweetController.store);
router.get("/:id", tweetController.show);
router.patch("/:id/likes", tweetController.update);
router.delete("/:id", tweetController.destroy);

module.exports = router;
