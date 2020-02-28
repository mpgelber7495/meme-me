var router = require("express").Router();

router.use("/", require("./home"));
router.use("/meme", require("./meme"));
router.use("/add-meme", require("./addMeme"));
router.use("/user", require("./user"));

module.exports = router;
