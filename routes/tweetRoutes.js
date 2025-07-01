const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweetController");

router.get("/", tweetController.index);
router.post("/", tweetController.store);
router.get("/:id", tweetController.show);
router.patch("/:id", tweetController.update);
router.delete("/:id", tweetController.destroy);

module.exports = router;
