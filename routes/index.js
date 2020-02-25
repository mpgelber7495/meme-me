var router = require("express").Router();
// var Meme = require("../models/meme");

router.use("/api", require("./api"));

module.exports = router;
