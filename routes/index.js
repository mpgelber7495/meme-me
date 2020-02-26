var router = require("express").Router();
// var Meme = require("../models/meme");

router.use("/api", require("./api"));
router.use("/", require("./html"));

module.exports = router;
