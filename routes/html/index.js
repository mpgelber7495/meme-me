var router = require("express").Router();

router.use("/", require("./home"));
router.use("/meme", require("./meme"));
router.use("/add-meme", require("./addMeme"));

module.exports = router;
